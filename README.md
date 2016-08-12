### ensnare

creates a proxy object that calls cb everytime the obj's properties/fns are accessed

```js
let originalObj = [1,2,3]
let ensnaredObj = ensnare(originalObj, () => console.log('bing bong!'))

ensnaredObj.pop() //=> logs "bing bong!", returns 1
ensnaredObj[0] //=> logs "bing bong!", returns 2
```
