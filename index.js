const DataProtect = {
    _options: function (x) {
        const y = {
            key: 'secret key', // just a string
            x: 5, // just a number
            delimiter: '-' // character(s) that are not a number
        }
        x = x || {}
        Object.keys(y).forEach(function(k) {
            if (typeof x[k] === 'undefined') {
                x[k] = JSON.parse(JSON.stringify(y[k]))
            }
        });
        x.key = x.key.toString()
        x.delimiter = x.delimiter == '' ? '-' : x.delimiter // the delimiter should not be ''

        x.x = Math.round(x.x) // decimals make the return value messy, and issues with float accuracy could cause data corruption

        return x
    },
    encodeData: function (data, options) {
        options = this._options(options)

        function encode(d, opts) {
            k = 0
            for (let i = 0; i < d.length; i ++) {
                if (i > opts.key.length -1 && k > opts.key.length -1) k = 0
                d[i] = d[i].toString().charCodeAt() + (opts.key.charCodeAt(k) * opts.x)
                k++
            }
            return d
        }
        
        data = encode(data.toString().split(''), options)
    
        return data.join(options.delimiter)
    },
    decodeData: function (data, options) {
        options = this._options(options)

        function decode(d, opts) {
            k = 0
            for (let i = 0; i < d.length; i ++) {
                if (i > opts.key.length -1 && k > opts.key.length -1) k = 0
                d[i] = String.fromCharCode(d[i] - (opts.key.charCodeAt(k)) * opts.x)
                k++
            }
            return d
        }

        data = decode(data.split(options.delimiter), options)
        return data.join('')
    }
}

module.exports = { DataProtect }