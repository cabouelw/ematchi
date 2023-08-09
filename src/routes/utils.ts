export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function get_twemoji_url(emoji: string): string {
    const code = [...emoji].map(c => c.codePointAt(0)?.toString(16)).join('-');
    return `/twemoji/${code}.svg`
    // return `https://twemoji.maxcdn.com/v/latest/svg/${emoji.codePointAt(0)?.toString(16)}.svg`;
}