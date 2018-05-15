const express = require('express')
const app = express()
const mongo = require("./mongo");
const login = require("./login");
const getImg = require("./img");
const getScore = require("./score");
const getSchedule = require("./schedule");
// const getAllScore = require("./all_score")

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

app.get('/score', function(req, res){
    var username = req.query.username;
    var name = req.query.name;
	var session = req.query.session;
	getScore(username,name,session,function(result){
        res.send(result)
    })
});

app.get('/scoreAll', function(req, res){
    var username = req.query.username;
	mongo.mongooseModel_score.find({username:username},function(i,e){
        res.send({data:e})
    });
});

app.get('/schedule', function(req, res){
    var username = req.query.username;
    var name = req.query.name;
    var session = req.query.session;
	getSchedule(username,name,session,function(result){
        res.send(result)
    })
});

app.get('/publish', function(req, res){
    var nickname = req.query.nickname;
    var content = req.query.content;
	mongo.add_schedule({nickname:nickname, content:content},function(){
    });
    res.send('success')
});

app.get('/write', function(req, res){
    var data = [];
    var nickname = req.query.nickname;
    var content = req.query.content;
	mongo.mongooseModel_schedule.find({},function(i,e){
        e.forEach(function(v){
            data.unshift({nickname:v.nickname,content:v.content})
        })
        res.send({data:data})
    });
});

app.get('/flappy/send', function(req, res){
    var name = req.query.name;
    var score = req.query.score;
	mongo.add_flyBird({name:name, score:score},function(){
    });
    res.send('success')
});

app.listen(3000)