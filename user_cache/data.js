const fs = require("fs");

module.exports = {

    getById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fs.readFile("./lab5.json", "utf-8", (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    var userData = JSON.parse(data);
                    if (userData[id] != null){
                        resolve(userData[id])
                    } else {
                        reject(new Error("User not found"));
                    }});
            }, 1000);
        });
    }
}
