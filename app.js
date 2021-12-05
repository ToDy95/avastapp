const express = require('express');
const Downloader = require("nodejs-file-downloader");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
var data = JSON.parse(fs.readFileSync('data.json'))
var path = require('path');
var mime = require('mime');
const http = require("http");
const autocannon = require('autocannon')
app.use(bodyParser());
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
// Assign route
app.get('/', (req, res) => {
  res.render('index.pug', {"data": data});
});

app.get('/add', (req, res) => {
  res.render('add.pug');
})

app.post('/add', (req, res) => {
    res.render('add.pug');
    let title = req.body.name;
    let details = req.body.details;
   
    data[title] = details;

    const strData = JSON.stringify(data)
    fs.writeFile('new-data.json', strData, function (err) {
      if (err) throw err;

      console.log("Added");
    })
   
  })

  app.get('/download', function(req, res){

    var file = __dirname + '/new-data.json';
  
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
  
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
  
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
  });

  app.get('/stats', (req, res) => {
  
    res.render("stats.pug")
   
  })

app.listen(3000, () => {
    console.log('App listening on port 3000');
  });