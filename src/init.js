import { Command } from 'commander'
import commands from './commands.js';


function init() {

  const program = new Command();
  program.version('0.0.1');

  commands.forEach(item => {
    const x = program.command(item.command).description(item.description).action(item.action)
    if (item.options) {
      item.options.forEach(it => {
        x.option(it.option, it.description)
      })
    }
  })

  program.parse(process.argv);
}

export default init