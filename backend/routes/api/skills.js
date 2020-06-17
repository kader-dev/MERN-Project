const express = require("express");
const router = express.Router();

//skills model

const skill = require("../../models/Skills");

// @route GET api/skills
// Get all skills
router.get("/", (req, res) => {
  skill
    .find()
    .sort({ date: -1 })
    .then((skills) => res.json(skills));
});

// @route post api/skills
// post a skill
router.post("/", (req, res) => {
  const newSkill = new skill({
    name: req.body.name,
    source: req.body.source,
    nbr: req.body.priority,
  });
  newSkill.save().then((item) => res.json(item));
});

// @route delete api/skills
// delete a skill
router.delete("/:id", (req, res) => {
  skill
    .findById(req.params.id)
    .then((skill) => skill.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
  console.log("deleted");
});

// @route post api/skills
// update a skill
router.post("/update/:id", (req, res) => {
  skill.findById(req.params.id, function (err, s) {
    if (!s) res.status(404).send("data is not found");
    else s.nbr = req.body.priority + s.nbr;
    s.save()
      .then((s) => {
        console.log("s:" + s);
        res.json("skill updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

//get max priority
router.get("/max", (req, res) => {
  skill
    .find()
    .sort({ nbr: -1 })
    .limit(1)
    .then((skills) => res.json(skills));
});

//sort by priority asc
router.get("/priorityUp", (req, res) => {
  skill
    .find()
    .sort({ nbr: -1 })
    .then((skills) => res.json(skills));
});
//sort by priority desc
router.get("/prioritydown", (req, res) => {
  skill
    .find()
    .sort({ nbr: 1 })
    .then((skills) => res.json(skills));
});
//sort by az desc
router.get("/az", (req, res) => {
  skill
    .find()
    .sort({ name: -1 })
    .then((skills) => res.json(skills));
});

//sort by za desc
router.get("/za", (req, res) => {
  skill
    .find()
    .sort({ name: 1 })
    .then((skills) => res.json(skills));
});
//Top 10
router.get("/top10", (req, res) => {
  skill
    .find()
    .sort({ nbr: -1 })
    .limit(10)
    .then((skills) => res.json(skills));
});
module.exports = router;
