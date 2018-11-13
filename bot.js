const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log("I am ready, master.");
    client.user.setActivity("RLCS World Championship", { type: 'WATCHING' });
});

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
                            value: "Play a game of rock, paper, scissors with a someone else! \nIt's best to use this command in a pm to the bot to prevent other players from seeing what u picked.\nUsage: .rps r|p|s or rock|paper|scissors\n\u200b"
                        },
                        {
                            name: ".games",
                            value: "Shows a list of some fun games we play on this server.\n\u200b"
                        },
                        {
                            name: ".role",
                            value: "Adds or removes one of the possible roles, .role for more info.\nUsage: .role add|del role\n\u200b"
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
                            name: "Veteran commands",
                            icon_url: "https://i.imgur.com/x9vHs9f.png"
                        },
                        fields: [{
                            name: "\u200b\n.poll",
                            value: "Makes a poll on which people can vote in #polls.\nUsage: .poll Q; O1; O2 ... *Options blank for yes or no question.*\n\u200b"
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
                            name: "Turnabout member commands",
                            icon_url: "https://i.imgur.com/x9vHs9f.png"
                        },
                        fields: [{
                            name: "\u200b\n.live",
                            value: "Promote your stream!\n\u200b"
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
                            value: "Removes up to 100 messages from all users in the channel.\nUsage: .purge 42\n\u200b"
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
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    function capitalize_Words(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    if (command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        //message.channel.send(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
    if (command === "say") {
        if (!message.member.roles.some(r => ["Mods", "Mucho Importante Spaghetti"].includes(r.name))) {
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
        if (!message.member.roles.some(r => ["Veterans", "Turnabout Member", "Mods", "Mucho Importante Spaghetti"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        if (args <= 4) {
            message.delete().catch(O_o => { });
            return message.reply(`use the poll-command like this:\n.poll question; option 1; option 2 etc..\nLeave options blank for a yes or no question.`)
        }

        const pollQuestion = args.join(" ");
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
        if (!message.member.roles.some(r => ["Mods", "Mucho Importante Spaghetti"].includes(r.name))) {
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
            .addField(".rps", "Play a game of rock, paper, scissors with someone else! \nIt's best to use this command in a pm to the bot to prevent other players from seeing what u picked.\nUsage: .rps r|p|s or rock|paper|scissors\n\u200b")
            .addField(".games", "Shows a list of some fun games we play on this server.\n\u200b")
            .addField(".role", "Adds or removes one of the possible roles, .role for more info.\nUsage: .role add|del role\n\u200b")

        message.channel.send(helpEmbed).then(async function (newMessage) {
            await newMessage.react('1⃣')
            await newMessage.react('2⃣')
            await newMessage.react('3⃣')
            await newMessage.react('4⃣')
            helpMessage = newMessage
        })
    }
    if (command === "live") {
        if (!message.member.roles.some(r => ["Turnabout Member", "Mods", "Mucho Importante Spaghetti"].includes(r.name))) {
            return message.reply("you don't have permission to use this command!");
        }
        var fs = require("fs");
        var liveList = fs.readFileSync("./liveList.txt", { "encoding": "utf-8" });

        if (liveList.indexOf(`${message.author.username}`) != -1) {
            message.delete().catch(O_o => { });
            var link = liveList.split(`${message.author.username}!`)[1].split(" ")[0];
            message.channel.send(`**${message.author.username}** just went live! ${link}`);
            console.log(`${message.author.username} just went live!`);
        } else {
            return message.reply("you're not on the streamerslist yet, tag or pm a moderator to get added to the list!")
        }

    }
    if (command === "reload") {
        message.delete().catch(O_o => { });
    }
	
	if (command === "time"){
		var tijd = Date();
		message.channel.send(`${tijd}`);
	}
});

client.login(process.env.BOT_TOKEN);
