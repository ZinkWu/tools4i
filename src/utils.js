import fs from "fs"
import chalk from 'chalk';

const utils = {
  initObj: {
    location: "",
    todos: {}
  },
  profileExists() {
    const exists = fs.existsSync('profile.json')
    if (!exists) {
      fs.writeFileSync("profile.json", JSON.stringify(this.initObj))
    }
  },
  readProfile() {
    return JSON.parse(fs.readFileSync('profile.json').toString())
  },
  writeProfile(data) {
    fs.writeFileSync('profile.json', JSON.stringify(data, null, 2))
  },
  // todos utils
  todoOutputResult: "",
  buildTodoOutputResult(str){
    this.todoOutputResult += str;
  },
  buildTodoOutPutTitle(title) {
    this.todoOutputResult += chalk.blue(title + "\n")
  },
  buildTodoOutput(text, status, endStr) {
    status
      ? this.todoOutputResult += this.buildFinishTodo(text)
      : this.todoOutputResult += this.buildUnfinishTodo(text);
    if(endStr){
      this.todoOutputResult += endStr
    }
  },
  buildFinishTodo(text) {
    return `· ${chalk.green("✓")} ${text}`
  },
  buildUnfinishTodo(text) {
    return `· ${chalk.red("x")} ${text}`
  },
  resetTodoOutputResult() {
    this.todoOutputResult = ""
  }
}

export default utils;
