
module.exports = readme => ({
  gatherFiles(files) {
    files['index.html'] = readme
  }
})

