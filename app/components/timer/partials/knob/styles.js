import {toREM} from 'styles/utils/spacing'
import COLORS from 'styles/variables/color'
import {VSTEP} from 'styles/variables/spacing'

export default {
    '.knob': {
        backgroundColor: COLORS.THEME.PRIMARY,
        borderRadius: '50%',
        bottom: 0,
        cursor: 'pointer',
        height: toREM(VSTEP * 3),
        left: 0,
        margin: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        transformOrigin: 'center',
        width: toREM(VSTEP * 3),
        transition: 'all 100ms',
        zIndex: 2,
        '&:hover': {
            transform: 'scale(1.3)'
        }
    },
    svg: {
        bottom: 0,
        height: '100%',
        left: 0,
        opacity: '0.3',
        position: 'absolute',
        right: 0,
        stroke: COLORS.BLACK,
        top: 0,
        width: '100%',
    }
}
