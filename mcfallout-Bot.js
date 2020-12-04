const config = require(`${process.cwd()}/config.json`)  //讀取config(組態)
const settings = require(`${process.cwd()}/settings.json`) //讀取設定檔案
const lang = require(`${process.cwd()}/lang/${settings.language}.json`) //讀取語言檔案
const Discord = require('discord.js');  //讀取discord.js模塊
const client = new Discord.Client();
const tokens = require('prismarine-tokens-fixed');  //讀取prismarine-tokens-fixed(驗證緩存)模塊
const mineflayer = require('mineflayer');  //讀取mineflayer模塊
const version = (`V1.1.0`);  //定義bot版本
const {MessageEmbed} = require("discord.js"); //定義訊息遷入讀取discord.js模塊

//驗證版本
client.on("ready", async function () {  //當discord bot 啟動時
    console.log(lang.up1)
    client.channels.cache.find(channel => channel.id === `781479174913261589`).send(`${version}`)  //發送bot版本進行驗證
});
client.on('message', msg => {
    if (msg.content === `${version}-${lang.up2}`) {  //偵測版本是否是最新的
        console.log(`${lang.up3}${version})`)
    }
});
console.log(`${lang.discord}`)
console.log(`${lang.lang}`)
console.log(`${lang.joinsever}...`)

let loginOpts = {  //登入資訊
    host: config.ip,  //伺服器ip
    port: config.port,  //伺服器port(預設25565)
    username: config.username,  //Minecraft帳號
    password: config.password,  //Minecraft密碼
    tokensLocation: './bot_tokens.json',  //驗證緩存檔案
    tokensDebug: true,
    version: "1.16.4"  //bot的Minecraft版本
}


function connects() {
    tokens.use(loginOpts, function (_err, _opts) {
        const bot = mineflayer.createBot(_opts)

        bot.once('spawn', () => {   //bot啟動時
            console.log(`${lang.join}`)
            console.log(`${lang.settings}`)
            console.log(`${lang.setok}\n`)
            //發送客戶端訊息
            const infoembed = new MessageEmbed()
                .setTitle(`伺服器IP:${config.ip}`)
                .setColor("BLUE")
                .setURL(`https://minotar.net/helm/${bot.username}.png`)
                .setThumbnail(`https://minotar.net/helm/${bot.username}.png`)
                .addField(`目前客戶端版本`, version)
                .addField(`Discord 帳號`, `${config.Discord}`, true)

                .addField(`Minecraft ID`, bot.username, true)
                .addField(`UUID`, bot.player.uuid);
            client.channels.cache.find(channel => channel.id === `769357837917880351`).send(`【廢土掛機Bot】mcfallout Bot log `, infoembed);
            //自動宣傳
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
            //從小黑窗中發送訊息
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });
            rl.on('line', function (line) {
                bot.chat(line)
            });
            // 自動重生&/back回到死亡點
            if (settings.death === `true`) {
                bot.on("death", function () {
                    setTimeout(function () {
                        bot.chat("/back")
                    }, 3000)

                })
            }
            if (settings.attack === `true`) {
                require("./commands/attack")(bot,settings);
            }
        })
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
                if (whitelist.includes(playerid)||whitelist2.includes(playerid)) {
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
                const cmdembed = new MessageEmbed()
                    .setTitle(`McSngbot指令`)
                    .setColor(6947261)
                    .addField(`指令`, args[0], true)
                    .addField(`指令操作者ID`, playerid, true)
                    .addField(`Bot ID`, bot.username, true)
                client.channels.cache.find(channel => channel.id === `769357837917880351`).send(cmdembed);
                if (whitelist.includes(`${playerid[0]}`) ||
                    (whitelist2.includes(`${playerid[0]}`))) {
                    switch (args[0]) {
                        case "attack":
                            if (settings.attack === `true`) {
                                console.log(`${lang.attackinfo}`)
                                bot.chat(`/m ${playerid[0]} ${lang.attackbot}`)
                            } else if (settings.attack === `false`) {
                                console.log(`${lang.attackinfo}`)
                                bot.chat(`/m ${playerid[0]} ${lang.attackbot}`)
                                await require("./commands/attack")(bot, settings);
                            }
                            break
                        case "attack-help":
                            bot.chat(`/m ${playerid[0]} ${lang.attackhelp}`)
                            break
                        case "about":
                            bot.chat(`/m ${playerid[0]} ${lang.about}`)
                            break
                        case "exit":
                            bot.chat(`/m ${playerid[0]} 正在關閉bot中...`)
                            console.log(`正在關閉bot中...`)
                            process.exit()
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
                        case "exp":  //查詢經驗值
                            let exp = Math.round(bot.experience.progress * 100)
                            bot.chat(`/m ${playerid[0]} ${lang.level}: ${bot.experience.level} , ${lang.experience}: ${bot.experience.points}  ${lang.Percentageexperience}: ${exp}%`)
                            break
                        case "throw":  //丟棄指定物品
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
//登入discord bot
client.login('your discord bot token')