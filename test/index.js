var assert = require('assert')
var get = require('..')

describe("get-email-address-from-npm-username", function() {

  it("returns email for a user", function(done){
    get("zeke", function(err, email){
      assert.equal(email, "zeke@sikelianos.com")
      done()
    })
  })

  it("returns an error for a non-user", function(done){
    get("zeke1234567890", function(err, email){
      assert(err)
      assert(!email)
      done()
    })
  })

})
