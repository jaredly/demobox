
import RCSS from 'rcss'
import React from 'react'
import async from 'async'
import deepmerge from 'deepmerge'
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import fsExtra from 'fs-extra'

import render from './render'

import css from './css'
import parseData from './parse'
import theme2page from './page'
import {walk, objMap, callIf} from './utils'

export default class Demobox {
  constructor(config) {
    this.config = config

    const stylesObj = config.theme.styles(config.themeConfig)
    const {styles, decs} = css.groups(stylesObj)

    this.styles = styles
    this.styleString = RCSS.getStylesString()
    // this.usedThemes = new Set() // use this when multiple themes work?
  }

  generate(done) {
    const plugins = this.config.plugins
    console.log('Collecting files')
    this.collectFiles((err, files) => {
      if (err) return done(err)
      callIf(plugins, 'gatherFiles', files)

      console.log('Processing files')
      this.processDirectory(files, '', (err, files) => {
        if (err) return done(err)
        const derived = {}
        callIf(plugins, 'derivedFiles', derived, files)
        console.log('Processing derived files')
        this.processDirectory(derived, '', (err, derived) => {
          if (err) return done(err)
          const allFiles = deepmerge(files, derived)
          callIf(plugins, 'postProcessFiles', allFiles)
          console.log('Writing files')
          this.writeFiles(allFiles, '', err => {
            if (err) return done(err)
            this.copyAssets(done)
          })
        })
      })
    })
  }

  collectFiles(done) {
    walk(this.config.source, '', done)
  }

  processDirectory(files, path, done) {
    const tasks = objMap(files, name => next => {
      if (!files[name]) return next()
      if (name === '$type') return next(null, files[name])
      const fpath = path + '/' + name
      if (files[name].$type === 'folder') {
        return this.processDirectory(files[name], fpath, next)
      }
      this.processFile(fpath, files[name], next)
    })
    async.parallel(tasks, done)
  }

  processFile(outpath, file, next) {
    if ('string' !== typeof file) {
      if (!file.body && file.rawBody) {
        file.body = render(file.rawBody)
      }
      return next(null, file)
    }
    if (path.extname(file) !== '.md') return next(null, {
      $type: 'asset',
      fileName: file,
      outFileName: outpath,
    })
    file = {
      fileName: file,
    }
    fs.readFile(path.join(this.config.source, file.fileName), 'utf8', (err, raw) => {
      if (err) return next(err)
      const parsed = parseData(raw) || {
        rawBody: raw,
        title: 'Untitled',
      }
      const pageData = deepmerge(parsed, file)
      pageData.$type = 'page'
      pageData.body = render(pageData.rawBody)
      pageData.outFileName = outpath

      next(null, pageData)
    })
  }

  writeFiles(files, basepath, done) {
    const tasks = objMap(files, name => next => {
      if (name === '$type') return next(null, files[name])
      const curpath = basepath + '/' + name
      if (files[name].$type === 'folder') {
        return this.writeFiles(files[name], curpath, next)
      }
      this.writeFile(files[name], curpath, next)
    })
    async.parallel(tasks, done)
  }

  writeFile(pageData, curpath, done) {
    const config = this.config

    const sourcePath = path.join(this.config.source,pageData.fileName)
    const outpath = path.join(this.config.dest, pageData.outFileName)
    console.log('> Writing', pageData.$type, sourcePath, outpath)
    if (pageData.$type === 'asset') {
      return fsExtra.copy(sourcePath, outpath, done)
    }

    const plugins = pluginPages(config.plugins, pageData, curpath)

    const themeBase = path.relative(path.dirname(curpath), '/themes')

    const themeData = config.theme.page(
      pageData,
      config.themeConfig,
      this.styles,
      plugins
    )

    const html = theme2page({
      pageData, themeData, plugins,
      styles: this.styles,
      styleString: this.styleString,
      asset: assetpath => {
        if (assetpath.indexOf('://') !== -1) return assetpath
        return path.join(themeBase, 'default', assetpath)
      },
    })

    mkdirp(path.dirname(outpath), err => {
      if (err) return done(err)
      fs.writeFile(outpath, html, done)
    })
  }

  copyAssets(done) {
    const theme = this.config.theme
    const tasks = theme.assets.map(relpath => next => {
      const src = path.join(theme.basedir, relpath)
      const dest = path.join(this.config.dest, 'themes', theme.name, relpath)
      mkdirp(path.dirname(dest), err => {
        fsExtra.copy(src, dest, next)
      })
    })

    async.parallel(tasks, done)
  }
}

function pluginPages(plugins, pageData, curpath) {
  return plugins.reduce((plugins, plugin) => {
    if ('function' === typeof plugin) {
      plugins.push(plugin(pageData, curpath))
      return plugins
    }
    if (!plugin.page) return plugins
    plugins.push(plugin.page(pageData, curpath))
    return plugins
  }, [])
}

