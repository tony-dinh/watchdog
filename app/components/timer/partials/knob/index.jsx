/** @jsx jsx */

import React from 'react'
import PropTypes from 'prop-types'
import {jsx} from '@emotion/core'
import {prefix} from 'inline-style-prefixer'
import styles from './styles'
import SENSITIVITY from 'global/constants/sensitivity'
import {
    bulkAddEventListener,
    bulkRemoveEventListener,
    getPointerPosition
} from 'global/utils/browser'

class Knob extends React.PureComponent {
    static events = {
        DRAG: ['mousemove', 'touchmove'],
        DRAG_END: ['mouseup', 'touchcancel', 'touchend']
    }

    knob = React.createRef()

    state = {isDragging: false}

    get coord() {
        if (!this.knob.current) {
            return {x: '50%', y: '50%'}
        }
        const boundingRect = this.knob.current.getBoundingClientRect()
        return {
            x: boundingRect.x + (boundingRect.width / 2),
            y: boundingRect.y + (boundingRect.height / 2),
        }
    }

    componentDidMount() {
        bulkAddEventListener(window, Knob.events.DRAG, this.onDrag)
        bulkAddEventListener(window, Knob.events.DRAG_END, this.onDragEnd)
    }

    componentWillUnmount() {
        bulkRemoveEventListener(window, Knob.events.DRAG, this.onDrag)
        bulkRemoveEventListener(window, Knob.events.DRAG_END, this.onDragEnd)
    }

    onDragStart = (e) => {
        e.stopPropagation()

        // Track the starting X, Y position so we can determine the delta of
        // the drag action. Bind events to the window object so we can
        // handle changes caused by the drag action.
        const {x, y} = getPointerPosition(e)
        this.setState({isDragging: true, startX: x, startY: y})
    }

    onDrag = (e) => {
        if (!this.state.isDragging) {
            return
        }

        e.preventDefault()
        e.stopPropagation()

        // Detemine the delta of the drag and transform the knob using the delta
        // this will create the effect that the dragged item moves as the pointer moves.
        const {x, y} = getPointerPosition(e)
        const deltaX = x - this.state.startX
        const deltaY = y - this.state.startY

        const {sensitivity} = this.props
        const step = 5 // increment/decrement by 5 minutes
        const distance = Math.sqrt((deltaX ** 2) + (deltaY ** 2))
        const durationMin = Math.floor(distance / SENSITIVITY[sensitivity]) * step
        const durationMs = durationMin * 60 * 1000 // min * sec/min * ms/sec

        this.setState({
            style: {
                transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.2)`,
                transition: 'none'
            }
        })

        this.props.onDrag &&
        this.props.onDrag({duration: durationMs})
    }

    onDragEnd = (e) => {
        // Need this check in case that mouseup/touchend event occurs
        // without the mousedown/touchstart on the trigger element
        if (!this.state.isDragging) {
            return
        }

        e.stopPropagation()

        this.setState({
            isDragging: false,
            style: {}
        }, this.props.onDragEnd)
    }

    render() {
        const {
            isDragging,
            style
        } = this.state

        const dragStyles = prefix(style)
        const coord = this.coord

        return (
            <div css={[styles]}>
                {isDragging && (
                    <svg>
                        <line
                            strokeDasharray="4 4"
                            x1="50%"
                            y1="50%"
                            x2={coord.x}
                            y2={coord.y}
                        />
                    </svg>
                )}

                <div
                    className='knob'
                    ref={this.knob}
                    style={dragStyles}
                    onMouseDown={this.onDragStart}
                    onTouchStart={this.onDragStart}
                />
            </div>
        )
    }
}

Knob.propTypes = {
    sensitivity: PropTypes.oneOf(Object.keys(SENSITIVITY)),
    onDragEnd: PropTypes.func,
}

Knob.defaultProps = {
    sensitivity: 'MEDIUM'
}

export default Knob
