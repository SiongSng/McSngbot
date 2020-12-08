const config = require(`${process.cwd()}/config.json`)  //讀取config(組態)
const settings = require(`${process.cwd()}/settings.json`) //讀取設定檔案
console.log(`讀取設定成功`)
const Discord = require('discord.js');  //讀取discord.js模塊
const client = new Discord.Client();
const fs = require('fs'); //讀取fs模塊
const tokens = require('prismarine-tokens-fixed');  //讀取prismarine-tokens-fixed(驗證緩存)模塊
const mineflayer = require('mineflayer');  //讀取mineflayer模塊
const version = (`V1.1.2`);  //定義bot版本

const sd = require('silly-datetime'); //讀取silly-datetime模塊
const time =sd.format(new Date(), 'YYYY-MM-DD HH-mm-ss'); //獲得系統時間

fs.writeFile(`./logs/log-${time}.txt`, '【McSngbot】bot載入中...',"utf8", function (err) {
    if (err)
        console.log(`錯誤: ${err}`);
    else
        console.log(`McSngbot】bot載入中...`);
});

const {MessageEmbed} = require("discord.js"); //定義訊息遷入讀取discord.js模塊

//驗證版本
client.on("ready", async function () {  //當discord bot 啟動時
    console.log(`正在檢查更新中... (如果沒有顯示 【您目前客戶端的版本已經是最新】 ，就代表版本過舊可以到: https://discord.gg/5w9BUM4 更新)`)
    client.channels.cache.find(channel => channel.id === `781479174913261589`).send(`${version}`)  //發送bot版本進行驗證
});
client.on('message', msg => {
    if (msg.content === `${version}-您的版本已經是最新的`) {  //偵測版本是否是最新的
        console.log(`您目前客戶端的版本已經是最新的(版本為:${version})`)
    }
});
console.log(`對此bot有任何問題可以在 https://discord.gg/5w9BUM4 取得支援`)

let loginOpts = {  //登入資訊
    host: config.ip,  //伺服器ip
    port: config.port,  //伺服器port(預設25565)
    username: config.username,  //Minecraft帳號
    password: config.password,  //Minecraft密碼
    tokensLocation: './bot_tokens.json',  //驗證緩存檔案
    tokensDebug: true,  //取得的token是否除錯
    version: "1.16.4"  //bot的Minecraft版本
}


function connects(bot) {
    tokens.use(loginOpts, function (_err, _opts) {
        const bot = mineflayer.createBot(_opts)

        bot.once('spawn', () => {   //bot啟動時
            console.log(`登入帳號成功\n-------------------------------------`)
            //發送客戶端訊息
            const infoembed = new MessageEmbed()
                .setTitle(`【McSngbot】log `)
                .setColor("BLUE")
                .setThumbnail(`https://minotar.net/helm/${bot.username}.png`)
                .addField(`伺服器IP:`,config.ip ,true)
                .addField(`目前客戶端版本`, version)
                .addField(`Discord 帳號`, `${config.Discord}`, true)
                .addField(`Minecraft ID`, bot.username, true)
                .addField(`UUID`, bot.player.uuid);
            client.channels.cache.find(channel => channel.id === `769357837917880351`).send(infoembed);
            //自動宣傳
            if (settings.Publicity === `true`) {
                setInterval(function () {
                    bot.chat(`${settings.publicity}`)
                }, 21600000)
                setInterval(function () {
                    bot.chat(`${settings.publicity} .w.`)
                }, 21600000)
                setInterval(function () {
                    bot.chat(`${settings.Transaction}`)
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
            })
            // 讀取設定檔案並且開始打怪
            if (settings.attack === `true`) {
                require("./commands/attack")(bot);
                require("./commands/Discardeditems")(bot);
            }
        });
        bot.on("message", async function (jsonMsg) {
            const health = /目標生命 \: ❤❤❤❤❤❤❤❤❤❤ \/ ([\S]+)/g.exec(jsonMsg.toString()) //清除目標生命
            if (settings.health === `true`) {
                if (health) {
                    return;
                } else {
                    fs.appendFile(`./logs/log-${time}.txt`, `\n${jsonMsg}`, function (err) {
                        if (err)
                            console.log(err);
                    });
                    console.log(jsonMsg.toAnsi())
                }
            }
            if (settings.health === `false`) {
                fs.appendFile(`./logs/log-${time}.txt`, `\n${jsonMsg.message}`,"utf8", function (err) {
                });
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
                if (whitelist.includes(playerid) || whitelist2.includes(playerid)) {
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
                if (whitelist.includes(`${playerid[0]}`) ||
                    (whitelist2.includes(`${playerid[0]}`))) {
                    switch (args[0]) {
                        case "attack":
                            if (settings.attack === `true`) {
                                bot.chat(`/m ${playerid[0]} 已成功開啟自動打怪功能 (/m botID attack-help 顯示更多資訊`)
                            } else if (settings.attack === `false`) {
                                bot.chat(`/m ${playerid[0]} 已成功開啟自動打怪功能 (/m botID attack-help 顯示更多資訊`)
                                await require("./commands/Discardeditems")(bot);
                                await require("./commands/attack")(bot);
                            }
                            break
                        case "attack-help":
                            bot.chat(`/m ${playerid[0]} 關於全自動打怪功能-繞過CD時間，約每一秒鐘打4下     支援的怪物:掠奪者、惱鬼、女巫、喚魔者、凋零骷髏`)
                            break
                        case "cmd":
                            bot.chat(args[1])
                            break
                        case "about":
                            bot.chat(`/m ${playerid[0]} 此bot由菘菘編譯而成，想查看bot相關的教學或想要下載     歡迎加入我的Discord伺服器 (https://discord.gg/5w9BUM4) 點連結即可前往`)
                            break
                        case "exit":
                            bot.chat(`/m ${playerid[0]} 正在關閉bot中...`)
                            console.log(`正在關閉bot中...`)
                            process.exit()
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
                            bot.chat(`/m ${playerid[0]} 經驗等級: ${bot.experience.level} ,經驗值: ${bot.experience.points}  經驗值百分比: ${exp}%`)
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
                                            bot.chat(`/m ${playerid[0]} 請輸入數字 9-45`)
                                        }
                                    }
                                } else {
                                    bot.chat(`/m ${playerid[0]} 請輸入有效數字 而並非 ${msg[2]}`)
                                    return;
                                }
                            }
                            break
                    }
                } else {
                    bot.chat(`/m ${playerid[0]} [${playerid[0]}] 不在【McSngbot】指令白名單內 (請確認白名單是否正確或者私訊菘菘#8663)`)
                }
            }
        })
        //kick 被伺服器踢出
        bot.once('kicked', (reason, loggedIn) => {
            console.log(`【McSngbot】[資訊] 客戶端與伺服器斷線   原因 : ${reason}`)
        });
        //斷線自動重連
        bot.once('end', () => {
            console.log(`【McSngbot】[資訊] 客戶端與伺服器斷線 ，正在自動重新連線中...`)
            setTimeout(function () {
                connects(bot)
            }, 5000)
        });
    })
}
connects()
//登入discord bot
client.login('your discord bot token')