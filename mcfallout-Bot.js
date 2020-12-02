const config = require(`${process.cwd()}/config.json`)
const settings = require(`${process.cwd()}/settings.json`)
const lang = require(`${process.cwd()}/lang/${settings.language}.json`)
const Discord = require('discord.js');
const client = new Discord.Client();
client.login('your token')
const tokens = require('prismarine-tokens-fixed');
const mineflayer = require('mineflayer');
const version = (`V1.1.0`);

//驗證版本
client.on("ready",async  function () {
    console.log(lang.up1)
    const channel = client.channels.cache.find(channel => channel.id === `781479174913261589`)
    channel.send(`${version}`)
});
    client.on('message',msg  => {
        if (msg.content === `${version}-${lang.up2}`) {
        console.log(`${lang.up3}${version})`)
    }
    });
    console.log(`${lang.discord}`)
        console.log(`${lang.lang}`)
        console.log(`${lang.joinsever}...`)

        let loginOpts = {
            host: config.ip,
            port: config.port,
            username: config.username,
            password: config.password,
            tokensLocation: './bot_tokens.json',
            tokensDebug: true,
            version: "1.16.4"
        }


        function connects() {
            tokens.use(loginOpts, function (_err, _opts) {
                const bot = mineflayer.createBot(_opts)

                bot.once('spawn', () => {
                    console.log(`${lang.join}`)
                    console.log(`${lang.settings}`)
                    console.log(`${lang.setok}\n`)
                    setTimeout(function () {
                        bot.look(0, 0)
                    }, 1000)
                    setTimeout(function () {
                        bot.look(90, 0)
                    }, 2000)
                    setTimeout(function () {
                        bot.look(0, 0)
                    }, 3000)
                    const channel = client.channels.cache.find(channel => channel.id === `769357837917880351`)
                    const embed = {
                        "url": (`https://minotar.net/helm/${bot.username}.png`),
                        "color": 602623,
                        "thumbnail": {
                            "url": (`https://minotar.net/helm/${bot.username}.png`)
                        },
                        "author": {
                            "name": (`伺服器IP:${config.ip}`),
                        },
                        "fields": [
                            {
                                "name": "目前客戶端版本",
                                "value": (`${version}`)
                            },
                            {
                                "name": "Discord 帳號",
                                "value": (`<${config.Discord}>`)
                            },
                            {
                                "name": "Minecraft ID",
                                "value": (`${bot.username}`)
                            },
                            {
                                "name": "UUID",
                                "value": (bot.player.uuid)
                            }
                        ]
                    };
                    channel.send(`【廢土掛機Bot】mcfallout Bot log `, {embed});
                    if (settings.Publicity === `true`) {
                        setInterval(function () {
                            bot.chat(`${config.Publicity}`)
                        }, 21600000)
                        setInterval(function () {
                            bot.chat(`${config.Publicity} .w.`)
                        }, 21600000)
                        setInterval(function () {
                            bot.chat(`${config.Transaction}`)
                        }, 600000)
                    }
                    const readline = require('readline');
                    const rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout,
                        terminal: false
                    });
                    rl.on('line', function (line) {
                        bot.chat(line)
                    });
                    if (settings.attack === `true`)
                    setInterval(function () {
                        for (let mobstoattack in bot.entities) {
                            switch (bot.entities[mobstoattack].entityType) {
                                case 22:
                                    bot.attack(bot.entities[mobstoattack])
                                    break
                                case 62:
                                    bot.attack(bot.entities[mobstoattack])
                                    break
                                case 92:
                                    bot.attack(bot.entities[mobstoattack])
                                    break
                                case 94:
                                    bot.attack(bot.entities[mobstoattack])
                                    break
                                case 96:
                                    bot.attack(bot.entities[mobstoattack])
                                    break
                                case 98:
                                    bot.attack(bot.entities[mobstoattack])
                            }
                        }
                    }, 250)
                });

                bot.on("message", async function (jsonMsg) {
                    const health = /目標生命 \: ❤❤❤❤❤❤❤❤❤❤ \/ ([\S]+)/g.exec(jsonMsg.toString()) //ignore system call
                    if (health ||
                        jsonMsg.toString().toLowerCase().includes(`展示了`)) {
                    } else {
                        console.log(jsonMsg.toAnsi())
                    }
                    })
                    const whitelist = (config.whitelist)
                    const whitelist2 = "Barry23412"
                    bot.on("message", async function (jsonMsg) {
                    if (jsonMsg.toString().startsWith(`[廢土伺服] :`) &&
                        jsonMsg.toString().toLowerCase().includes(`想要你傳送到 該玩家 的位置!`) ||
                        jsonMsg.toString().toLowerCase().includes(`想要傳送到 你 的位置`)) { //切訊息{
                        let dec = jsonMsg.toString().split(/ +/g);
                        let playerid = dec[2] //2
                        if (whitelist.includes(playerid)) {
                            bot.chat(`/tok`)
                        }else if (whitelist2.includes(playerid)) {
                            bot.chat(`/tok`)
                        } else {
                            bot.chat(`/tno`)
                        }
                    }

                        if (jsonMsg.toString().startsWith(`[收到私訊`)) {  //切訊息
                        const msg = (jsonMsg.toString())
                        let dec = msg.split(/ +/g);
                        let lo = dec[2].split(`]`)//
                        let playerid = dec.splice(lo.length)[0].split("]") //Minecraft ID
                        let args = msg.slice(10 + playerid[0].length).split(" ")
                        const channel = client.channels.cache.find(channel => channel.id === `769357837917880351`)
                        const embed = {
                            "color": 6947261,
                            "timestamp": "2020-11-21T00:06:52.050Z",
                            "thumbnail": {
                                "url": (`https://minotar.net/helm/${playerid}.png`)
                            },
                            "author": {
                                "name": "mcfallout Bot 指令"
                            },
                            "fields": [
                                {
                                    "name": "指令",
                                    "value": `${args[0]}`
                                },
                                {
                                    "name": "指令操作者ID",
                                    "value": `${playerid}`
                                },
                                {
                                    "name": "Bot ID",
                                    "value": `${bot.username}`
                                }
                            ]
                        };
                        channel.send({embed});
                        if (whitelist.includes(`${playerid[0]}`)||
                         (whitelist2.includes(`${playerid[0]}`))) {
                            switch (args[0]) {
                                case "attack":
                                    if (settings.attack === `true`) {
                                        console.log(`${lang.attackinfo}`)
                                        bot.chat(`/m ${playerid[0]} ${lang.attackbot}`)
                                    } else if (settings.attack === `false`){
                                        console.log(`${lang.attackinfo}`)
                                        bot.chat(`/m ${playerid[0]} ${lang.attackbot}`)
                                        setInterval(function () {
                                                    for (let mobstoattack in bot.entities) {
                                                switch (bot.entities[mobstoattack].entityType) {
                                                    case 22:
                                                        bot.attack(bot.entities[mobstoattack])
                                                        break
                                                    case 62:
                                                        bot.attack(bot.entities[mobstoattack])
                                                        break
                                                    case 92:
                                                        bot.attack(bot.entities[mobstoattack])
                                                        break
                                                    case 94:
                                                        bot.attack(bot.entities[mobstoattack])
                                                        break
                                                    case 96:
                                                        bot.attack(bot.entities[mobstoattack])
                                                        break
                                                    case 98:
                                                        bot.attack(bot.entities[mobstoattack])
                                                }
                                            }
                                        }, 250)
                                    }
                                    break
                                case "attack-help":
                                    bot.chat(`/m ${playerid[0]} ${lang.attackhelp}`)
                                    break
                                case "about":
                                    bot.chat(`/m ${playerid[0]} ${lang.about}`)
                                    break
                                case "reload":
                                    bot.chat(`/m ${playerid[0]} ${lang.reload}`)
                                    setTimeout(function () {
                                        connects()
                                    }, 5000)
                                    break
                                case "throwall":
                                    for (let i = 9; i <= 46; i++) {
                                        bot._client.write("window_click", {
                                            windowId: 0,
                                            slot: i,
                                            mouseButton: 1,
                                            action: 1,
                                            mode: 4,
                                            item: 0
                                        })
                                    }
                                    break
                                case "exp":
                                    let exp = Math.round(bot.experience.progress * 100)
                                    bot.chat(`/m ${playerid[0]} ${lang.level}: ${bot.experience.level} , ${lang.experience}: ${bot.experience.points}  ${lang.Percentageexperience}: ${exp}%`)
                                    break
                                case "throw":
                                    if (args[1] !== undefined) {
                                        if (!isNaN(args[1])) {
                                            if (args[1] >= 9) {
                                                if (args[1] <= 46) {
                                                    bot._client.write("window_click", {
                                                        windowId: 0,
                                                        slot: msg[1],
                                                        mouseButton: 1,
                                                        action: 1,
                                                        mode: 4,
                                                        item: 0
                                                    })
                                                } else {
                                                    bot.chat(`/m ${playerid[0]} ${lang.throw}`)
                                                }
                                            }
                                        } else {
                                            bot.chat(`/m ${playerid[0]} ${lang.throw1} ${msg[2]}`)
                                            return;
                                        }
                                    }
                                    break
                            }
                        } else {
                            bot.chat(`/m ${playerid[0]} [${playerid[0]}] ${lang.blacklist}`)
                        }
                    }
                })
                bot.once('end', () => {
                    setTimeout(function () {
                        connects()
                    }, 5000)
                });
            })
        }
        connects()