var fs = require('fs')
var glob = require('glob')
var lib = require('./docs-helpers.js')

var docs = './content/docs/**/*.md'
var intro = './content/intro/**/*.md'

// templating
var htmlTemplate = fs.readFileSync(
  './build/templates/TableOfContents.html',
  'utf8'
)
var template = require('es6-template-strings')

// functions
function writeLinks(linkObject, filename, docType) {
  let value = '\n'
  let hiddenKeys = docType === 'intro'
    ? ['Hidden']
    : ['Hidden', 'Getting Started', 'Docs']

  if (docType === 'docs') {
    value += `  <div class="title">Documentation</div>\n`
    value += `  <router-link :to="'/docs'" exact>Home</router-link>\n`
  }
  Object.keys(linkObject).forEach(key => {
    if (hiddenKeys.indexOf(key) === -1) {
      value += `  <div class="title">${key}</div>\n`
      linkObject[key].forEach(link => {
        if (link.title === '2. First App') {
          value += `  <router-link to="/download">1. Download Tendermint</router-link>\n`
        }
        value += `  <router-link :to="'${link.url}'">${link.title}</router-link>\n`
      })
    }
  })

  return value
}

function writeTemplate(data, filename, docType) {
  let links = writeLinks(data, filename, docType)
  let filedata = template(htmlTemplate, { data: links })
  fs.writeFileSync(filename, filedata, 'utf8')
  console.log(`  ✓ ${filename}`)
}

function arrayToObject(array) {
  let object = {}
  let sectionKeys = new Set()
  array.forEach(d => {
    sectionKeys.add(d.section)
  })
  sectionKeys.forEach(key => {
    object[key] = array.filter(el => el.section === key)
  })
  return object
}

function buildAll(wildcard, filename, docType) {
  let filenames
  glob(wildcard, function(err, files) {
    if (err) console.log(err)
    filenames = files
    let data = lib.filesToArray(filenames)
    data = arrayToObject(data)
    writeTemplate(data, filename, docType)
  })
}

module.exports = function() {
  buildAll(docs, './src/components/PageDocsMaster.vue', 'docs')
  buildAll(intro, './src/components/PageIntroMaster.vue', 'intro')
}
