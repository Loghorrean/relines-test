// Тут у нас реализация логгера условная. Пока console.log, но в дальнейшем можно поменять.
export const useLogger = () => {
    const log = (message: string) => {
        console.log(message);
    }
    return {
        log
    }
}