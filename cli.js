#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs')
const colors = require('colors')

program
  .arguments('<projectName>')
  .option('--https', 'Use https instead of ssh')
  .action(function(projectName) {
    logStep(`Preparing AEboilerplate full-stack project: ${projectName}`)
    cloneAeboilerplateProject(projectName)
    executeAeboilerplate(projectName)
  })
  .version('0.0.1', '-v, --version')
  .parse(process.argv)

if (typeof argumentProjectName === 'undefined') {
  console.error('Please specify the project name:\n')
  console.error('aeboilerplate'.cyan, '<project-name> [--https]'.yellow)
  console.error('\nFor example:\n')
  console.error('aeboilerplate'.cyan, 'my-full-stack-app'.yellow)
  console.error('\n<project-name> is the name of the project that you would like to create using AEboilerplate.')
  console.error('[--https] to use https instead of ssh to clone from github.')
  process.exit(1)
}

function logStep(message) {
  console.log(`${message}\n`.cyan)
}

function cloneAeboilerplateProject(projectName) {
  let gitUrl

  if (program.https) {
    gitUrl = 'https://github.com/agencyenterprise/aeboilerplate.git'
  } else {
    gitUrl = 'git@github.com:agencyenterprise/aeboilerplate.git'
  }

  // Needed by commander to set a global variable to check for an empty argument
  argumentProjectName = projectName

  logStep(`Cloning ${gitUrl}`)
  if (shell.exec(`git clone ${gitUrl} ${projectName}`).code !== 0) {
    console.log(`Error! Git clone failed for URL: ${gitUrl}\n`.red)
    process.exit(1)
  }
}

function executeAeboilerplate(projectName) {
  logStep(`\nExecuting AEboilerplate generator`)
  shell.cd(projectName)
  shell.exec(`npm run aeboilerplate`)
}
