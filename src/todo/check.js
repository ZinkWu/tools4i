import chalk from 'chalk';
import { DateTime } from 'luxon';

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
    console.log(chalk.yellowBright("you don't have todo, you can run 'mycli todo --new toco-content'"))
  } else {
    let result = "\n"
    keys.forEach((key, i) => {
      if (model === "today") {
        if (key === today) {
          result += chalk.blue(key + ":\n")
          todos[key].forEach((todo, index) => {
            if (index !== todos[key].length - 1) {
              result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}\n`
            } else {
              result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}`
            }
          })
        }
      } else if (model === "all") {
        result += chalk.blue(key + ":\n")
        todos[key].forEach((todo, index) => {
          if (index !== todos[key].length - 1) {
            result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}\n`
          } else {
            if (i !== keys.length - 1) {
              result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}\n`
              result += "\n"
            } else {
              result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}`
            }
          }
        })
      } else if (model === "finished") {
        const x = todos[key].filter((todo) => {
          if (todo.finish === true) {
            return todo
          }
        })

        if (x.length > 0) {
          result += chalk.blue(key + ":\n")
          x.forEach((todo, index) => {
            if (index !== x.length - 1) {
              result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}\n`
            } else {
              if (i !== keys.length - 1) {
                result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}\n`
                result += "\n"
              } else {
                result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}`
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

        if (x.length > 0) {
          result += chalk.blue(key + ":\n")
          x.forEach((todo, index) => {
            if (index !== x.length - 1) {
              result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}\n`
            } else {
              if (i !== keys.length - 1) {
                result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}\n`
                result += "\n"
              } else {
                result += `· ${todo.finish ? chalk.green("✓") : chalk.red('x')} ${todo.content}`
              }
            }
          })
        }

      }
    })
    // return result
    console.log(result)
  }
}

export default check