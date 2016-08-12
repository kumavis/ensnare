const test = require('tape')
const ensnare = require('./')


test('basic test', function(t){

  let callCount = 0

  let a = {}
  a.snake = true

  let target = ensnare(a, function() {
    callCount++
  })

  t.equals(callCount, 0, 'ensnare called 0')
  target.snake
  t.equals(callCount, 1, 'ensnare called 1')
  target.snake
  t.equals(callCount, 2, 'ensnare called 2')

  t.end()

})

test('function test', function(t){

  let callCount = 0

  let a = {}
  a.snake = function(){}

  let target = ensnare(a, function() {
    callCount++
  })

  t.equals(callCount, 0, 'ensnare called 0')
  target.snake()
  t.equals(callCount, 1, 'ensnare called 1')
  target.snake()
  t.equals(callCount, 2, 'ensnare called 2')

  t.end()

})

test('non-target test', function(t){

  let callCount = 0

  let a = {}
  a.snake = true

  let target = ensnare(a, function() {
    callCount++
  })
  let nonTarget = a

  t.equals(callCount, 0, 'ensnare called 0')
  nonTarget.snake
  t.equals(callCount, 0, 'ensnare called 0')
  nonTarget.snake
  t.equals(callCount, 0, 'ensnare called 0')

  t.end()

})

test('inheritance test', function(t){

  let callCount = 0

  let a = {}
  a.snake = true
  let b = Object.create(a)

  let target = ensnare(b, function() {
    callCount++
  })

  t.equals(callCount, 0, 'ensnare called 0')
  target.snake
  t.equals(callCount, 1, 'ensnare called 1')
  target.snake
  t.equals(callCount, 2, 'ensnare called 2')

  t.end()

})

test('prototype test', function(t){

  let callCount = 0

  function A() {}
  A.prototype.snake = true

  let a = new A()

  let target = ensnare(a, function() {
    callCount++
  })

  t.equals(callCount, 0, 'ensnare called 0')
  target.snake
  t.equals(callCount, 1, 'ensnare called 1')
  target.snake
  t.equals(callCount, 2, 'ensnare called 2')

  t.end()

})
