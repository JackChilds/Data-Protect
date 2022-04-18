# Data Protect
Protect data such as email addresses from spam bots on your website

## Important
**This package should not be used to transport sensitive information accross the internet as the methods of encryption and decryptions are not built with the purpose of securing data but instead obfuscating it. If you need to encrypt and decrypt data you should instead look for a cryptography library using algorithms like AES and RSA.**

## What is this?
This [npm package](https://npmjs.com/package/data-protect) contains tools that you may use to try to reduce spam through email links and other vulnerable data on your website by hiding the data from the source code through a customisable encoding/decoding process. It is recommended that you read the blog post [here](https://jackchilds.tech/posts/reducing_spam_from_mailto_links) for more information.


## Real world example
For a real world example, take a look at [my website](https://jackchilds.tech), specifically the [index.js page](https://github.com/JackChilds/website/blob/39bf3284cd3cd1c9d414161e6c2fa8ac5d3f3efa/pages/index.js) and the [contact_email.js component](https://github.com/JackChilds/website/blob/39bf3284cd3cd1c9d414161e6c2fa8ac5d3f3efa/components/contact_email.js).

## Reference

### options
The default config can be read (and modified) by accessing the defaultConfig property. 
```js
{
    key: 'secret key', // a string that will be used in the encoding process
    x: 5, // a number that influences the result
    delimiter: '-', // characer(s) that goes between numbers
    suppressConsole: false // if for whatever reason you want to go against the recommended advice, you can make the code shut up by setting this to true
}
```

### encodeData (data, options)
**data**: can be a string, number, whatever
**options**: should match the syntax of the options object. If properties of the object are not set, defaults will be used

### decodeData (data, options)
**data**: is the encoded data
**options**: same as what you used for encoding