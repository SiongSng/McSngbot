module.exports = async (bot) => {
    setInterval(function () {
      for (let mobstoattack in bot.entities) {
            if (bot.entities[mobstoattack].entityType === 22 ||
                (bot.entities[mobstoattack].entityType === 62) ||
                (bot.entities[mobstoattack].entityType === 92) ||
                (bot.entities[mobstoattack].entityType === 94) ||
                (bot.entities[mobstoattack].entityType === 96) ||
                (bot.entities[mobstoattack].entityType === 98)) {
                bot.attack(bot.entities[mobstoattack])
            }
            }
    }, 650)
}