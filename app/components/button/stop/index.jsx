/** @jsx jsx */

import React from 'react'
import {jsx} from '@emotion/core'
import Button from '../index'
import styles from './styles'

const StopButton = ({children, className, css, ...rest}) => {
    return (
        <Button className={className} css={[styles, css]} {...rest}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>
            STOP
        </Button>
    )
}

export default React.memo(StopButton)
