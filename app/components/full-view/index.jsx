/** @jsx jsx */

import React from 'react'
import {jsx} from '@emotion/core'
import styles from './styles'

const FullView = () => (
    <div css={styles}>
        This is the FullView
    </div>
)

export default React.memo(FullView)
