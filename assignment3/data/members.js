const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

let exportedMethods = {
    getLocalMembers() {
        return new Promise((resolve, reject) => {
            resolve([
                { "1": "Life Coach" },
                { "2": "Hype Man" },
                { "3": "Wing Man" },
                { "4": "Jokester" },
                { "5": "Cool Nanny" },
                { "6": "Living Soundtrack"},
                { "7": "Smooth Operator"},
                { "8": "Foodie"},
                { "9": "Know-It-All"},
                { "10": "Icon"}
            ]);
        });
    },
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getMember(id) {
        const memberPath = path.resolve(__dirname, "member-files/", `${id}.html`);

        return fs.statAsync(memberPath).then(stats => {
            return fs.readFileAsync(memberPath, "utf-8");
        });
    }
};

module.exports = exportedMethods;
