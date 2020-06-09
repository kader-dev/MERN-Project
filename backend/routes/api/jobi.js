const express = require("express");
const router = express.Router();

const { exec } = require("child_process");
router.get("/", (req, res) => {
  exec(
    "node F:/PiFullStackJS/pi-js/backend/scrape.js",
    (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err);
      } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.status(500).json("done!!!");
      }
    }
  );
});
module.exports = router;
