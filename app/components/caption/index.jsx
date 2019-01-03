/** @jsx jsx */

import React from 'react'
import {jsx} from '@emotion/core'
import styles from './styles'

const Caption = ({text}) => (
    <span css={styles}>{text}</span>
)

export default React.memo(Caption)
