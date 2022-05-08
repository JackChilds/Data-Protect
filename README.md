# Data Protect
Protect data such as email addresses from spam bots on your website

```sh
npm i data-protect
```

## Important
**This package should not be used to transport sensitive information accross the internet as the methods of encryption and decryptions are not built with the purpose of securing data but instead obfuscating it. If you need to encrypt and decrypt data you should instead look for a cryptography library using algorithms like AES and RSA.**

## What is this?
This [npm package](https://npmjs.com/package/data-protect) contains tools that you may use to try to reduce spam through email links and other vulnerable data on your website by hiding the data from the source code through a customisable encoding/decoding process. It is recommended that you read the blog post [here](https://jackchilds.tech/posts/reducing_spam_from_mailto_links) for more information.


## Real world example
For a real world example, take a look at [my website](https://jackchilds.tech), specifically the [index.js page](https://github.com/JackChilds/website/blob/39bf3284cd3cd1c9d414161e6c2fa8ac5d3f3efa/pages/index.js) and the [contact_email.js component](https://github.com/JackChilds/website/blob/39bf3284cd3cd1c9d414161e6c2fa8ac5d3f3efa/components/contact_email.js).

## Reference

### Options
*DataProtect.options: get, set*

The default config can be read (and modified) by accessing the defaultConfig property. 
```js
{
    key: 'secret key', // a string that will be used in the encoding process
    x: 5, // a number that influences the result
    delimiter: '-', // characer(s) that goes between numbers
    suppressConsole: false // if for whatever reason you want to go against the recommended advice, you can make the code shut up by setting this to true
}
```

### Encode Data
*DataProtect.encodeData (data, options)*

- **data**: can be a string, number, whatever
- **options**: should match the syntax of the options object. If properties of the object are not set, defaults will be used

### Decode Data
*DataProtect.decodeData (data, options)*

- **data**: is the encoded data
- **options**: same as what you used for encoding

## Next.js Example
**Component:**
```js
import React from 'react';

import { DataProtect } from 'data-protect'

export default class ContactEmail extends React.Component {
    constructor(props) {
        super(props)
        this.placeholder = 'loading...'

        // ensure that these options match those used to encode the component
        this.options = {
            key: props.emailKey,
            x: 8,
            delimiter: ' '
        }
        this.state = {
            email: this.placeholder
        }
    }

    componentDidMount() {
        this.delayTimer = setTimeout(() => {
            this.setState({
                email: DataProtect.decodeData(this.props.encodedEmail, this.options)
            })
        }, this.props.delay)
    }

    componentWillUnmount() {
        clearTimeout(this.delayTimer)
    }

    render() {
        return (
            <a href={this.state.email === this.placeholder ? '#' : `mailto:${this.state.email}?subject=${this.props.subject}`}
            className="hover:underline hover:text-gray-300">
                { this.state.email }
            </a>
        )
    }
}
```
**getStaticProps and usage**

(getStaticProps is used to ensure that the email is encoded at build time)

```js
import { DataProtect } from 'data-protect'
export async function getStaticProps () {
    // generate a random string
    const key = ((Math.random() + 1).toString(36).substring(2,9)) + ((Math.random() + 1).toString(36).substring(2,9)); 

    return {
        props: {
            encodedEmail: DataProtect.encodeData("someone@example.com",
            {
                key: key,
                x: 8,
                delimiter: ' '
            }),
            emailKey: key
        }
    }
}
```
```xml
<ContactEmail encodedEmail={encodedEmail} emailKey={emailKey} subject="I am interested in your work" delay="3000" />
```
