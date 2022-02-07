import fs from "fs"
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const { dirname } = path

const __dirname = dirname(fileURLToPath(import.meta.url));
const profilePath = path.join(__dirname, 'profile.json')

const utils = {
  initObj: {
    location: "",
    todos: {}
  },
  profileExists() {
    if (!fs.existsSync(profilePath)) {
      fs.writeFileSync(profilePath, JSON.stringify(this.initObj))
    }
  },
  readProfile() {
    return JSON.parse(fs.readFileSync(profilePath).toString())
  },
  writeProfile(data) {
    fs.writeFileSync(profilePath, JSON.stringify(data, null, 2))
  },
  // todos utils
  todoOutputResult: "",
  buildTodoOutputResult(str) {
    this.todoOutputResult += str;
  },
  buildTodoOutPutTitle(title) {
    this.todoOutputResult += chalk.blue(title + "\n")
  },
  buildTodoOutput(text, status, endStr) {
    status
      ? this.todoOutputResult += this.buildFinishTodo(text)
      : this.todoOutputResult += this.buildUnfinishTodo(text);
    if (endStr) {
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
  },
  // gitignore
  getPwd(){
    return path.resolve('./')
  },
  generateIgnore(){
    const pwd = this.getPwd()
    const file = path.join(pwd, ".gitignore")
    fs.writeFileSync(file, "")
  }
  // 模板
}

export default utils;
