const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/pi-js")
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log(err));

const skill = require("../backend/models/Skills");
const pageLimit = 10;
let pageCounter = 1;
const outputFile = "data.json";
let url = "https://www.jobi.tn/#!";
let table = [];
var counts = {};

skill.deleteMany({ source: "jobi.tn" }, function (err) {});
//read json

async function main(url) {
  pageCounter++;
  const browser = await puppeteer.launch({
    headless: false,
  });
  if (pageCounter <= pageLimit) {
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(5000);

    const content = await page.content();

    const $ = cheerio.load(content);

    const test = $(".body-container .tags")
      .map(function () {
        return $(this).text();
      })
      .toArray();
    test.forEach((e) => table.push(e));
    console.log(table);
    fs.writeFile(
      outputFile,
      JSON.stringify(test, null, 4),
      {
        flag: "a+",
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    console.log(pageCounter);
    url =
      "https://www.jobi.tn/#!/?q=page=" +
      pageCounter +
      "&sortBy=updated_at&sortOrder=desc";

    //console.log(test);
    await browser.close();
    main(url);
  } else {
    await browser.close();
    counts = table.reduce((map, val) => {
      map[val] = (map[val] || 0) + 1;
      return map;
    }, {});
    console.log("countssssssssss");
    console.log(counts);
    for (let c of Object.keys(counts)) {
      const newSkill = new skill({
        name: c,
        nbr: counts[c],
        source: "jobi.tn",
      });
      newSkill.save();
    }
    return false;
  }
}

main(url);
