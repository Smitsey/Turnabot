let username = "";
let platform = "";
let link = "";
let defaultGame = "";
let image = "";
let fs = require("fs");

module.exports = {
    setUser: function (userid) {
        if (userid == "125280288799588352") {
            username = "Smitsey";
            platform = fs.readFileSync("./LiveUsers/Smitsey/platform.txt", { "encoding": "utf-8" });
            link = fs.readFileSync("./LiveUsers/Smitsey/link.txt", { "encoding": "utf-8" });
            defaultGame = fs.readFileSync("./LiveUsers/Smitsey/defaultGame.txt", { "encoding": "utf-8" });
            image = fs.readFileSync("./LiveUsers/Smitsey/image.txt", { "encoding": "utf-8" });
        }
        if (userid == "223844912456531988") {
            username = "Zellius";
            platform = fs.readFileSync("./LiveUsers/Zellius/platform.txt", { "encoding": "utf-8" });
            link = fs.readFileSync("./LiveUsers/Zellius/link.txt", { "encoding": "utf-8" });
            defaultGame = fs.readFileSync("./LiveUsers/Zellius/defaultGame.txt", { "encoding": "utf-8" });
            image = fs.readFileSync("./LiveUsers/Zellius/image.txt", { "encoding": "utf-8" });
        }
        if (userid == "277930565028544512") {
            username = "Smn42";
            platform = fs.readFileSync("./LiveUsers/Smn42/platform.txt", { "encoding": "utf-8" });
            link = fs.readFileSync("./LiveUsers/Smn42/link.txt", { "encoding": "utf-8" });
            defaultGame = fs.readFileSync("./LiveUsers/Smn42/defaultGame.txt", { "encoding": "utf-8" });
            image = fs.readFileSync("./LiveUsers/Smn42/image.txt", { "encoding": "utf-8" });
        }
        if (userid == "211940365266059264") {
            username = "Rumble";
            platform = fs.readFileSync("./LiveUsers/Rumble/platform.txt", { "encoding": "utf-8" });
            link = fs.readFileSync("./LiveUsers/Rumble/link.txt", { "encoding": "utf-8" });
            defaultGame = fs.readFileSync("./LiveUsers/Rumble/defaultGame.txt", { "encoding": "utf-8" });
            image = fs.readFileSync("./LiveUsers/Rumble/image.txt", { "encoding": "utf-8" });
        }
        if (userid == "125280215688544256") {
            username = "Modx";
            platform = fs.readFileSync("./LiveUsers/Modx/platform.txt", { "encoding": "utf-8" });
            link = fs.readFileSync("./LiveUsers/Modx/link.txt", { "encoding": "utf-8" });
            defaultGame = fs.readFileSync("./LiveUsers/Modx/defaultGame.txt", { "encoding": "utf-8" });
            image = fs.readFileSync("./LiveUsers/Modx/image.txt", { "encoding": "utf-8" });
        }
        if (userid == "313014412560826380") {
            username = "Krater";
            platform = fs.readFileSync("./LiveUsers/Krater/platform.txt", { "encoding": "utf-8" });
            link = fs.readFileSync("./LiveUsers/Krater/link.txt", { "encoding": "utf-8" });
            defaultGame = fs.readFileSync("./LiveUsers/Krater/defaultGame.txt", { "encoding": "utf-8" });
            image = fs.readFileSync("./LiveUsers/Krater/image.txt", { "encoding": "utf-8" });
        }
    },

    // Username
    getUsername: function () {
        return username;
    },

    // Platform
    setPlatform: function (p) {
        fs.unlinkSync(`./LiveUsers/${username}/platform.txt`);
        fs.writeFile(`./LiveUsers/${username}/platform.txt`, p);
    },
    getPlatform: function () {
        return platform;
    },

    // Link
    setLink: function (l) {
        fs.unlinkSync(`./LiveUsers/${username}/link.txt`);
        fs.writeFile(`./LiveUsers/${username}/link.txt`, l);
    },
    getLink: function () {
        return link;
    },

    // Default Game
    setDefaultGame: function (dg) {
        fs.unlinkSync(`./LiveUsers/${username}/defaultGame.txt`);
        fs.writeFile(`./LiveUsers/${username}/defaultGame.txt`, dg);
    },
    getDefaultGame: function () {
        return defaultGame;
    },

    // Image
    setImage: function (i) {
        fs.unlinkSync(`./LiveUsers/${username}/image.txt`);
        fs.writeFile(`./LiveUsers/${username}/image.txt`, i);
    },
    getImage: function () {
        return image;
    }


}