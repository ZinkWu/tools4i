import {DateTime} from "luxon"
import inquirer from "inquirer"
import chalk from 'chalk';
import utils from "../utils.js";
import todoUtils from "./todoUtils.js";

const today = DateTime.now().setLocale('zh').toLocaleString()


const actions = {
  newTodo(content) {
    const profile = utils.readProfile()
    const todos = profile.todos
    if (!todos[today]) {
      todos[today] = []
    }
    todos[today].push({
      content,
      finish: false
    })
    utils.writeProfile(profile)
  },
  deleteTodo() {
    const profile = utils.readProfile()
    const {todos} = profile
    const choices = todoUtils.buildChoices(todos)
    if (choices.length === 0) {
      todoUtils.buildHaveNoTodoTip()
      todoUtils.outputResult();
      return
    }
    inquirer.prompt([
      {
        type: "checkbox",
        name: 'completion',
        message: "choose your finished todo",
        choices
      }
    ]).then(res => {
      const deleteMap = {}
      const todoGroup = profile.todos
      res.completion.forEach(r => {
        const arr = r.split("-")
        if (!deleteMap[arr[0]]) {
          deleteMap[arr[0]] = []
        }
        deleteMap[arr[0]].push(arr[1])
      })
      for (const group in deleteMap) {
        todoGroup[group] = todoUtils.deleteTodoByGroupAt(todoGroup[group], deleteMap[group])
      }
      utils.writeProfile(profile)
    })
  },
  completionTodo() {
    const profile = utils.readProfile()
    const todoGroup = todoUtils.filterTodoByStatus(false)
    const choices = todoUtils.buildChoices(todoGroup)
    if (choices.length === 0) {
      console.log(chalk.green('all current todos have been completed'))
      return
    }
    inquirer.prompt([
      {
        type: "checkbox",
        name: 'completion',
        message: "choose your finished todo",
        choices
      }
    ]).then(res => {
      const todoGroup = profile.todos
      res.completion.forEach(r => {
        const arr = r.split("-")
        todoUtils.changeTodoStatusByGroup(todoGroup[arr[0]], arr[1])
      })
      utils.writeProfile(profile)
    })
  }
}

export default actions