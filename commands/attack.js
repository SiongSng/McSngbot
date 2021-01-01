module.exports = async (bot) => {
    setInterval(async function () {
        let list = [6, 13, 22, 62, 73, 92, 94, 96, 98, 102]
        for (let mobstoattack in bot.entities) {
            if (list.includes(bot.entities[mobstoattack].entityType)) {
                await bot.attack(bot.entities[mobstoattack])
            }
        }
    }, 650)
}
/* id所代表的生物:
 6  => blaze(烈焰使者)
 13 => creeper(苦力怕)
 22 => evoker(喚魔者)
 62 => pillager(掠奪者)
 73 => skeleton(骷髏)
 92 => Vex(腦鬼)
 94 => villager(衛道士)
 96 => witch(女巫)
 98 => wither_skeleton(凋零骷髏)
 102 => zombie(殭屍) */