# electron-is
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/electron-is.svg?branch=master)](https://travis-ci.org/delvedor/electron-is)

An 'is' utility for Electron.  
`electron-is` provides a set of isomorphic 'is' APIs, that you can use it both in main and renderer process.  
See <a href="#usage">usage</a> for more information.

## Install
```
$ npm install electron-is --save
```

## API

- **is.renderer()**  
Returns `true` if you are calling the function from the renderer process.

- **is.main()**  
Returns `true` if you are calling the function from the main process.

- **is.macOS()** *aliases* **is.osx()**  
Returns `true` if your app is running under Mac OS.

- **is.windows()**  
Returns `true` if your app is running under Windows OS.

- **is.linux()**  
Returns `true` if your app is running under Linux OS.

- **is.x86()**  
Returns `true` if you the architecture of the processor is `ia32`.

- **is.x64()**  
Returns `true` if you the architecture of the processor is `x64`.

- **is.production()**  
Returns `true` if you are running the app in a `production` environment.

- **is.dev()**  
Returns `true` if you are running the app in a `dev` environment.

- **is.sandbox()** *only* ***macOS***  
Returns `true` if you are running the app in a `sandbox` environment under macOS.

- **is.mas()**  
Returns `true` if the app is running as a Mac App Store build.

- **is.windowsStore()**  
Returns `true` if the app is running as a Windows Store (appx) build.

- **is.all(args)**  
Returns `true` if all the 'is functions' passed as argument are true.  
example: `is.all(is.osx, is.x64)`

- **is.none(args)**  
Returns `true` if all the 'is functions' passed as argument are false.  
example: `is.none(is.windows, is.x86, is.main)`

- **is.one(args)**  
Returns `true` if one of the 'is functions' passed as argument is true.  
example: `is.one(is.osx, is.linux)`

- **is.release(args)**  
Checks the if the given release is the same of the OS (\*)  
example: `is.release('10.0.10586')`

- **is.gtRelease(args)**  
Checks if the given release is greater than the current OS release (\*)  
example: `is.gtRelease('10.9.5')`

- **is.ltRelease(args)**  
Checks if the given release is less than the current OS release (\*)  
example: `is.ltRelease('6.3')`

The [Mac](https://en.wikipedia.org/wiki/Darwin_%28operating_system%29#Release_history) versions are mapped as `osx: darwin`, you must pass the *9.x.y* or *10.x.y* OSX version as argument and not the darwin version.  
If you are testing a [Windows](https://en.wikipedia.org/wiki/List_of_Microsoft_Windows_versions) release you must pass the NT release, it can be *x.y* or *x.y.build* .

\* *Not implemented for Linux yet*

<a name="usage"></a>
## Usage
- In Main process:
```javascript
// es6
import is from 'electron-is'
// es5
const is = require('electron-is')
console.log(is.main())
```
- In Renderer process:
```html
<script>
    const is = require('electron-is')
    console.log(is.renderer())
</script>
```
## Acknowledgements
`electron-is` makes use of [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) package from @sindresorhus.

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
______________________________________________________________________________________________________________________
## License
**[MIT](https://github.com/delvedor/electron-is/blob/master/LICENSE)**

*The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.*

Copyright © 2016 Tomas Della Vedova
