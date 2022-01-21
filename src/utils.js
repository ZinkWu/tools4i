import fs from "fs"

const utils = {
  initObj: {
    localtion: "",
    todos: {}
  },
  profileExists() {
    const exists = fs.existsSync('profile.json')
    if (!exists) {
      fs.writeFileSync("profile.json", JSON.stringify(this.initObj))
    }
  }
}

export default utils;
