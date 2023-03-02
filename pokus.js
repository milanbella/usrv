function demonstrationOfClosure_1() {
    function multiplyNumberByN(n) {
        return function (num) {
            console.log(`multiplying by ${n}`)
            return num * n
        }
    }

    function addNumbers(m, n) {
        return m + n
    }

    let f2 = multiplyNumberByN(2)
    let f5 = multiplyNumberByN(5)

    let val = addNumbers(f2(4), f5(3))

    console.log(`val = ${val}`)
}
demonstrationOfClosure_1()
