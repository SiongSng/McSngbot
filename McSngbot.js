//version 1.1.3
const config = require(`${process.cwd()}/config.json`)  //讀取config(組態)
const settings = require(`${process.cwd()}/settings.json`) //讀取設定檔案
const fs = require('fs'); //讀取fs模塊
const tokens = require('prismarine-tokens-fixed');  //讀取prismarine-tokens-fixed(驗證緩存)模塊
const mineflayer = require('mineflayer');  //讀取mineflayer模塊

//取得時間
const sd = require('silly-datetime'); //讀取silly-datetime模塊
const time =sd.format(new Date(), 'YYYY-MM-DD HH-mm-ss'); //獲得系統時間
fs.mkdir('./logs', { recursive: true }, (err) => {
    if (err) throw err;
});

fs.writeFile(`./logs/log-${time}.txt`, '【McSngbot】bot載入中...',"utf8", function (err) {
    if (err)
        console.log(`錯誤: ${err}`);
    else
        console.log(`【McSngbot】bot載入中...`);
});

let loginOpts = {  //登入資訊
    host: config.ip,  //伺服器ip
    port: config.port,  //伺服器port(預設25565)
    username: config.username,  //Minecraft帳號
    password: config.password,  //Minecraft密碼
    tokensLocation: './bot_tokens.json',  //驗證緩存檔案
    tokensDebug: true,  //取得的token是否除錯
    version: "1.16.4"  //bot的Minecraft版本
}


function connects() {
    tokens.use(loginOpts, function (_err, _opts) { //使用驗證緩存
        const bot = mineflayer.createBot(_opts) //定義bot為mineflayer類別中的createBot

        bot.once('spawn', () => {   //bot啟動時
            console.log(`bot載入完成\n-------------------------------------`)
            //自動宣傳
            if (settings.Publicity === `true`) {
                setInterval(function () {
                    bot.chat(`${settings.Pycontent}`)
                }, 21600000)
                setInterval(function () {
                    bot.chat(`${settings.Toncontent} .w.`)
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
                let data = `\n[cmd] ${line}`
                require("./function/logs")(fs, data, time);
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
            if (settings.health === `false`) {
                if (health) {
                    return;
                } else {
                    let data = `\n${jsonMsg}`
                    await require("./function/logs")(fs, data, time);
                    console.log(jsonMsg.toAnsi())
                }
            }
            if (settings.health === `true`) {
                let data = `\n${jsonMsg}`
                await require("./function/logs")(fs, data, time);
                console.log(jsonMsg.toAnsi())
            }
        })
        const whitelist = ["Barry23412",config.whitelist]  //無須定義兩個白名單
//         const whitelist = (config.whitelist)  //定義白名單
        const whitelist2 = "Barry23412"  //默認我為白名單(Barry23412,菘菘)
        //自動接受或拒絕/tpa /tpahere
        bot.on("message", async function (jsonMsg) {
            if (jsonMsg.toString().startsWith(`[廢土伺服] :`) &&
                jsonMsg.toString().toLowerCase().includes(`想要你傳送到 該玩家 的位置!`) ||
                jsonMsg.toString().toLowerCase().includes(`想要傳送到 你 的位置`)) {
                let dec = jsonMsg.toString().split(/ +/g);
                let playerid = dec[2] //2
                if (whitelist.includes(playerid)) {
                    bot.chat(`/tok`)
                } else {
                    bot.chat(`/tno`)
                }
            }

            if (jsonMsg.toString().startsWith(`[收到私訊`)) {  //偵測訊息開頭為"[收到私訊"
                const msg = (jsonMsg.toString())
                let dec = msg.split(/ +/g);
                let lo = dec[2].split(`]`)//
                let playerid = dec.splice(lo.length)[0].split("]") //取得Minecraft ID
                let args = msg.slice(10 + playerid[0].length).split(" ")  //取得指令內容
                if (whitelist.includes(`${playerid[0]}`){
                    switch (args[0]) { //指令前綴
                        case "attack":
                            if (settings.attack === `true`) {
                                bot.chat(`/m ${playerid[0]} 已成功開啟自動打怪功能 (/m botID attack-help 顯示更多資訊`)
                            } else if (settings.attack === `false`) {
                                bot.chat(`/m ${playerid[0]} 已成功開啟自動打怪功能 (/m botID attack-help 顯示更多資訊`)
                                await require("./commands/Discardeditems")(bot);
                                await require("./commands/attack")(bot);
                            }
                            break
                        case "cmd":
                            let cmd = msg.slice(10 +playerid[0].length + 4).split(" ")
                            bot.chat(`${cmd}`)
                            break
                        case "about":
                            bot.chat(`/m ${playerid[0]} 此bot由菘菘編譯而成，想查看bot相關的教學或想要下載     歡迎加入我的Discord伺服器 (https://discord.gg/5w9BUM4) 點連結即可前往`)
                            break
                        case "exit":
                            bot.chat(`/m ${playerid[0]} 正在關閉bot中...`)
                            console.log(`5秒後關閉bot...`)
                            setTimeout(function () {
                                process.exit()
                            },5000)
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
        //kick 被伺服器踢出事件
        bot.once('kicked', (reason, loggedIn) => {
            let time1 =sd.format(new Date(), 'YYYY-MM-DD HH-mm-ss'); //獲得系統時間
            let data = `【McSngbot】[資訊] 客戶端與伺服器斷線\n斷線時間:${time1}   原因 :\n${reason}`
            require("./function/logs")(fs, data, time);
            console.log(data)
        });
        //斷線自動重連
        bot.once('end', () => {
            let time1 =sd.format(new Date(), 'YYYY-MM-DD HH-mm-ss'); //獲得系統時間
            let data =`【McSngbot】[資訊] 客戶端與伺服器斷線 ，5秒後將會自動重新連線...\n斷線時間:${time1}`
            console.log(data)
            require("./function/logs")(fs, data, time);
            setTimeout(function () {
                connects();
            }, 5000)
        });
    })
}
connects();
