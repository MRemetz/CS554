const data = require("../data");
const memberData = data.members;

const constructorMethod = app => {
    app.use("/", (req, res) => {
        memberData
            .getModals()
            .then(modals => {
                res.render("members/single", { memberContent: modals });
            })
            .catch(() => {
                res.status(404).json({ error: "Product not found" });
            });
    });


  app.use("*", (req, res) => {
      res.status(404).json({ error: "Page does not exist"});
 });
};

module.exports = constructorMethod;
