let axios = require('axios')
let unzip = require('unzip-stream')
let rimraf = require('rimraf')
let mkdirp = require('mkdirp')
let path = require('path')
let { createWriteStream } = require('fs')
const DOCS_PATH = __dirname + '/../content/docs'
const TENDERMINT_REPO_ZIP_URL =
  'https://github.com/tendermint/tendermint/archive/master.zip'

/*
  copies //github.com/tendermint/tendermint/docs into /content/docs
*/

module.exports = function retrieve() {
  return new Promise((resolve, reject) => {
    rimraf.sync(DOCS_PATH)
    axios({
      method: 'get',
      url: TENDERMINT_REPO_ZIP_URL,
      responseType: 'stream'
    }).then(response => {
      mkdirp.sync(DOCS_PATH)
      response.data
        .pipe(unzip.Parse())
        .on('entry', entry => {
          let pieces = entry.path.split('tendermint-master/docs/')
          if (pieces.length > 1) {
            if (entry.type === 'Directory') {
              mkdirp.sync(DOCS_PATH + '/' + pieces[1])
            } else {
              let parentDirName = path.dirname(DOCS_PATH + '/' + pieces[1])
              mkdirp.sync(parentDirName)
              entry.pipe(createWriteStream(DOCS_PATH + '/' + pieces[1]))
            }
          }
        })
        .on('end', () => {
          setTimeout(() => resolve(), 1000)
        })
    })
  })
}
