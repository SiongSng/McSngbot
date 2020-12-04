module.exports = async (bot,settings) => {
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