const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
app.use(express.static("public"));

// default storage state
var obj = `{
    "robot_type" : "dancebot",
    "num_connected" : 0,
    "robots" : []
}`;

// Write the storage default into 'Output.txt' .
fs.writeFile('output.json', obj, (err) => {
   // In case of a error throw err.
   if (err) throw err;
})

// open up the endpoint /robotJoin to a GET request
app.get('/robotJoin', (req, res) => {
    console.log("req query: ", req.query);

    let output = getDataFromFile();
    // if this is the first robot who connects, let's set him up as something random.
    if(output.num_connected == 0){
        output.num_connected ++;
        var ROBOT_ID = 72;
        var duck = `{"${ROBOT_ID}": {"robot_state": "rose","robot_eye_color": "photo","robot_expression": "light"}}`;
        output.robots.push(JSON.parse(duck));
        saveDataToFile(output);
    }
    console.log(output);

    res.status(200).send('Hello World You are Robot ' + output);
});


// listen at port 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// getDataFromFile returns a JSON object from a file.
function getDataFromFile() {
    // read the output.json file and parse the data
    let rawdata = fs.readFileSync('output.json');
    let output = JSON.parse(rawdata);
    return output;
}

// saveDataToFile saves a JSON object to a file.
function saveDataToFile(data) {
    fs.writeFile('output.json', JSON.stringify(data), (err) => {
        if (err) throw err;
    })
}