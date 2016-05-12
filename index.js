#!/usr/bin/env node

'use strict'

const WIDTH = 80

const VUMeter = require('vu-meter')
const logUpdate = require('log-update')
const childProcess = require('child_process')

function lineIn () {
  const cmd = 'rec'
  const args = ['-b', '16', '-c', '2', '-e', 'signed-integer', '-r', '44100', '-t', 'raw', '-L', '-']

  return childProcess.spawn(cmd, args, { stdio: ['ignore', 'pipe', 'ignore'] }).stdout
}

function drawBar (value) {
  const max = (WIDTH - 2)
  const filled = Math.round((Math.max(value + 60, 0) / 60) * max)

  return `[${'+'.repeat(filled)}${' '.repeat(max - filled)}]`
}

lineIn().pipe(new VUMeter()).on('data', function (amp) {
  logUpdate(`${drawBar(amp[0])}\n${drawBar(amp[1])}`)
})
