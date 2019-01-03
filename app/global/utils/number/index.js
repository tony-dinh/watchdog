
export const renderPaddedDigit = (digit) => {
    return (digit / 10)
        .toFixed(1)
        .toString()
        .replace('.', '')
}
