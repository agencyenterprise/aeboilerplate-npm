#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs')

program
  .arguments('<projectName>')
  .option('--https', 'Use https instead of ssh')
  .action(function(projectName) {
    console.log('Creating project: ', projectName)

    let gitUrl

    if (program.https) {
      gitUrl = 'https://github.com/agencyenterprise/aeboilerplate.git'
    } else {
      gitUrl = 'git@github.com:agencyenterprise/aeboilerplate.git'
    }

    // Needed by commander to set a global variable to check for an empty argument
    argumentProjectName = projectName

    if (shell.exec(`git clone ${gitUrl} ${projectName}`).code !== 0) {
      console.log(`Error! Git clone failed for URL: ${gitUrl}`)
      process.exit(1)
    }

    shell.cd(projectName)
    shell.exec(`npm run aeboilerplate`)
  })

  .version('0.0.1', '-v, --version')
  .parse(process.argv)

if (typeof argumentProjectName === 'undefined') {
  console.error('\nError: Project name was not specified.')
  console.log('Try: aeboilerplate <projectName> [-ssh]')
  console.log('Where <projectName> is the name of the project that you would like to initiate using AEboilerplate.')
  console.log('  --https    Use https instead of ssh to clone from github.')
  process.exit(1)
}
