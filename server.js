// express-api/server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const cors = require("cors");
const corsOption = {
    origin: '*',
};
var http = require("http");
const { db, insertUser, getData } = require('./db.js');
app.use(cors(corsOption));
app.use(express.json());
// app.use(bodyParser.json());

app.get('/api/getData', async (req, res) => {
    try {
        const data = await getData();
        console.log(data + 'inserver')
        res.status(200).send({ message: data });
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve data' });
    }
});

app.post('/api/createData', (req, res) => {
  console.log(req.body);
  const {bloodType, sicknesses, allergies, medications, emergencyContact} = req.body;
  insertUser(bloodType, sicknesses, allergies, medications, emergencyContact);
  res.status(200).send({messege:"Logged in Successfully"})
});


let server = http.createServer(app);

server.listen(PORT,() =>{
    console.log(`Server started at this ${PORT}`)
});
