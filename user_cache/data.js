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
                    for (var i in userData) {
                        if (userData[i] && userData[i]["id"] == id){
                            resolve(userData[i]);
                        }
                    }
                    reject(new Error("User not found"));
                });
            }, 5000);
        });
    }
}
