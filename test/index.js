var assert = require('assert')
var get = require('..')
var spawn = require('child_process').spawn
var node = process.execPath
var bin = require.resolve('..')

describe("get-email-address-from-npm-username", function() {

  it("returns email for a user", function(done){
    get("zeke", function(err, email){
      assert.equal(email, "zeke@sikelianos.com")
      done()
    })
  })

  it("returns an error for a non-user", function(done){
    get("this is not a valid user", function(err, email){
      assert(err)
      assert(!email)
      done()
    })
  })

  it("bin fails without arg", function(done){
    var c = spawn(node, [bin])
    c.on("close", function(code) {
      assert(code)
      done()
    })
  })

  it("bin errors for non-user", function(done){
    var c = spawn(node, [bin, "this is not a valid user"])
    c.on("close", function(code) {
      assert(code)
      done()
    })
  })

  it("bin returns email for a user", function(done){
    var c = spawn(node, [bin, "zeke"])
    var email = ''
    c.stdout.on('data', function (c) { email += c })
    c.on("close", function(code) {
      assert(!code)
      assert.equal(email, "zeke@sikelianos.com\n")
      done()
    })
  })

})
