const config = require(`${process.cwd()}/config.json`)
const Discord = require('discord.js');
const client = new Discord.Client();
client.login('Discord token')
const tokens = require('prismarine-tokens-fixed');
const mineflayer = require('mineflayer');
const whitelist = (`[${config.whitelist},Barry23412]`)

console.log(`正在登入 ${config.ip}...`)

let loginOpts = {
    host: config.ip,
    port: 25565,
    username: config.username,
    password: config.password,
    tokensLocation: './bot_tokens.json',
    tokensDebug: true,
    version: "1.16.4"
}
function connects() {
    tokens.use(loginOpts, function (_err, _opts) {
        const bot = mineflayer.createBot(_opts)

        // 1233
        bot.once('spawn', () => {
            console.log(`登入帳號成功\n-------------------------------------`)
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
                        "value": "V1.0.9"
                    },
                    {
                        "name": "Minecraft ID",
                        "value": (`${bot.username}`)
                    },
                    {
                        "name": "UUID",
                        "value": (bot.player.uuid)
                    },
                    {
                        "name": ":laughing: 客戶端登入成功",
                        "value": ":tada: 回傳資料成功",
                        "inline": true
                    }
                ]
            };
            channel.send("【廢土掛機Bot】mcfallout Bot log", {embed} );
        });

        bot.on("message", async function (jsonMsg) {
            if (jsonMsg.toString().startsWith(`[廢土伺服] :`) &&
                jsonMsg.toString().toLowerCase().includes(`想要你傳送到 該玩家 的位置!`)) { //切訊息
                let dec = jsonMsg.toString().split(/ +/g);
                let playerid = dec[2] //2
                if (whitelist.includes(playerid)) {
                    bot.chat(`/tok`)
                } else {
                    bot.chat(`/tno`)
                }
            }
            if (jsonMsg.toString().startsWith(`[廢土伺服] :`) &&
                jsonMsg.toString().toLowerCase().includes(`想要傳送到 你 的位置`)) {  //切訊息
                let dec = jsonMsg.toString().split(/ +/g);
                let playerid = dec[2] //2
                if (whitelist.includes(playerid)) {
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
                if (whitelist.includes(`${playerid[0]}`)) {
                    switch (args[0]) {
                        case "attack":
                            bot.chat(`/m ${playerid[0]} 已成功開啟自動打怪功能      (/m botID attack-help 顯示更多資訊)`)
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
                            }, 300)
                            break
                        case "attack-help":
                            bot.chat(`/m ${playerid[0]} 關於全自動打怪功能-繞過CD時間，約每一秒鐘打4下     支援的怪物:掠奪者、惱鬼、女巫、喚魔者、凋零骷髏`)
                            break
                        case "about":
                            bot.chat(`/m ${playerid[0]} 此bot由菘菘編譯而成，想查看bot相關的教學或想要下載     請加入我的Discord伺服器 (https://discord.gg/5w9BUM4) 點連結即可前往`)
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
                            bot.chat(`/m ${playerid[0]} 等級: ${bot.experience.level} , 經驗值: ${bot.experience.points}  經驗值百分比: ${exp}%`)
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
                                            bot.chat(`/m ${playerid[0]} 數字 9-45`)
                                        }
                                    } else {
                                        bot.chat(`/m ${playerid[0]} 數字 9-45`)
                                    }
                                } else {
                                    bot.chat(`/m ${playerid[0]} 請輸入有效數字 而並非 ${msg[2]}`)
                                    return;
                                }
                            }
                            break
                    }
                } else {
                    bot.chat(`/m ${playerid[0]} [${playerid[0]}]不在【廢土掛機Bot】指令白名單內 (請確認白名單是否正確或者私訊菘菘#8663)`)
                }
            }
        })
        bot.once('end', () => {
            setTimeout(function () {
                connects()
            }, 5000)
        })
    })
}

connects()