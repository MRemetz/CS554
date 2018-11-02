const fs = require("fs");

module.exports = {

    getById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fs.readFile("./data.js", "utf-8", (error, data) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    if (null? data[id]) {
                        reject(new Error("User not found"));
                    } else {
                        resolve(data[id]);
                    }
                });
            }, 5000);
        });
}
