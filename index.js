const express = require('express')
const app = express()
const port = 3000

app.use(express.static("public"));
app.get('/robotJoin', (req, res) => {
    console.log("req", req.query);
    console.log("ID: ", req.query.id);
    res.send('Hello World You are Robot ' + req.query.id, 200);
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));