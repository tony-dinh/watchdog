/** @jsx jsx */
import {jsx} from '@emotion/core'
import {prefix} from 'inline-style-prefixer'
import styles from './styles'

const ParallaxLayer = ({
    className,
    css,
    duration,
    isAnimating,
    position,
    src
}) => {
    const imgStyle = prefix({
        animationDuration: `${duration}ms`,
        animationPlayState: isAnimating ? 'running' : 'paused',
        background: `url(${src}) repeat-x`,
        backgroundPosition: position,
    })

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
