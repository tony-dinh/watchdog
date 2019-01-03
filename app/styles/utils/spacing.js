const PX_PER_REM = 10 // based on the default browser font size set to 62.5%

export const toREM = (px) => `${px / PX_PER_REM}rem`
