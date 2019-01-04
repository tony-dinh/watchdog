import {toREM} from 'styles/utils/spacing'

export default {
    alignItems: 'center',
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    letterSpacing: toREM(1),

    svg: {
        fill: 'currentColor',
        height: toREM(24),
        width: toREM(24),
    },
}
