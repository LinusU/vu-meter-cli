#!/usr/bin/env node

'use strict'

const WIDTH = 80

const LineIn = require('line-in')
const VUMeter = require('vu-meter')
const logUpdate = require('log-update')

function drawBar (value) {
  const max = (WIDTH - 2)
  const filled = Math.round((Math.max(value + 60, 0) / 60) * max)

  return `[${'+'.repeat(filled)}${' '.repeat(max - filled)}]`
}

const input = new LineIn()
const meter = new VUMeter()

input.pipe(meter).on('data', function (amp) {
  logUpdate(`${drawBar(amp[0])}\n${drawBar(amp[1])}`)
})
