const express = require("express");
const router = express.Router();
const data = require("../data");
const memberData = data.members;

router.get("/:id", (req, res) => {
  memberData
    .getMember(req.params.id)
    .then(member => {
      res.render("members/single", { memberContent: member });
    })
    .catch(() => {
      res.status(404).json({ error: "Product not found" });
    });
});

router.get("/", (req, res) => {
  memberData.getLocalMembers().then(
    memberList => {
      res.render("members/local", memberList);
    },
    () => {
      // Something went wrong with the server!
      res.sendStatus(500);
    }
  );
});

module.exports = router;
