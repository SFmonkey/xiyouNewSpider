const express = require('express')
const app = express()
const mongo = require("./mongo");

// var a = mongo.find();

// console.log(a);

app.get('/', function (req, res) {
    var tran = [];
    mongo.model.find({},function(i,e){
        e.forEach(function(v){
            tran.push(v.article)
        })
        res.send(tran)
    });
})

app.get('/news',function (req, res) {
    var data = [];
    mongo.model.find({},function(i,e){
        e.forEach(function(v){
            data.push({seq:v.seq,title:v.title})
        })
        res.send({data:data})
    });
})
app.listen(3000)