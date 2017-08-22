/*!
 * jsonp-stream.js
 * Created by Kilian Ciuffolo on Dec 25, 2013
 * Copyright (c) 2013 Kilian Ciuffolo, me@nailik.org
 */

'use strict'

const Transform = require('stream').Transform

module.exports = class JSONPStream extends Transform {
  constructor (options) {
    super({ objectMode: true })

    options = options || {}
    this.startChunk = options.startChunk || ''
    this.endChunk = options.endChunk || ''
    this.destroyed = false
    this.started = false
  }

  _transform (data, encoding, callback) {
    if (this.destroyed) return

    if (!this.started) {
      this.started = true
      this.push(this.startChunk)
    }

    /* TODO */
    // JSON parse vs eval fix. https://github.com/rack/rack-contrib/pull/37
    // data = data.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
    this.push(data)

    process.nextTick(callback)
  }

  _flush (callback) {
    if (this.destroyed) return

    if (!this.started) {
      this.push(this.start)
    }

    this.push(this.endChunk)
    this.push(null)

    process.nextTick(callback)
  }

  destroy () {
    if (!this.destroyed) {
      this.emit('close')
      this.destroyed = true
    }
  }
}
