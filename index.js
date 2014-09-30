#!/usr/bin/env node
var parse = require("parse-json-response")
var hh = require("http-https")

var root = "https://registry.npmjs.org/-/user/org.couchdb.user:"

var getEmail = module.exports = function(username, callback) {
  var url = root + username
  hh.get(url, parse(function (er, data) {
    callback(er, data && data.email)
  }))
}

if (require.main === module) {
  if (!process.argv[2]) {
    console.error("usage: get-email-address-from-npm-username <username>")
    process.exit(1)
  }

  getEmail(process.argv[2], function(er, address) {
    if (er) {
      console.error(er.message)
      process.exit(1)
    }
    console.log(address)
  })
}
