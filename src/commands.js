import fs from "fs"
import shell from 'shelljs'
import chalk from 'chalk';
import check from './todo/check.js';
import actions from './todo/actions.js'

import utils from './utils.js'
utils.profileExists();

let profile = JSON.parse(fs.readFileSync('profile.json').toString())


const commands = [
  // 设置所在地，用于天气查询
  {
    command: 'setlocation <city>',
    description: 'set u localtion, like wuhou-Chengdu',
    action: (localtion) => {
      profile.localtion = localtion
      fs.writeFileSync("profile.json", JSON.stringify(profile, null, 2))
    }
  },
  // 天气查询
  {
    command: 'weather',
    description: 'query the city weather',
    options: [
      {
        option: '-d --detailed',
        description: "show detailed weather"
      }
    ],
    action: (options) => {
      if (!profile.localtion) {
        console.log(chalk.red("please run 'mycli setlocation <localtion>'"))
        return
      }
      if (options.detailed) {
        shell.exec(`curl -s wttr.in/${profile.localtion}`)
      } else {
        shell.exec(`curl -s wttr.in/${profile.localtion}?format=3`)
      }
    }
  },
  // todo List 相关
  {
    command: 'todo',
    description: 'check today todo',
    options: [
      {
        option: '-n,--new <content>',
        description: 'add todo'
      },
      {
        option: '-r,--rm',
        description: 'rm'
      },
      {
        option: '-d,--do',
        description: 'done'
      },
      {
        option: '-a --all',
        description: 'check all todo'
      },
      {
        option: '-f --finished',
        description: 'check finished todo'
      },
      {
        option: '-u --unfinish',
        description: 'check unfinish todo'
      }
    ],
    action: (options) => {
      if (options.new) {
        actions.new(profile, options.new)
      } else if (options.rm) {
        actions.rm(profile)
      } else if (options.do) {
        actions.do(profile)
      } else if (options.finished) {
        check.finished(profile)
      } else if (options.unfinish) {
        check.unfinish(profile)
      } else if (options.all) {
        check.all(profile)
      } else {
        check.today(profile)
      }
    }
  },
  {
    command: 'book <book-name>',
    description: 'querty the book info',
    action: (bookName) => {
      console.log(`book: ${bookName}`)
    }
  }
]

export default commands