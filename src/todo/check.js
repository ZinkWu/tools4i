import {DateTime} from 'luxon';
import utils from "../utils.js";
import todoUtils from "./todoUtils.js";

const today = DateTime.now().setLocale('zh').toLocaleString()

const check = {
  all() {
    const {todos} = utils.readProfile()
    todoUtils.buildOutput(todos)
    todoUtils.outputResult()
  },
  finished() {
    const todoGroup = todoUtils.filterTodoByStatus(true)
    todoUtils.buildOutput(todoGroup)
    todoUtils.outputResult()
  },
  unfinished() {
    const todoGroup = todoUtils.filterTodoByStatus(false)
    todoUtils.buildOutput(todoGroup)
    todoUtils.outputResult()
  },
  today() {
    const todoGroup = todoUtils.filterTodoByDate(today)
    todoUtils.buildOutput(todoGroup)
    todoUtils.outputResult()
  }
}

export default check