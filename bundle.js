(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DataProtect = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DataProtect = {
    defaultConfig: {
        key: 'secret key', // just a string
        x: 5, // just a number
        delimiter: '-', // character(s) that are not a number
        suppressConsole: false // may want to suppress console when in production
    },
    _options: function (x) {
        x = x || {}

        const that = this // make 'this' accessible to other scopes in function

        Object.keys(this.defaultConfig).forEach(function(k) {
            if (typeof x[k] === 'undefined') {
                x[k] = JSON.parse(JSON.stringify(that.defaultConfig[k]))
            }
        });

        x.key = x.key == '' ? this.defaultConfig.key : x.key

        if (x.key == this.defaultConfig.key && !x.suppressConsole) console.warn("It is highly recommended that you set a key and do not use the default key")
        if (x.key.length < 8 && !x.suppressConsole) console.warn("It is recommended to use a key with length longer than 8")

        x.key = x.key.toString()

        if (x.delimiter == '') {
            x.delimiter = '-' // the delimiter should not be ''
            if (!x.suppressConsole) console.warn('Delimiter should not be "", changed to "-"')
        }

        if (x.x % 1 !== 1 && !x.suppressConsole) console.warn('x rounded to nearest whole number, x should not be set to a floating point number')
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
},{}]},{},[1])(1)
});
