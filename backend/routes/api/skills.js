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
});

module.exports = router;
