const config = require(`${process.cwd()}/config.json`)
// Load discord
const Discord = require('discord.js')
const client = new Discord.Client()
// 1234
client.login('請輸入機器人token')
// Load mineflayer
const mineflayer = require('mineflayer')
const bot = mineflayer.createBot({
  host: '遊戲伺服器IP', 
    port:25565, 
    username: config.username,
    password: config.password,
})
bot.once('spawn', () => {
    const channel = client.channels.cache.find(channel => channel.id ===`請輸入頻道ID`)
    console.log('Minecraft 殭屍豬人塔Bot 啟動成功 請勿關閉此視窗')
   setInterval(function () {
       channel.send(`${bot.username}目前經驗等級為${bot.experience.level}級`);
   }, 請填入發送間隔時間(單位毫秒))
})
