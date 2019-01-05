/** @jsx jsx */
import {jsx} from '@emotion/core'
import styles from './styles'

const ParallaxLayer = ({
    className,
    css,
    duration,
    position,
    src
}) => {
    let imgStyle = {
        background: `url(${src}) repeat-x`,
        backgroundPosition: position,
    }

    if (duration) {
        imgStyle = {
            ...imgStyle,
            animationDuration: `${duration}ms`,
            animationFillMode: 'forwards',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
        }
    }

    return (
        <div className={className} css={[styles, css]}>
            <div
                className="image"
                style={imgStyle}
            />
        </div>
    )
}

export default ParallaxLayer
