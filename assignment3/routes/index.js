const memberRoutes = require("./members");

const constructorMethod = app => {
  app.use("/members", memberRoutes);

  app.use("*", (req, res) => {
    res.redirect("/members/1");
  });
};

module.exports = constructorMethod;
