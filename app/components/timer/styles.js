import COLORS from 'styles/variables/color'
import {VSTEP} from 'styles/variables/spacing'
import {toREM} from 'styles/utils/spacing'
import {CAPTION_TEXT} from 'styles/utils/typography'

export default {
    height: '100%',
    position: 'relative',
    width: '100%',
    svg: {
        overflow: 'initial',
    },
    '.stop-button': {
        color: COLORS.WHITE,
        opacity: 0.6,
        position: 'absolute',
        right: toREM(VSTEP),
        top: 0,
        ...CAPTION_TEXT,
        '&:hover': {
            opacity: 1
        }
    }
}
