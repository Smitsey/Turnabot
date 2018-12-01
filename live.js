let username = "";
let platform = "";
let link = "";
let defaultGame = "";
let image = "";

module.exports = {
    setUser: function (userid) {
        if (userid == "125280288799588352") {
            username = "Smitsey";
            platform = "Twitch";
            link = "https://www.twitch.tv/Smitsey";
            defaultGame = "Rocket League";
        }
        if (userid == "223844912456531988") {
            username = "Zellius";
            platform = "Twitch";
            link = "https://www.twitch.tv/ZelliusRL";
            defaultGame = "Rocket League";
            image = "https://i.imgur.com/y0VNd5h.gif";
        }
        if (userid == "277930565028544512") {
            username = "Smn42";
            platform = "Twitch";
            link = "https://www.twitch.tv/Smn42";
            defaultGame = "Rocket League";
        }
        if (userid == "211940365266059264") {
            username = "Rumble";
            platform = "YouTube";
            link = "https://www.youtube.com/RoyalRumble1991";
            defaultGame = "Rocket League";
        }
        if (userid == "125280215688544256") {
            username = "Modx";
            platform = "Twitch";
            link = "https://www.twitch.tv/ModxPlays";
            defaultGame = "Rocket League";
        }
        if (userid == "313014412560826380") {
            username = "Krater";
            platform = "Twitch";
            link = "https://www.twitch.tv/Kraterownia";
            defaultGame = "Rocket League";
        }
    },

    getUsername: function () {
        return username;
    },

    getPlatform: function () {
        return platform;
    },

    getLink: function () {
        return link;
    },

    getDefaultGame: function () {
        return defaultGame;
    },

    getImage: function () {
        return image;
    }


}