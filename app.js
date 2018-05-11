const express = require('express')
const app = express()
const mongo = require("./mongo");
const login = require("./login");
const getImg = require("./img");

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

app.get('/article',function (req, res) {
    var query = req.query.seq;
    mongo.model.findOne({'seq':query},function(i,e){
        res.send({data:e.article})
    })
})

//登陆
app.get('/login', function(req, res){
	var username = req.query.username;
	var password = req.query.password;
	var session = req.query.session;
	var verCode = req.query.verCode;
	console.log(username,password);
	login(username, password, verCode, session, function(result){
		res.send(result);
	});
});

app.get('/img', function(req, res){
    var username = req.query.username;
    var name = req.query.username;
	var session = req.query.session;
	getImg(username, name,session,function(result){
        res.send(result)
    })
});

app.listen(3000)