import fs from "fs"
import { DateTime } from "luxon"
import inquirer from "inquirer"

const today = DateTime.now().setLocale('zh').toLocaleString()
const actions = {

  new: (profile, data) => {
    profile.todos[today].push({
      content: data,
      finish: false
    })
    fs.writeFileSync('profile.json', JSON.stringify(profile, null, 2))
  },
  rm: (profile, index) => {
    profile.todos.splice(index, 1)
    fs.writeFileSync('profile.json', JSON.stringify(profile, null, 2))
  },
  do: (profile) => {
    const choices = []
    const todos = profile.todos
    for (const key in todos) {
      choices.push(new inquirer.Separator(`${key}`))
      todos[key].forEach((todo, index) => {
        if(!todo.finish){
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