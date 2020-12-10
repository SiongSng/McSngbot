module.exports = async (bot) => {
    setInterval(async function () {
        let list = [22,62,92,94,96,98]
      for (let mobstoattack in bot.entities) {
            if (list.includes(bot.entities[mobstoattack].entityType))     //無須過多= 
              {
               await bot.attack(bot.entities[mobstoattack])  //使用await 同步
                 }
            }
    }, 650)
}
