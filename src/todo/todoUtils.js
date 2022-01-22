import utils from "../utils.js";
import chalk from "chalk";
import inquirer from "inquirer";

const todoUtils = {
  flag: 0,
  todoOutputResult: "",
  outputResult() {
    console.log(this.todoOutputResult)
  },
  filterTodoByDate(date) {
    const hash = {}
    const {todos} = utils.readProfile()
    const todoGroup = Object.keys(todos)
    for (let i = 0; i < todoGroup.length; i++) {
      const group = todoGroup[i]
      if (group === date) {
        if (todos[group].length !== 0) {
          todos[group].forEach((todo) => {
            if (!hash[group]) {
              hash[group] = []
            }
            hash[group].push(todo)
          })
        }
      }
    }
    return hash
  },
  filterTodoByStatus(status) {
    const hash = {}
    const {todos} = utils.readProfile()
    const todoGroup = Object.keys(todos)
    for (let i = 0; i < todoGroup.length; i++) {
      const group = todoGroup[i]
      if (todos[group].length !== 0) {
        todos[group].forEach((todo, index) => {
          if (!hash[group]) {
            hash[group] = []
          }
          if (todo.finish === status) {
            // 复制索引，用于crud操作保证索引一致
            todo.index = index
            hash[group].push(todo)
          }
        })
      }
    }
    return hash
  },
  buildOutput(todoGroup) {
    const groups = Object.keys(todoGroup)
    if (groups.length === 0) {
      this.buildHaveNoTodoTip()
      return
    }
    groups.forEach((group, index) => {
      if (todoGroup[group].length !== 0) {
        this.flag++
        this.todoOutputResult += "\n"
        this.buildOutputGroup(group)
        todoGroup[group].forEach((todo, i) => {
          if (index === groups.length - 1 && i === todoGroup[group].length - 1) {
            this.buildOutputContent(todo.content, todo.finish)
          } else {
            this.buildOutputContent(todo.content, todo.finish, true)
          }
        })
      }
    })
    if (this.flag === 0) {
      this.buildHaveNoTodoTip()
    }
  },
  buildOutputGroup(group) {
    this.todoOutputResult += chalk.blue(group + ":\n")
  },
  buildOutputContent(content, status, isNewline) {
    status
      ? this.todoOutputResult += this.buildFinishTodo(content)
      : this.todoOutputResult += this.buildUnfinishedTodo(content);
    if (isNewline) {
      this.todoOutputResult += "\n"
    }
  },
  buildFinishTodo(content) {
    return `· ${chalk.green("✓")} ${content}`
  },
  buildUnfinishedTodo(content) {
    return `· ${chalk.red("x")} ${content}`
  },
  buildHaveNoTodoTip() {
    this.todoOutputResult = chalk.yellow("oops, no todo")
  },

  buildChoices(todoGroup) {
    const choices = []
    const groups = Object.keys(todoGroup)
    for (const group of groups) {
      if(todoGroup[group].length !== 0){
        choices.push(new inquirer.Separator(group))
        todoGroup[group].forEach((todo, index) => {
          choices.push({
            name: todo.content,
            value: `${group}-${todo.index ? todo.index : index}`
          })
        })
      }
    }
    return choices
  },
  deleteTodoByGroupAt(group, indexes) {
    return group.filter((todo, index) => {
      return indexes.includes(String(index)) === false
    })
  }
  ,
  changeTodoStatusByGroup(group, index) {
    group[index].finish = true
  }
}

export default todoUtils