/** @jsx jsx */

import React from 'react'
import PropTypes from 'prop-types'
import {jsx} from '@emotion/core'
import ParallaxLayer from 'components/parallax-layer'
import StopButton from 'components/button/stop'

import Knob from '../../partials/knob'
import TimeLabel from '../../partials/time-label'
import styles from './styles'

const ParallaxTimerTemplate = ({
    duration,
    isStarted,
    remainingDuration,
    sensitivity,
    onDrag,
    onDragEnd,
    onEnd,
}) => {
    return (
        <div css={styles}>
            <ParallaxLayer
                className="background"
                duration={isStarted ? 20000 : 0}
                position="bottom left"
                src="/build/assets/background.png"
            />
            <ParallaxLayer
                className="midground"
                duration={isStarted ? 10000 : 0}
                position="bottom left"
                src="/build/assets/midground.png"
            />
            <ParallaxLayer
                className="foreground"
                duration={isStarted ? 5000 : 0}
                position="bottom left"
                src="/build/assets/foreground.png"
            />

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

ParallaxTimerTemplate.propTypes = {
    duration: PropTypes.number,
    isStarted: PropTypes.bool,
    progress: PropTypes.number,
    remainingDuration: PropTypes.number,
    sensitivity: PropTypes.string,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onEnd: PropTypes.func,
}

export default React.memo(ParallaxTimerTemplate)
