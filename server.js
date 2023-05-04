const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const giphy = require('giphy')('DHMRnWj25U9Xolkv4dhEHTUTRZs9kD7K')
const multer  = require('multer')

var db, collection;

const url = "mongodb+srv://ahachey17:ABC123@exppersonalapp.o8tuwam.mongodb.net/?retryWrites=true&w=majority";
const dbName = "exppersonalapp";


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })




app.listen(4000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.use('/a',express.static('/b'));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
//everything above boiler plate
app.get('/', (req, res) => {
  //go into db college get messgaes in an array
  db.collection('messages').find().toArray((err, msgResult) => {
    if (err) return console.log(err)
    //pass messages into index.ejs:

    db.collection('comments').find().toArray((err, commentResult) => {
      if (err) return console.log(err)
      //pass messages into index.ejs:
      res.render("index.ejs", {messages: msgResult, comments: commentResult});
  
    })

  })


   
})

//w.e stored in req input we get the doc that has body na
app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({name: req.body.name, thumbUp: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    //sent something to database, to retrieve get request then refresh:
    res.redirect('/')
  })
})

app.post('/comments', (req, res) => {
  db.collection('comments').insertOne({name: req.body.name, comment: req.body.comment}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    //sent something to database, to retrieve get request then refresh:
    res.redirect('/')
  })
})



app.put('/messages/thumbUp', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.put('/comments', (req, res) => {
  db.collection('comments').findOneAndUpdate({name: req.body.name, comment: req.body.comment}, {
    $set: {
      name: "name",
      comment: "comment"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})
