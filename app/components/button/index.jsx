/** @jsx jsx */

import React from 'react'
import {jsx} from '@emotion/core'
import styles from './styles'

const Button = ({children, css, ...rest}) => {
    return (
        <button css={[styles, css]} {...rest}>
            {children}
        </button>
    )
}

export default React.memo(Button)
