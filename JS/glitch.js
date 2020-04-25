(() => {
    const http = require('http'),express = require('express'), app = express(), port = 8000;
    app.get("/", (req, res) => {console.log(Date.now() + " Ping Received");res.sendStatus(200);});
    app.listen(port);
    console.log(`App restarter setup, listening on port ${port}!`);
    setInterval(() => {http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)}, 280000);
})()