/** @jsx jsx */

import React from 'react'
import PropTypes from 'prop-types'
import {jsx} from '@emotion/core'
import StopButton from 'components/button/stop'

import Knob from './partials/knob'
import Progress from './partials/progress'
import TimeLabel from './partials/time-label';
import styles from './styles'

class Timer extends React.PureComponent {
    // ===============================
    //  STATIC METHODS & PROPERTIES
    // ===============================

    static getDerivedStateFromProps({alarm}) {
        return alarm
            ? {isStarted: true, duration: alarm.duration}
            : {isStarted: false}
    }

    // ===============================
    //  INSTANCE METHODS & PROPERTIES
    // ===============================

    state = {
        duration: 0,
        isStarted: false,
        remainingDuration: 0,
    }

    timeout = null

    /**
     * @type {Number} calculates the progress of the timer
     * */
    get progress() {
        const {duration, isStarted, remainingDuration} = this.state
        return isStarted ? (remainingDuration / duration) : 0
    }

    componentDidUpdate(prevProps) {
        const {alarm: prevAlarm} = prevProps
        const {alarm} = this.props

        // If there is no alarm – no action needed
        if (!alarm) {
            return
        }

        // If the previous alarm and current alarm are the same – no action needed
        if (prevAlarm && (alarm.id === prevAlarm.id)) {
            return
        }

        // There is a new alarm set, we need to calculate the remaining duration
        // and start the timer if the alarm is still active
        const remainingDuration = alarm.when - Date.now()

        remainingDuration > 0 &&
        this.start(remainingDuration)
    }


    start = (duration) => {
        const oneSecond = 1000
        const remainingDuration = Math.max(duration - oneSecond, 0)
        const isActive = remainingDuration > 0

        this.setState({remainingDuration}, () => {
            // If there is no duration left on the alarm, end it.
            if (!isActive) {
                return this.end()
            }

            this.timeout = setTimeout(() => this.start(remainingDuration), oneSecond)
        })
    }

    end = () => {
        clearTimeout(this.timeout)

        this.props.onAlarmEnd &&
        this.props.onAlarmEnd()

        this.setState({
            duration: 0,
            remainingDuration: 0
        })
    }

    onDrag = ({duration}) => {
        // As the knob is dragged, we want to update the time label
        this.setState({duration, remainingDuration: duration})
    }

    onDragEnd = () => {
        // When the knob is released, we set an alarm if possible
        const duration = this.state.duration

        duration > 0 &&
        this.props.onAlarmSet &&
        this.props.onAlarmSet({duration})
    }

    render() {
        const {
            duration,
            isStarted,
            remainingDuration
        } = this.state

        const {sensitivity} = this.props

        return (
            <div css={styles}>
                <Progress progress={this.progress} />

                {Boolean(duration) && Boolean(remainingDuration) && (
                    <TimeLabel duration={remainingDuration} />
                )}

                {!isStarted && (
                    <Knob
                        sensitivity={sensitivity}
                        onDrag={this.onDrag}
                        onDragEnd={this.onDragEnd}
                    />
                )}

                {isStarted && (
                    <StopButton className="stop-button" onClick={this.end} />
                )}
            </div>
        )
    }
}

Timer.propTypes = {
    alarm: PropTypes.object,
    progress: PropTypes.number,
    sensitivity: PropTypes.string,
    onAlarmEnd: PropTypes.func,
    onAlarmSet: PropTypes.func,
}

export default Timer
