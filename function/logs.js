module.exports = async (fs,data,time) => {
    fs.appendFile(`./logs/log-${time}.txt`, `${data}`, function (err) {
        if (err)
            console.log(err);
    });
}