import COLORS from 'styles/variables/color'
import {VSTEP} from 'styles/variables/spacing'
import {toREM} from 'styles/utils/spacing'
import {CAPTION_TEXT} from 'styles/utils/typography'

export default {
    height: '100%',
    position: 'relative',
    width: '100%',
    '.stop-button': {
        color: COLORS.WHITE,
        opacity: 0.6,
        position: 'absolute',
        right: toREM(VSTEP),
        bottom: 0,
        ...CAPTION_TEXT,
        '&:hover': {
            opacity: 1
        }
    },
    '.background, .midground, .foreground': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    '.background': {
        top: 0,
    }
}
