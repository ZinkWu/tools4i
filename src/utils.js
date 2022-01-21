import fs from "fs"
const utils = {
  profileExists() {
    const exists = fs.existsSync('profile.json')
    console.log(exists)
    if (!exists) {
      fs.writeFileSync("profile.json", "{}")
    }
  }
}

export default utils;
