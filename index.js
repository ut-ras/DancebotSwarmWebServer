const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
app.use(express.static("public"));
app.get('/robotJoin', (req, res) => {
    let rawdata = fs.readFileSync('output.json');
    let output = JSON.parse(rawdata);
if(output.num_connected == 0){
    output.num_connected ++;
    var ROBOT_ID = 72;
    var duck = `{"${ROBOT_ID}": {"robot_state": "rose","robot_eye_color": "photo","robot_expression": "light"}}`;
    output.robots.push(JSON.parse(duck));
    let data = JSON.stringify(output);
    fs.writeFile('output.json', data, (err) => {
        if (err) throw err;
    })
}
    console.log(output);

    console.log("req", req.query);
    console.log("ID: ", req.query.id);
    res.send('Hello World You are Robot ' + output, 200);
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

var obj = `{
    "robot_type" : "dancebot",
    "num_connected" : 0,
    "robots" : []
}`;
       // Write data in 'Output.txt' .
fs.writeFile('output.json', obj, (err) => {

   // In case of a error throw err.
   if (err) throw err;
})
