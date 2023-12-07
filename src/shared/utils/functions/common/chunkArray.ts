export function chunkArray<T>(items: Array<T>, size: number = 5): Array<Array<T>> {
    return items.flatMap((_, i) =>
        i % size === 0 ? [items.slice(i, i + size)] : []
    );
}