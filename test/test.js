const { DataProtect } = require('../index.js');

function test() {
    const keys = [undefined, 'secret', 's', '1', 2, 3.231, 'pifjiodsjifOES', '*ASUDO09AU()D*AUD09\\::DSK;DSK;KALDJLMMSMKLAMDEWU903U9031MALSDMSAMDIOJDW'] // random strings, ints, floats, etc.
    const delimiters = [undefined, '.', ',', '-', ' ', ';', '=', ':', '+', '*', '&', '^', '%', '$', '#', '@', '!', '~', '`', '|', '\\', '/', '?', '>', '<', ')', '(', ']', '[', '}', '{', ']', '[']
    const datas = ['hello world', 12393912, '12joidjsmSKAJdopAS()D*)Dxjk', 'asdui3y79yadAuih', '123', 'a', 12.22, '*']
    const xs = [1,2,23,3,4,4,2.12,1000]

    let passed = 0;

    keys.forEach ((k) => {
        delimiters.forEach((d) => {
            datas.forEach((data) => {
                xs.forEach((x) => {
                    const options = {
                        key: k,
                        delimiter: d,
                        x: x,
                        suppressConsole: true
                    }
                    const encoded = DataProtect.encodeData(data, options)
                    const decoded = DataProtect.decodeData(encoded, options)
                    
                    if (data != decoded) {
                        console.log(`\n\nError: encoded does not match decoded.\nKey: ${k}\nDelimiter: ${d}\nX: ${x}\nData: ${data}\nEncoded: ${encoded}\nDecoded: ${decoded}\n`)
                        return
                    }
                    passed ++
                })
            })
        })
    })

    console.log(`Passed: ${passed}`)
}

test()
