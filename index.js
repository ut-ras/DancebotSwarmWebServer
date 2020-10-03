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
    console.log("\n\nreq query: ", req.query);
    var exists = false;
    let output = getDataFromFile();

    console.log("output: ", output);

    var robocharge = "100%";
    var robomove = "ankles";
    var roboecol = "blue";
    var roboexp = "happy";
    if(req.query['charge']!=null){
        robocharge = req.query['charge'];
    }
    if(req.query['move']!=null){
        robomove = req.query['move'];
    }
    // if(req.query['eyecol']!=null){
    //     roboecol = req.query['eyecol'];
    // }
    if(req.query['expression']!=null){
        roboexp = req.query['expression'];
    }

    if(req.query['id'] != null){
        var botlist = output.robots;
        for(i = 0; i < output.num_connected; i++){
            console.log(botlist[i]);
            let robot = botlist[i];
            console.log(robot['id']);
            if(robot['id'] === (req.query['id'])){
                console.log('successful find!');
                exists = true;
            }
        }
    }

    // if robot is not specified, set him up with default settings and add id
    if(req.query['id'] == null){
        output.num_connected ++;
        var auto = 'auto_add_';
        var ROBOT_ID = auto.concat(output.num_connected.toString());
        var duck = `{"id":"${ROBOT_ID}","charge":"${robocharge}","move":"${robomove}","expression":"${roboexp}"}`;
        // var duck = `{"id":"${ROBOT_ID}","charge":"${robocharge}","move":"${robomove}","eyecol":"${roboecol}","expression":"${roboexp}"}`;
        output.robots.push(JSON.parse(duck));
        saveDataToFile(output);
    }
    else if(!exists){
        output.num_connected ++;
        var ROBOT_ID = req.query['id'];
        var duck = `{"id":"${ROBOT_ID}","charge":"${robocharge}","move":"${robomove}","expression":"${roboexp}"}`;
        // var duck = `{"id":"${ROBOT_ID}","charge":"${robocharge}","move":"${robomove}","eyecol":"${roboecol}","expression":"${roboexp}"}`;
        output.robots.push(JSON.parse(duck));
        saveDataToFile(output);
    }
    console.log(output);

    res.status(200).send('Number of Bots Added: ' + output.num_connected);
});

app.get('/robotLeave', (req, res) => {
    console.log("\n\nreq query: ", req.query);
    var exists = false;
    let output = getDataFromFile();

    console.log("output: ", output);

    if(req.query['id'] != null){
        var botlist = output.robots;
        for(i = 0; i < output.num_connected; i++){
            console.log(botlist[i]);
            let robot = botlist[i];
            console.log(robot['id']);
            if(robot['id'] === (req.query['id'])){
                console.log('successful find!');
                exists = true;
                output.robots.splice(i, 1);
                output.num_connected--;
                saveDataToFile(output);
            }
        }
    }

    res.status(200).send('Successfully removed bot: ' + req.query['id'])
    console.log(output);
});

app.get('/userMove', (req, res) => {
    console.log("\n\nreq query: ", req.query);
    var exists = false;
    let output = getDataFromFile();

    console.log("output: ", output);

    if(req.query['id'] != null && req.query['move'] != null){
        var botlist = output.robots;
        for(i = 0; i < output.num_connected; i++){
            console.log(botlist[i]);
            let robot = botlist[i];
            console.log(robot['id']);
            if(robot['id'] === (req.query['id'])){
                console.log('successful find!');
                robot['move'] = req.query['move'];
                saveDataToFile(output);
            }
        }
    }

    res.status(200).send('Successfully changed movement of bot: ' + req.query['id'])
    console.log(output);
});

app.get('/userExpress', (req, res) => {
    console.log("\n\nreq query: ", req.query);
    var exists = false;
    let output = getDataFromFile();

    console.log("output: ", output);

    if(req.query['id'] != null && req.query['expression'] != null){
        var botlist = output.robots;
        for(i = 0; i < output.num_connected; i++){
            console.log(botlist[i]);
            let robot = botlist[i];
            console.log(robot['id']);
            if(robot['id'] === (req.query['id'])){
                console.log('successful find!');
                robot['expression'] = req.query['expression'];
                saveDataToFile(output);
            }
        }
    }

    res.status(200).send('Successfully changed expression of bot: ' + req.query['id'])
    console.log(output);
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