/** @jsx jsx */

import React from 'react'
import PropTypes from 'prop-types'
import {jsx} from '@emotion/core'
import StopButton from 'components/button/stop'

import Knob from '../../partials/knob'
import Progress from '../../partials/progress'
import TimeLabel from '../../partials/time-label'
import styles from './styles'

const BasicTimerTemplate = ({
    duration,
    isStarted,
    progress,
    remainingDuration,
    sensitivity,
    onDrag,
    onDragEnd,
    onEnd,
}) => {
    return (
        <div css={styles}>
            <Progress progress={progress} />

            {Boolean(duration) && Boolean(remainingDuration) && (
                <TimeLabel duration={remainingDuration} />
            )}

            {!isStarted && (
                <Knob
                    sensitivity={sensitivity}
                    onDrag={onDrag}
                    onDragEnd={onDragEnd}
                />
            )}

            {isStarted && (
                <StopButton className="stop-button" onClick={onEnd} />
            )}
        </div>
    )
}

BasicTimerTemplate.propTypes = {
    duration: PropTypes.number,
    isStarted: PropTypes.bool,
    progress: PropTypes.number,
    remainingDuration: PropTypes.number,
    sensitivity: PropTypes.string,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onEnd: PropTypes.func,
}

export default React.memo(BasicTimerTemplate)
