/** @jsx jsx */

import PropTypes from 'prop-types'
import {jsx} from '@emotion/core'
import {renderPaddedDigit} from 'global/utils/number'
import styles from './styles'

const TimeLabel = ({duration}) => {
    if (!duration) {
        return (<div css={styles}>00:00:00</div>)
    }

    // Determine hours, min, sec
    const durationSec = duration / 1000

    const hours = Math.floor(durationSec / 3600)
    const minutes = Math.floor((durationSec - (hours * 3600)) / 60)
    const seconds = durationSec - (minutes * 60) - (hours * 3600)

    return (
        <div css={styles}>{`${renderPaddedDigit(hours)}:${renderPaddedDigit(minutes)}:${renderPaddedDigit(seconds)}`}</div>
    )
}

TimeLabel.propTypes = {
    duration: PropTypes.number
}

export default TimeLabel
