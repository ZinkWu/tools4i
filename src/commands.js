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
    command: 'setlocation <location>',
    description: 'set u location, like wuhou-Chengdu',
    action: (location) => {
      profile.location = location
      fs.writeFileSync("profile.json", JSON.stringify(profile, null, 2))
    }
  },
  // 天气查询
  {
    command: 'weather',
    description: 'Check the weather',
    options: [
      {
        option: '-d --detailed',
        description: "show detailed weather"
      }
    ],
    action: (options) => {
      if (!profile.location) {
        console.log(chalk.red("please run 'tools4i setlocation <location>'"))
        return
      }
      if (options.detailed) {
        shell.exec(`curl -s wttr.in/${profile.location}`)
      } else {
        shell.exec(`curl -s wttr.in/${profile.location}?format=3`)
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
        description: 'new todo'
      },
      // TODO: modify todo
      // {
      //   option: '-m,--modify',
      //   description: 'modify todo'
      // },
      {
        option: '-d,--delete',
        description: 'delete todo'
      },
      {
        option: '-c,--completion',
        description: 'completion a todo'
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
        option: '-u --unfinished',
        description: 'check unfinished todo'
      }
    ],
    action: (options) => {
      // if (options.new) {
      //   actions.new(profile, options.new)
      // } else if (options.rm) {
      //   actions.rm(profile)
      // } else if (options.do) {
      //   actions.do(profile)
      // } else if (options.finished) {
      //   check.finished(profile)
      // } else if (options.unfinished) {
      //   check.unfinish(profile)
      // } else if (options.all) {
      //   check.all(profile)
      // } else {
      //   check.today(profile)
      // }
      if(options.new){
        actions.newTodo(options.new)
      }else if(options.delete){
        actions.deleteTodo()
      }else if(options.completion){
        actions.completionTodo()
      }
    }
  },
  {
    command: 'book <book-name>',
    description: 'query books',
    action: (bookName) => {
      console.log(`book: ${bookName}`)
    }
  }
]

export default commands