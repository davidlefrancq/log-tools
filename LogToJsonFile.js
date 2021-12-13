const fs = require('fs');
const path = require('path');

class LogToJsonFile {

  save(title, content) {

    const dateString = this.getDateString().split("T");
    const folder = `logs/${title}/${dateString[0]}`;

    fs.mkdir(path.join(__dirname, folder), {recursive: true}, (err) => {
      if (err) {
        return console.error(err);
      }
    });

    fs.writeFile(`./${folder}/${dateString[1]}.json`, JSON.stringify(content), err => {
      if (err) {
        console.error(err)
        return;
      }
    });
  }

  /**
   * Get string date now
   * @returns {string}
   */
  getDateString() {
    const dateNow = new Date(Date.now());
    const dateString = `${dateNow.toISOString()}`
      .replace(/:/g, "")
      .split(".")[0]
    ;
    return dateString;
  }
}

module.exports = {LogToJsonFile};