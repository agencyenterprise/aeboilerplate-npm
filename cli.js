#!/usr/bin/env node

var program = require('commander')
var spawn = require('child_process').spawn

program
  .arguments('<ProjectName>')
  .option('-s, --ssh', 'Use ssh instead of https')
  .action(function(ProjectName) {
    console.log('Creating project: ', ProjectName)

    var command = 'git'
    var args, args2

    if (program.ssh) args = ['clone', 'https://github.com/agencyenterprise/krei.git', ProjectName]
    else args = ['clone', 'git@github.com:agencyenterprise/krei.git', ProjectName]
    name = ProjectName

    var p = spawn('git', args)
    p.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    p.stderr.on('data', (data) => {
      console.log(data.toString())
    })

    p.on('close', (code) => {
      if (code == 0) {
        console.log('')
        console.log('krei successfuly cloned in to: ', ProjectName)
        console.log('')
        console.log('')
        console.log(
          'The next step is to install the npm dependencies of your project.  You can do this by executing the following two commands:',
        )
        console.log('')
        console.log('  cd', ProjectName)
        console.log('  npm install')
        console.log('')
        console.log('See https://github.com/agencyenterprise/krei for additional information to get started.')
        console.log('')
      } else {
        console.log('git clone existed with error code: ', code.toString())
      }
    })
  })
  .version('0.0.1', '-v, --version')
  .parse(process.argv)

if (typeof name === 'undefined') {
  console.log('')
  console.error('Error: Project name was not specified.')
  console.log('')
  console.log('Try: krei <ProjectName> [-ssh]')
  console.log('Where <ProjectName> is the name of the project that you would like to initiate using Krei.')
  console.log('')
  console.log('  -s, --ssh    Use ssh instead of https to clone from github.')
  console.log('')
  process.exit(1)
}
