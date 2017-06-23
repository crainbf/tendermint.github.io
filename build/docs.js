var master = require('./docs-master.js')
var entries = require('./docs-entries.js')
var routes = require('./docs-routes.js')
var retrieve = require('./docs-retrieve.js')


retrieve().then(() => {
  master()
  entries()
  routes()
})
