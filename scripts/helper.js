const arrayCompare = f => ([x, ...xs]) => ([y, ...ys]) =>
    x === undefined && y === undefined
        ? true
        : Boolean(f(x)(y)) && arrayCompare(f)(xs)(ys)
const isArray =
    Array.isArray

const arrayDeepCompare = f =>
    arrayCompare(a => b =>
        isArray(a) && isArray(b)
            ? arrayDeepCompare(f)(a)(b)
            : f(a)(b))