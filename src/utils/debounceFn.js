export default function useDebounceFn(func, delay = 250) {
    let timer = null

    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
