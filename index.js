var express = require("express");
var cors = require("cors");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var app = express();
var port = 3560;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello worldsssssssss");
});

app.get("/api/students", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("friends");
    dbo
      .collection("bit")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
});

app.post("/api/students", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("friends");
    var myobj = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    dbo.collection("bit").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
