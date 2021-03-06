/** @jsx jsx */

import React from 'react'
import PropTypes from 'prop-types'
import {jsx} from '@emotion/core'
import Caption from 'components/caption'
import Timer from 'components/timer'
import styles from './styles'

const Popup = ({alarm, onAlarmEnd, onAlarmSet}) => (
    <div css={styles}>
        <Timer alarm={alarm} onAlarmSet={onAlarmSet} onAlarmEnd={onAlarmEnd} />
        {!alarm && <Caption text="Drag the knob to set a timer" />}
    </div>
)

Popup.propTypes = {
    alarm: PropTypes.object,
    onAlarmEnd: PropTypes.func,
    onAlarmSet: PropTypes.func
}

export default React.memo(Popup)
