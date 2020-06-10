const express = require("express");
const router = express.Router();
const util = require("util");
const exec = util.promisify(require("child_process").exec);

function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}
router.get("/", (req, res) => {
  execShellCommand("node F:/PiFullStackJS/pi-js/backend/scrape.js");
  res.json("done!!!");
});
module.exports = router;
