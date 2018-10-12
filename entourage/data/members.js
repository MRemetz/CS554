const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

let exportedMethods = {
    getModals() {
        const memberPath = path.resolve(__dirname, `modal-doc/modals.html`);

        return fs.statAsync(memberPath).then(stats => {
            return fs.readFileAsync(memberPath, "utf-8");
        });
    }
};

module.exports = exportedMethods;
