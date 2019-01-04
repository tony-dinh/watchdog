import {VSTEP} from 'styles/variables/spacing'
import {toREM} from 'styles/utils/spacing'
import {BODY_TEXT} from 'styles/utils/typography'

export default {
    border: 0,
    margin: 0,
    minHeight: toREM(VSTEP * 5),
    minWidth: toREM(VSTEP * 5),
    outline: 0,
    padding: toREM(VSTEP),
    transition: 'all 250ms',
    cursor: 'pointer',
    ...BODY_TEXT
}
