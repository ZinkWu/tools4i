import chalk from 'chalk';
import {DateTime} from 'luxon';
import utils from "../utils.js";

const today = DateTime.now().setLocale('zh').toLocaleString()

const check = {
  all(profile) {
    handler(profile, 'all')
  },
  finished(profile) {
    handler(profile, 'finished')
  },
  unfinish(profile) {
    handler(profile, 'unfinish')
  },
  today(profile) {
    handler(profile, "today")
  }
}

function handler(profile, model) {
  const todos = profile.todos
  const keys = Object.keys(todos)
  if (keys.length === 0) {
    console.log(chalk.yellowBright("you don't have todo, you can run 'tools4i todo --new todo-content'"))
  } else {
    if (todos[keys].length === 0) {
      console.log(chalk.yellowBright("you don't have todo, you can run 'tools4i todo --new todo-content'"))
      return
    }
    let result = "\n"
    keys.forEach((key, i) => {
      if (model === "today") {
        if (key === today) {
          result += chalk.blue(key + ":\n")
          todos[key].forEach((todo, index) => {
            if (index !== todos[key].length - 1) {
              // result += utils.buildTodoOut(todo.content, todo.finish) + "\n"
              utils.buildTodoOutput(todo.content, todo.finish, "\n")
            } else {
              // result += utils.buildTodoOut(todo.content, todo.finish)
              utils.buildTodoOutput(todo.content, todo.finish)
            }
          })
        }
      } else if (model === "all") {
        result += chalk.blue(key + ":\n")
        todos[key].forEach((todo, index) => {
          if (index !== todos[key].length - 1) {
            // result += utils.buildTodoOutput(todo.content, todo.finish) + "\n"
            utils.buildTodoOutput(todo.content, todo.finish, "\n")
          } else {
            if (i !== keys.length - 1) {
              // result += utils.buildTodoOutput(todo.content, todo.finish) + "\n"
              utils.buildTodoOutput(todo.content, todo.finish, "\n")
              // result += "\n"
              utils.buildTodoOutputResult("\n")
            } else {
              // result += utils.buildTodoOutput(todo.content, todo.finish)
              utils.buildTodoOutput(todo.content, todo.finish)
            }
          }
        })
      } else if (model === "finished") {
        const x = todos[key].filter((todo) => {
          if (todo.finish === true) {
            return todo
          }
        })
        if (x.length === 0) {
          console.log("")
          console.log(chalk.red("you currently have no completed todos"))
          return
        } else {
          utils.buildTodoOutPutTitle(key);
          x.forEach((todo, index) => {
            if (index !== x.length - 1) {
              // result += utils.buildTodoOutput(todo.content, todo.finish) + "\n"
              utils.buildTodoOutput(todo.content, todo.finish, "\n")
            } else {
              if (i !== keys.length - 1) {
                // result += utils.buildTodoOutput(todo.content, todo.finish) + "\n"
                utils.buildTodoOutput(todo.content, todo.finish, "\n")
                // result += "\n"
                utils.buildTodoOutputResult("\n")
              } else {
                // result +=
                utils.buildTodoOutput(todo.content, todo.finish)
              }
            }
          })
        }
      } else if (model === "unfinish") {
        const x = todos[key].filter((todo) => {
          if (todo.finish === false) {
            return todo
          }
        })
        if (x.length === 0) {
          console.log("")
          console.log(chalk.green("great, you have done all todos"))
          return
        } else {
          result += chalk.blue(key + ":\n")
          x.forEach((todo, index) => {
            if (index !== x.length - 1) {
              // result += utils.buildTodoOutput(todo.content, todo.finish) + "\n"
              utils.buildTodoOutput(todo.content, todo.finish, "\n")

            } else {
              if (i !== keys.length - 1) {
                // result += utils.buildTodoOutput(todo.content, todo.finish) + "\n"
                utils.buildTodoOutput(todo.content, todo.finish, "\n")
                utils.buildTodoOutputResult("\n")
                // result += "\n"
              } else {
                // result += utils.buildTodoOutput(todo.content, todo.finish)
                utils.buildTodoOutput(todo.content, todo.finish)
              }
            }
          })
        }

      }
    })
    // return result
    console.log(utils.todoOutputResult)
    utils.resetTodoOutputResult()
  }
}

export default check