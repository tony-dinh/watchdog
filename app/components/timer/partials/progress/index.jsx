/** @jsx jsx */

import React from 'react'
import {jsx} from '@emotion/core'
import styles from './styles'
import COLORS from 'styles/variables/color'

const RADIUS = 50
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const Progress = ({css, progress}) => (
    <div css={[styles, css]}>
        <svg
            viewBox="0 0 150 150"
            preserveAspectRatio="xMinYMid"
        >
            <circle
                cx="50%"
                cy="50%"
                r={RADIUS}
                stroke={COLORS.THEME.SECONDARY}
                fill="transparent"
                strokeWidth="1"
            />
            <circle
                cx="50%"
                cy="50%"
                fill="transparent"
                r={RADIUS}
                stroke={COLORS.THEME.PRIMARY}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={`${(1 - progress) * CIRCUMFERENCE}`}
                strokeWidth="3"
            />
        </svg>
    </div>
)

export default React.memo(Progress)
