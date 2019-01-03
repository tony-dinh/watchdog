import {BASE_FONT_FAMILY} from 'styles/variables/typography'
import {VSTEP} from 'styles/variables/spacing'
import {toREM} from 'styles/utils/spacing'

export const BODY_TEXT = {
    fontFamily: BASE_FONT_FAMILY,
    fontSize: toREM(16),
    lineHeight: toREM(VSTEP * 2),
}

export const HEADING_TEXT_SM = {
    fontFamily: BASE_FONT_FAMILY,
    fontSize: toREM(24),
    lineHeight: toREM(VSTEP * 3),
}

export const HEADING_TEXT_MD = {
    fontFamily: BASE_FONT_FAMILY,
    fontSize: toREM(36),
    lineHeight: toREM(VSTEP * 3),
}

export const CAPTION_TEXT = {
    fontFamily: BASE_FONT_FAMILY,
    fontSize: toREM(12),
    lineHeight: toREM(VSTEP * 2),
}

