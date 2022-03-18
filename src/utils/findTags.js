export const pattern = /#\b[a-z-0-9]+\b/gi

export const findTags = (string) => {
    const pattern = /#\b[a-z-0-9]+\b/gi
    return string.match(pattern)
}