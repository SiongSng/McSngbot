const config = require(`${process.cwd()}/config.json`)
const Discord = require('discord.js');
const client = new Discord.Client();
client.login('請輸入您的Discord bot tokev')
const webhook = require("webhook-discord")
const tokens = require('prismarine-tokens-fixed');
const Hook = new webhook.Webhook(`請輸入您的Webhook網址`)
const mineflayer = require('mineflayer');
const { connect } = require('http2')
function connects(){
  const bot = mineflayer.createBot({
    host: '伺服器遊戲IP', 
      port:25565, 
      username: config.username,
      password: config.password,
  })
  // 1233
  bot.once('spawn', () => {
          bot.look(90,0)
    setTimeout(function(){bot.look(0,0)},1000) 
    setTimeout(function(){bot.look(90,0)},2000)
    setTimeout(function(){bot.look(0,0)},3000)
    setTimeout(function(){bot.look(0,0)},1000) 
    setTimeout(function(){bot.look(90,0)},2000)
    setTimeout(function(){bot.look(0,0)},3000)
  const channel = client.channels.cache.find(channel => channel.id ===`頻道ID`)
  const embed = {
    "url": (`https://minotar.net/helm/${bot.username}.png`),
    "color": 602623,
    "thumbnail": {
      "url": (`https://minotar.net/helm/${bot.username}.png`)
    },
    "author": {
      "name": "廢土伺服器",
      "url": "https://www.mcfallout.net",
      "icon_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/panel-61773742-image-d05f46ce-dbdf-4b7d-992a-c550df512a05"
    },
    "fields": [
      {
        "name": "目前客戶端版本",
        "value": "V1.0.5"
      },
      {
        "name": "使用者Minecraft ID",
        "value": (`${bot.username}`)
      },
      {
        "name": "UUID",
        "value": (bot.player.uuid)
      },
      {
        "name": "宣傳內容",
        "value": (config.Publicity)
      },
      {
        "name": ":laughing: 客戶端登入成功",
        "value": ":tada: 回傳資料成功",
        "inline": true
      }
    ]
  };
  channel.send("【廢土掛機Bot】mcfallout Bot log", { embed });
  console.log('【廢土掛機Bot】mcfallout Bot 啟動成功 請勿關閉此視窗(除非要關閉此Bot)')
  console.log('注意!! 請稍等約15秒鐘即可發話&打指令')
  setInterval(function (){
const embed = {
  "url": (`https://minotar.net/helm/${bot.username}.png`),
  "color": 602623,
  "thumbnail": {
    "url": (`https://minotar.net/helm/${bot.username}.png`)
  },
  "author": {
    "name": "廢土伺服器",
    "url": "https://www.mcfallout.net",
    "icon_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/panel-61773742-image-d05f46ce-dbdf-4b7d-992a-c550df512a05"
  },
  "fields": [
    {
      "name": "登入時間",
      "value": ":stopwatch: 又過了30分鐘 www"
    },
    {
      "name": "目前客戶端版本",
      "value": "V1.0.5"
    },
    {
      "name": "使用者Minecraft ID",
      "value": (`${bot.username}`)
    },
    {
      "name": "UUID",
      "value": (bot.player.uuid)
    },
    {
      "name": "宣傳內容",
      "value": (config.Publicity)
    },
    {
      "name": ":laughing: 恭喜您以掛機30分鐘囉!",
      "value": ":tada: 回傳資料成功",
      "inline": true
    }
  ]
};
channel.send("【廢土掛機Bot】mcfallout Bot log", { embed });
},1803000)
})
bot.once('spawn', () => {
    const channel = client.channels.cache.find(channel => channel.id ===`頻道ID`)
   setInterval(function () {
       channel.send(`${bot.username}目前經驗等級為${bot.experience.level}級`);
   }, 60000)
      setInterval(function () {
   bot.chat(config.Publicity)
  },3600000)
  setInterval(function (){
      bot.chat(`${config.Publicity}  w`)
  },3600000)
  setInterval(function (){
    bot.chat(config.Transaction-promotion)
},605000)
  const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});
rl.on('line', function (line) {
        bot.chat(line)
    })
})
setInterval(() => {
  const mobFilter = e => e.type === 'mob' && e.mobType === ('實體ID')
  const mob = bot.nearestEntity(mobFilter)

    if (!mob) return;

    const pos = mob.position;
    bot.lookAt(pos, true, () => {
        bot.attack(mob);
    });
}, 1000);
bot.on("message", async function (jsonMsg) {
            const health = /目標生命 \: ❤❤❤❤❤❤❤❤❤❤ \/ ([\S]+)/g.exec(jsonMsg.toString())
            const whitelist = config.whitelist
            if(jsonMsg.toString().toLowerCase().includes(`系統>`)||
                health ||
                jsonMsg.toString().toLowerCase().includes(`展示了`)){
            }else {
                console.log(jsonMsg.toAnsi())
            }
  if (jsonMsg.toString().startsWith(`[廢土伺服] :`) &&
      jsonMsg.toString().toLowerCase().includes(`想要你傳送到 該玩家 的位置!`)){
      let dec = jsonMsg.toString().split(/ +/g);
      let playerid = dec[2] //2
      if(whitelist.includes(playerid)){
          bot.chat(`/tok`)
      }else {
          bot.chat(`/tno`)
      }
  }
  if(jsonMsg.toString().startsWith(`[廢土伺服] :`) &&
      jsonMsg.toString().toLowerCase().includes(`想要傳送到 你 的位置`)){  
      let dec = jsonMsg.toString().split(/ +/g);
      let playerid = dec[2] //2
      if(whitelist.includes(playerid)){
          bot.chat(`/tok`)
      }else {
          bot.chat(`/tno`)
      }
  }
  if (jsonMsg.toString().startsWith(`[收到私訊`)) {  
    const channel = client.channels.cache.find(channel => channel.id ===`頻道ID`)
      let dec = jsonMsg.toString().split(/ +/g);
      let lo = dec[2].split(`]`)//
      let playerid = dec.splice(lo.length)[0].split("]") 
      let msg = jsonMsg.toString().slice(18 + playerid.length).split(" ")
      if (whitelist.includes(`${playerid[0]}`)) {
          channel.send(`ID : ${playerid[0]}`);
          channel.send(`msg ${msg[0]}`);
          switch (msg[0]) {
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
                  if (msg[1] !== undefined) {
                      if (!isNaN(msg[1])) {
                          if (msg[1] >= 9) {
                              if (msg[1] <= 46) {
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
      }else {
          bot.chat(`/m ${playerid[0]} 您沒有權限使用【廢土掛機Bot】指令(請確認白名單是否正確或者私訊菘菘)`)
      }
  }
})
bot.once('end', () => {
  setTimeout(function (){
  connects()
  },5000)
})
}
connects()