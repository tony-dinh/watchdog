import {toREM} from 'styles/utils/spacing'
import {CAPTION_TEXT} from 'styles/utils/typography'
import COLORS from 'styles/variables/color'
import {VSTEP} from 'styles/variables/spacing'

export default {
    bottom: toREM(VSTEP),
    display: 'block',
    color: COLORS.WHITE,
    left: 0,
    margin: 'auto',
    opacity: 0.6,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    ...CAPTION_TEXT
}
