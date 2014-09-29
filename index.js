var superagent = require("superagent")
var cheerio = require("cheerio")

var getEmail = module.exports = function(username, callback) {
  superagent.get("https://www.npmjs.org/~" + username).end(function(res) {
    var $ = cheerio.load(res.text)
    try {
      var email = $("[data-email]").data().email
      email = email.split('%').slice(1).map(function(x) {
        return String.fromCharCode(parseInt(x, 16))
      }).join('')
      return callback(null, email)
    } catch(e) {
      return callback("Email not found")
    }
  })
}
