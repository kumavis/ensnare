module.exports = ensnare

// creates a proxy object that calls cb everytime the obj's properties/fns are accessed
function ensnare (obj, cb) {
  var proxy = {}
  getAllPropertyNames(obj).forEach(function (key) {
    var val = obj[key]
    switch (typeof val) {
      
      // bind function to original obj
      case 'function':
        proxy[key] = function () {
          cb()
          return val.apply(obj, arguments)
        }
        return

      // pass through to setter getter
      default:
        Object.defineProperty(proxy, key, {
          get: function () {
            cb()
            return obj[key]
          },
          set: function (val) {
            cb()
            obj[key] = val
            return val
          },
        })
        return
    }
  })
  return proxy
}

function getAllPropertyNames(obj) {
  var props = []
  walkPrototypeChain(obj, function(target){
    for (key in target) {

      // only add props if unique
      if ( props.indexOf( key ) === -1 ) {
        props.push( key )
      }

    }
  })
  return props
}

function walkPrototypeChain(obj, fn) {
  var target = obj
  do {
    fn(target)
  } while ( target = Object.getPrototypeOf( target ) )
}