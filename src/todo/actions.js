import fs from "fs"
import { DateTime } from "luxon"
import inquirer from "inquirer"
import chalk from 'chalk';

const today = DateTime.now().setLocale('zh').toLocaleString()
const actions = {

  new: (profile, data) => {
    if (!profile.todos[today]) {
      profile.todos[today] = []
    }
    profile.todos[today].push({
      content: data,
      finish: false
    })
    fs.writeFileSync('profile.json', JSON.stringify(profile, null, 2))
  },
  rm: (profile) => {
    const choices = []
    const todos = profile.todos
    if (Object.keys(todos).length === 0) {
      console.log(chalk.yellowBright("you don't have todo, you can run 'tools4i todo --new todo-content'"))
      return 
    }
    for (const key in todos) {
      choices.push(new inquirer.Separator(`${key}`))
      todos[key].forEach((todo, index) => {
        choices.push({
          name: todo.content,
          value: `${key}-${index}`
        })
      })
    }
    inquirer.prompt([
      {
        type: "checkbox",
        name: 'do',
        message: "choose what you have done",
        choices
      }
    ]).then((res) => {
      res.do.forEach(item => {
        const arr = item.split("-")
        todos[arr[0]].splice(arr[1], 1)
      })
      fs.writeFileSync('profile.json', JSON.stringify(profile, null, 2))
    })
  },
  do: (profile) => {
    const choices = []
    const todos = profile.todos
    if (Object.keys(todos).length === 0) {
      console.log(chalk.yellowBright("you don't have todo, you can run 'tools4i todo --new todo-content'"))
      return 
    }
    for (const key in todos) {
      choices.push(new inquirer.Separator(`${key}`))
      todos[key].forEach((todo, index) => {
        if (!todo.finish) {
          choices.push({
            name: todo.content,
            value: `${key}-${index}`
          })
        }
      })
    }
    inquirer.prompt([
      {
        type: "checkbox",
        name: 'do',
        message: "choose what you have done",
        choices
      }
    ]).then((res) => {
      res.do.forEach(item => {
        const arr = item.split("-")
        todos[arr[0]][arr[1]].finish = true
      })
      fs.writeFileSync('profile.json', JSON.stringify(profile, null, 2))
    })
  }
}

export default actions