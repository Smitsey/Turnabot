const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const live = require("./live.js");

client.on("ready", () => {
    console.log("I am ready, master.");
    client.user.setActivity(".help", { type: 'PLAYING' });
});

// Useful functions
{
    function capitalize_Words(str) { // Capitalize first letter of every word (f.i. "test text" > "Test Text")
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
    function removeDuplicates(arr) {
        var seen = {};
        var ret_arr = [];
        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i] in seen)) {
                ret_arr.push(arr[i]);
                seen[arr[i]] = true;
            }
        }
        return ret_arr;
    }
    function alphabetPosition(text) { // Converts every char of string in it's indexnumber in the alphabet
        var result = "";
        for (var i = 0; i < text.length; i++) {
            var code = text.toUpperCase().charCodeAt(i)
            if (code > 64 && code < 91) result += (code - 64) + " ";
        }
        return result.slice(0, result.length - 1);
    }
    function getTime() { // Returns date and time with format: Month D, YYYY HH:MM AM/PM
        let date = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let hours = date.getHours() + 1; // +1 to make it CET
        let minutes = date.getMinutes();
        let dayHalf = "AM";

        if (hours > 11) {
            dayHalf = "PM";
        }
        if (hours > 12) {
            hours = hours - 12;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " " + hours + ":" + minutes + dayHalf;
    }
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

// Last 2 messages array
var lastMessages = [];

// RPS-Extra
var players = [];
var materials = [];
var emojis = [];

// Help-Extra
var helpMessage;
client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.count > 1) {
        switch (reaction.emoji.name) {
            case '1⃣':
                helpMessage.edit({
                    embed: {
                        color: 16765184,
                        author: {
                            name: "Community commands",
                            icon_url: "https://i.imgur.com/x9vHs9f.png"
                        },
                        fields: [{
                            name: "\u200b\n.ping",
                            value: "Shows an average latency between the bot and the websocket server.\n\u200b"
                        },
                        {
                            name: ".rps",
                            value: "Play a game of rock, paper, scissors with someone else! \nIt's best to use this command in a pm to the bot to prevent other players from seeing what u picked.\nUsage: `.rps r|p|s` or `.rps rock|paper|scissors`.\n\u200b"
                        },
                        {
                            name: ".games",
                            value: "Shows a list of some fun games we play on this server.\n\u200b"
                        },
                        {
                            name: ".role",
                            value: "Adds or removes one of the possible roles, .role for more info.\nUsage: `.role add|del role`.\n\u200b"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: "Page 1/4"
                        }
                    }
                })
                helpMessage.react('1⃣').then(function (reaction) {
                    reaction.fetchUsers().then(function (reactionUsers) {
                        reaction.remove(user);
                    })
                });
                break;
            case '2⃣':
                helpMessage.edit({
                    embed: {
                        color: 16765184,
                        author: {
                            name: "Turnabout Member commands",
                            icon_url: "https://i.imgur.com/x9vHs9f.png"
                        },
                        fields: [{
                                name: "\u200b\n.react",
                                value: "Reacts with input to the latest message.\nUsage: `.react Great`.\n\u200b"
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: "Page 2/4"
                        }
                    }
                })
                helpMessage.react('2⃣').then(function (reaction) {
                    reaction.fetchUsers().then(function (reactionUsers) {
                        reaction.remove(user);
                    })
                });
                break;
            case '3⃣':
                helpMessage.edit({
                    embed: {
                        color: 16765184,
                        author: {
                            name: "Active Typewriter commands",
                            icon_url: "https://i.imgur.com/x9vHs9f.png"
                        },
                        fields: [{
                            name: "\u200b\n.poll",
                            value: "Makes a poll on which people can vote in #polls.\nUsage: `.poll Q; O1; O2 ...` or `.poll Question` for yes/no poll.\n\u200b"
                        },
                            {
                            name: ".live",
                            value: "Let people know you're livestreaming right now!\nUsage: `.live Game`, leave game blank for your default game. \n.liveSettings to customize the embed!\n\u200b"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: "Page 3/4"
                        }
                    }
                })
                helpMessage.react('3⃣').then(function (reaction) {
                    reaction.fetchUsers().then(function (reactionUsers) {
                        reaction.remove(user);
                    })
                });
                break;
            case '4⃣':
                helpMessage.edit({
                    embed: {
                        color: 16765184,
                        author: {
                            name: "Moderator commands",
                            icon_url: "https://i.imgur.com/x9vHs9f.png"
                        },
                        fields: [{
                            name: "\u200b\n.say",
                            value: "Makes the bot say something and delete the original message.\n\u200b"
                        },
                        {
                            name: ".purge",
                            value: "Removes up to 100 messages from all users in the channel.\nUsage: `.purge 42`\n\u200b"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: "Page 4/4"
                        }
                    }
                })
                helpMessage.react('4⃣').then(function (reaction) {
                    reaction.fetchUsers().then(function (reactionUsers) {
                        reaction.remove(user);
                    })
                });
                break;
        }
    }
});

// @Chillzone role when joining voicechannel 'Chillzone'
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if (oldUserChannel === undefined || newUserChannel !== undefined) {
        if (newUserChannel.name !== "Chillzone") {
            oldMember.removeRole("510547490660024331");
        }
        if (newUserChannel.name === "Chillzone") {
            newMember.addRole("510547490660024331");
        }

    } else if (newUserChannel === undefined) {
        oldMember.removeRole("510547490660024331");
        newMember.removeRole("510547490660024331");
    }
})

client.on("message", async message => {
    if (lastMessages.length === 2) {
        lastMessages.splice(0, 1);
        lastMessages.push(message);
    } else {
        lastMessages[0] = message;
        lastMessages[1] = message;
    }

    var messageSplit = message.content.split(" ");
    var replies = ["https://gph.is/1SPmL69", "https://tenor.com/view/full-metal-jacket-who-pinged-me-gunnery-sergeant-hartman-chat-ping-pong-gif-11748348", "https://gph.is/28LBdcE", "https://gph.is/2pr2AQS", "https://gph.is/1faYQZ7", "https://gph.is/1ONkJPP", "https://gph.is/YBLP1n", "https://gph.is/2aLFgbt", "https://gph.is/1pGtWuy", "https://gph.is/2MtcbCX", "https://tenor.com/view/hit-or-miss-hit-or-miss-guess-gif-13001450", "https://tenor.com/view/dab-dance-hit-or-miss-nyan-cosplay-tik-tok-gif-12988318", "I hope you have a good reason for taggin' me.", "What's up?", "Thanks for tagging me! Now I can let everyone know how much of an awesome guy Smitsey actually is :D", "This ain't it, Chief.", "Stop tagging me human! Love ya :heart:"];
    for (var i = 0; i < messageSplit.length; i++){
        if (messageSplit[i] === "<@470006403113680906>") {
            var getal = getRandomInt(0, gifs.length);
        return message.channel.send(replies[getal]);
    }
}
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //anything but command. ex: !test Hello World, args = [Hello,World]
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        //message.channel.send(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
    if (command === "say") {
        if (!message.member.roles.some(r => ["TurboLand", "Mucho Importante Spaghetti", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        } else {
            // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
            // To get the "message" itself we join the `args` back into a string with spaces: 
            const sayMessage = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o => { });
            message.channel.send(sayMessage);
            console.log(`${message.author.username} used Turnabot to send the message: ${sayMessage}.`);
        }
    }
    if (command === "poll") {
        if (!message.member.roles.some(r => ["Active Typewriters", "Mucho Importante Spaghetti", "TurboLand", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        if (args <= 4) {
            message.delete().catch(O_o => { });
            return message.reply(`use the poll-command like this:\n.poll question; option 1; option 2 etc..\nLeave options blank for a yes or no question.`)
        }

        let pollQuestion = args.join(" ");
        if (pollQuestion.includes("@everyone") && !message.member.roles.some(r => ["Turnabout Member", "Mods", "Mucho Importante Spaghetti"].includes(r.name))) {
            pollQuestion = pollQuestion.replace(/@everyone/g, 'everyone');
        }
        const pollOptions = pollQuestion.substring(pollQuestion.indexOf(`;`) + 1);

        // Multiple-choice
        if (pollOptions.indexOf(`;`) > 0) {
            const input = args.slice(0).join(" ");
            const poll = input.split(';');

            // Setting up poll
            const embed = new Discord.RichEmbed()
                .setColor([255, 0, 250])
                .setFooter(`${message.author.username}`)
                .setTimestamp()
                .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                .addField(`${poll[0]}`, "Use reactions to vote!\n\u200b")

            var emoji = "";
            var option = "";
            for (var i = 0; i < poll.length - 1; i++) {
                emoji = ":regional_indicator_" + String.fromCharCode('a'.charCodeAt() + i) + ":";
                option = poll[i + 1];
                embed.addField(emoji, option + "\n\u200b")
            }

            // Setting up reactions
            var emoji = 127462;
            message.delete().catch(O_o => { });
            message.channel.send(`:ballot_box: ${message.author.username} has started a vote! React to my message in ` + message.guild.channels.get('472042203380973568').toString() + ` to vote on it. :ballot_box:`);
            client.channels.get('472042203380973568').send({ embed }).then(async function (newMessage) {
                for (var j = 0; j < poll.length - 1; j++) {
                    await newMessage.react(String.fromCodePoint(emoji));
                    emoji++;
                }
            })
            console.log(`${message.author.username} made a multi-option poll.`);

        // Yes or no
        } else {
            message.delete().catch(O_o => { });
            message.channel.send(`:ballot_box: ${message.author.username} has started a vote! React to my message in ` + message.guild.channels.get('472042203380973568').toString() + ` to vote on it. :ballot_box: `);
            client.channels.get('472042203380973568').send(pollQuestion + ` - *__Submitted by ${message.author.username}__*`).then(async function (newMessage) {
                await newMessage.react('✅')
                await newMessage.react('❌')
            })
            console.log(`${message.author.username} made a yes/no poll.`);
        }
    }
    if (command === "games") {
        const embed = new Discord.RichEmbed()
            /*
             * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
             */
            .setColor([25, 119, 173])
            .setAuthor("List of games", "https://i.imgur.com/x9vHs9f.png")
            .addField("\u200b",
                "[Skribbl.io](https://skribbl.io)\nOne person is drawing 1 of the 3 options they get, the others try to guess what the drawer is drawing.\n\n" +
                "[Cards Against Humanity](https://pretendyoure.xyz/zy/)\nEveryone receives a set of white cards, there will be 1 black card drawn with a blank line, which people have to fill in with their set of white cards. One person will be the judge to decide the winner.\n\n" +
                "[No Hope For Us](http://nohopefor.us/game)\nZombie survival game where you have to use your arrowkeys to make a combination, required combinations to kill a zombie are shown above their heads.\n\n" +
                "[HaxBall](https://www.haxball.com/)\n2D physics based football game with top/down view.\n\n" +
                "[TagPro](http://tagpro.koalabeast.com/)\n" +
                "\u200b")

            .setFooter("TTP")
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
        message.channel.send({ embed });
    }
    if (command === "role") {
        const msg = args.slice(0).join(" ");
        const variable = msg.substring(0, 3).toLowerCase();
        let rolestring = msg.substring(4).toLowerCase();

        if (rolestring === "dj") {
            rolestring = "DJ";
        } else if (rolestring === "gamenight") {
            rolestring = "GameNight";
        } else {
            rolestring = capitalize_Words(rolestring);
        }

        let role = message.guild.roles.find("name", `${rolestring}`);
        let user = message.member;

        if (!(variable === "add" || variable === "del")) {
            return message.reply(`use the role-command like this:\n.role add/del role\nAvailable roles: GameNight, Privates Attender, DJ`);
        }
        if (!(rolestring === "Privates Attender" || rolestring === "DJ" || rolestring === "GameNight")) {
            return message.reply("that role is not available! Available roles: GameNight, Privates Attender, DJ");
        }

        if (variable === "add") {
            if (message.member.roles.has(role.id)) {
                return message.reply("you already have that role.")
            } else {
                user.addRole(role);
                return message.reply("your roles have been updated.").then(message => message.delete(5000))
                message.delete().catch(O_o => { });
            }
        }

        if (variable === "del") {
            if (!message.member.roles.has(role.id)) {
                return message.reply("you can't remove a role you don't have.")
            } else {
                user.removeRole(role);
                return message.reply("your roles have been updated.").then(message => message.delete(5000))
                message.delete().catch(O_o => { });
            }
        }
    }
    if (command === "rps") {
        const msg = args.slice(0).join(" ");
        message.delete().catch(O_o => { });
        let material = msg.substring(0).toLowerCase();
        let stateP1 = "";
        let stateP2 = "";

        if (material === "r" || material === "rock") {
            players.push(`${message.author.username}`);
            materials.push("Rock");
            emojis.push(":fist:");
            client.channels.get('481863151495938048').send(`**${message.author.username}** played RPS   ~   ${players.length}/2`);
        }
        if (material === "p" || material === "paper") {
            players.push(`${message.author.username}`);
            materials.push("Paper");
            emojis.push(":raised_hand:");
            client.channels.get('481863151495938048').send(`**${message.author.username}** played RPS   ~   ${players.length}/2`);
        }
        if (material === "s" || material === "scissors") {
            players.push(`${message.author.username}`);
            materials.push("Scissors");
            emojis.push(":v:");
            client.channels.get('481863151495938048').send(`**${message.author.username}** played RPS   ~   ${players.length}/2`);
        }
        if (!(material === "r" || material === "rock" || material === "p" || material === "paper" || material === "s" || material === "scissors")) {
            return message.reply("that's not a valid input! You can only use: Rock (r), Paper (p) or Scissors (s)");
        }

        if (materials.length === 2) {
            const embed = new Discord.RichEmbed()
                .setColor([255, 235, 109])
                .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")

            if ((materials[0] === "Rock" && materials[1] === "Scissors") || (materials[0] === "Paper" && materials[1] === "Rock") || (materials[0] === "Scissors" && materials[1] === "Paper")) {
                stateP1 = "W";
                stateP2 = "L";
            }
            if ((materials[1] === "Rock" && materials[0] === "Scissors") || (materials[1] === "Paper" && materials[0] === "Rock") || (materials[1] === "Scissors" && materials[0] === "Paper")) {
                stateP1 = "L";
                stateP2 = "W";
            }
            if ((materials[0] === "Rock" && materials[1] === "Rock") || (materials[0] === "Paper" && materials[1] === "Paper") || (materials[0] === "Scissors" && materials[1] === "Scissors")) {
                stateP1 = "TIE";
                stateP2 = "TIE";
            }

            embed.addField(`${players[0]} played:`, `${emojis[0]} - ${materials[0]} (**${stateP1}**)` + "\n\u200b")
            embed.addField(`${players[1]} played:`, `${emojis[1]} - ${materials[1]} (**${stateP2}**)`)

            if (materials[0] === "Rock" && materials[1] === "Scissors") {
                embed.addField("\u200b", `${players[0]}'s rock crushed ${players[1]}'s scissors.`)
            }
            if (materials[1] === "Rock" && materials[0] === "Scissors") {
                embed.addField("\u200b", `${players[1]}'s rock crushed ${players[0]}'s scissors.`)
            }
            if (materials[0] === "Paper" && materials[1] === "Rock") {
                embed.addField("\u200b", `${players[0]}'s paper wrapped around ${players[1]}'s rock and made it go commit die.`)
            }
            if (materials[1] === "Paper" && materials[0] === "Rock") {
                embed.addField("\u200b", `${players[1]}'s paper wrapped around ${players[0]}'s rock and made it go commit die.`)
            }
            if (materials[0] === "Scissors" && materials[1] === "Paper") {
                embed.addField("\u200b", `${players[0]}'s scissors cut right through ${players[1]}'s paper.`)
            }
            if (materials[1] === "Scissors" && materials[0] === "Paper") {
                embed.addField("\u200b", `${players[1]}'s scissors cut right through ${players[0]}'s paper.`)
            }
            if ((materials[0] === "Rock" && materials[1] === "Rock") || (materials[0] === "Paper" && materials[1] === "Paper") || (materials[0] === "Scissors" && materials[1] === "Scissers")) {
                embed.addField("\u200b", "Fair fight! No winners.")
            }

            client.channels.get('481863151495938048').send({ embed });
            players.length = 0;
            materials.length = 0;
            emojis.length = 0;
        }
    }
    if (command === "purge") {
        if (!message.member.roles.some(r => ["Mucho Importante Spaghetti", "TurboLand", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        const deleteCount = parseInt(args[0], 10);

        if (!deleteCount || deleteCount < 1 || deleteCount > 100)
            return message.reply("please provide a number between 1 and 100 of messages to delete.");

        const fetched = await message.channel.fetchMessages({ limit: deleteCount + 1 });
        message.channel.bulkDelete(fetched)
        if (deleteCount === 1) {
            message.channel.send(`:white_check_mark: Removed 1 message.`).then(message => message.delete(5000));
        } else {
            message.channel.send(`:white_check_mark: Removed ${deleteCount} messages.`).then(message => message.delete(5000));
        }
        console.log(`${message.author.username} removed ${deleteCount} messages`);
    }
    if (command === "help") {
        const helpEmbed = new Discord.RichEmbed()
            .setAuthor("Community commands", "https://i.imgur.com/x9vHs9f.png")
            .setColor([255, 209, 0])
            .setFooter("Page 1/4")
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .addField("\u200b\n.ping", "Shows an average latency between the bot and the websocket server.\n\u200b")
            .addField(".rps", "Play a game of rock, paper, scissors with someone else! \nIt's best to use this command in a pm to the bot to prevent other players from seeing what u picked.\nUsage: `.rps r|p|s` or `.rps rock|paper|scissors`.\n\u200b")
            .addField(".games", "Shows a list of some fun games we play on this server.\n\u200b")
            .addField(".role", "Adds or removes one of the possible roles, .role for more info.\nUsage: `.role add|del role`.\n\u200b")


        message.channel.send(helpEmbed).then(async function (newMessage) {
            await newMessage.react('1⃣')
            await newMessage.react('2⃣')
            await newMessage.react('3⃣')
            await newMessage.react('4⃣')
            helpMessage = newMessage
        })
    }
	if (command === "time"){
		var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        if (hours < 10){
            hours = "0" + hours;
        }

        if (minutes < 10){
            minutes = "0" + minutes;
        }

        if (seconds < 10){
            seconds = "0" + seconds;
        }

		message.channel.send("It is: " + hours + ":" + minutes + ":" + seconds);
	}
	if (command === "christmas"){
	    var datum = new Date();
	    var kerst = new Date("12/24/2018");
	    var verschil = (kerst - datum) / 86400000;

	    if (verschil > 0){
	        if (Math.round(Math.abs(verschil)) == 0){
	            message.channel.send("Christmas Eve is today!");
            }else{
                message.channel.send("Only: " + Math.ceil(Math.abs(verschil)) + " Day(s) left until Christmas Eve!");
            }

        }else{
	        message.channel.send("It has been: " + Math.ceil(Math.abs(verschil)) + " Day(s) since Christmas Eve 2018.");
        }

    }
    if (command === "react") {
        if (!message.member.roles.some(r => ["Turnabout Member", "Active Typewriters", "Mucho Importante Spaghetti", "TurboLand", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        let messageToReactOn = lastMessages[0];
        let reactionWord = args.slice(0).join(" ").toLowerCase();
        lastMessages[1] = lastMessages[0];
        message.delete().catch(O_o => { });
        var reactionNumbers = alphabetPosition(reactionWord).split(' ');
        reactionNumbers = removeDuplicates(reactionNumbers).map(Number);

        var emoji = 127461; // One before indicator emojis start
        for (var i = 0; i < reactionNumbers.length; i++) {
            await messageToReactOn.react(String.fromCodePoint(emoji + reactionNumbers[i]));
        }
    }
    if (command === "live") {
        if (!message.member.roles.some(r => ["Active Typewriters", "Mucho Importante Spaghetti", "TurboLand", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        if (!message.author.id === ("125280288799588352" || "223844912456531988" || "277930565028544512" || "211940365266059264" || "125280215688544256" || "313014412560826380")) {
            return message.reply("you're not yet on the list, contact <@125280288799588352> to get added to it!")
        }

        let game = args.slice(0).join(" ");
        game = capitalize_Words(game);
        live.setUser(message.author.id);
        message.delete().catch(O_o => { });

        if (game === "") {
            game = live.getDefaultGame();
        }

        const embed = new Discord.RichEmbed()
            .setAuthor(`${live.getUsername()} just went live on ${live.getPlatform()}!`)
            .setTitle(live.getLink())
            .setURL(live.getLink())
            .setThumbnail(message.author.avatarURL)
            .setImage(live.getImage())
            .addField("Playing:", game)
            .addField("Started at (CET Time):", getTime())
            .setColor(6570404)
            .setFooter(live.getUsername() + " • " + getTime())


        message.channel.send(embed);
    }
    if (command === "setplatform") {
        if (!message.member.roles.some(r => ["Active Typewriters", "Mucho Importante Spaghetti", "TurboLand", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        if (!message.author.id === ("125280288799588352" || "223844912456531988" || "277930565028544512" || "211940365266059264" || "125280215688544256" || "313014412560826380")) {
            return message.reply("you're not yet on the list, contact <@125280288799588352> to get added to it!")
        }

        live.setUser(message.author.id);
        let platform = args[0];
        platform = capitalize_Words(platform);
        if (platform !== "Youtube" && platform !== "Twitch") {
            return message.reply("only platform-options are YouTube and Twitch.");
        }
        if (platform === "Youtube") {
            platform = "YouTube";
        }
        message.delete().catch(O_o => { });
        live.setPlatform(platform);
        message.channel.send(":white_check_mark: Your live streaming platform has been changed to: `" + platform + "`.").then(message => message.delete(5000));
    }
    if (command === "setlink") {
        if (!message.member.roles.some(r => ["Active Typewriters", "Mucho Importante Spaghetti", "TurboLand", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        if (!message.author.id === ("125280288799588352" || "223844912456531988" || "277930565028544512" || "211940365266059264" || "125280215688544256" || "313014412560826380")) {
            return message.reply("you're not yet on the list, contact <@125280288799588352> to get added to it!")
        }

        live.setUser(message.author.id);
        let link = args[0];
        if (!(link.includes("https://www.youtube.com/") || link.includes("https://www.twitch.tv/"))) {
            return message.reply("that's an invalid channel link.\nLink must contain `https://www.youtube.com/` or `https://www.twitch.tv/`");
        }
        message.delete().catch(O_o => { });
        live.setLink(link);
        message.channel.send(":white_check_mark: Your live streaming link has been changed to: `" + link + "`.").then(message => message.delete(5000));
    }
    if (command === "setdefaultgame") {
        if (!message.member.roles.some(r => ["Active Typewriters", "Mucho Importante Spaghetti", "TurboLand", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        if (!message.author.id === ("125280288799588352" || "223844912456531988" || "277930565028544512" || "211940365266059264" || "125280215688544256" || "313014412560826380")) {
            return message.reply("you're not yet on the list, contact <@125280288799588352> to get added to it!")
        }

        live.setUser(message.author.id);
        let defaultGame = args.slice(0).join(" ");
        message.delete().catch(O_o => { });
        live.setDefaultGame(defaultGame);
        message.channel.send(":white_check_mark: Your default game has been changed to: `" + defaultGame + "`.").then(message => message.delete(5000));
    }
    if (command === "setimage") {
        if (!message.member.roles.some(r => ["Active Typewriters", "Mucho Importante Spaghetti", "TurboLand", "Coder"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        if (!message.author.id === ("125280288799588352" || "223844912456531988" || "277930565028544512" || "211940365266059264" || "125280215688544256" || "313014412560826380")) {
            return message.reply("you're not yet on the list, contact <@125280288799588352> to get added to it!")
        }

        live.setUser(message.author.id);
        let image = args[0];
        if (!image.includes("https://i.imgur.com/")) {
            return message.reply("that's an invalid link.\nPicture must be from https://imgur.com/, look for the sharing-link that looks like this: `https://i.imgur.com/example.png`, gif's work too!");
        }
        message.delete().catch(O_o => { });
        live.setImage(image);
        message.channel.send(":white_check_mark: Your image has been changed.").then(message => message.delete(5000));
    }
    if (command === "livesettings") {
        const Embed = new Discord.RichEmbed()
            .setAuthor("Live Settings", "https://i.imgur.com/x9vHs9f.png")
            .setColor([255, 209, 0])
            .setFooter("Active Typewriter role required!")
            .setTimestamp()
            .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
            .addField("\u200b\n.setPlatform", "Change your streaming platform (YouTube | Twitch).\n\u200b")
            .addField(".setLink", "Change the link of your channel (YouTube | Twitch).\n\u200b")
            .addField(".setDefaultGame", "Change your default game that you stream.\n\u200b")
            .addField(".setImage", "Change the image inside the embed.\n**Has** to be from https://imgur.com, look for the sharing-link that looks like this: `https://i.imgur.com/example.png`, gif's work too!\n\u200b")

        message.channel.send(Embed)
    }
});

client.login(process.env.BOT_TOKEN);
