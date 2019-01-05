import {keyframes} from '@emotion/core'

const slide = keyframes({
    from: {
        transform: 'translate3d(0, 0, 0)'
    },
    to: {
        transform: 'translate3d(-50%, 0, 0)'
    }
})

export default {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    '.image': {
        animationName: `${slide}`,
        height: '100%',
        width: '200%',
    }
}
