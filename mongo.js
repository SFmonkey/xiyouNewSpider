var mongoose = require("mongoose");

var options = {  
		server: {
			auto_reconnect: true,
			poolSize: 5,
			useMongoClient: true
		}
	};

mongoose.connect('mongodb://127.0.0.1:27017/news', options, function(err, res){
	if(err)
		console.log(err);
});

var db = mongoose.connection;

var mongooseSchema = new mongoose.Schema({
    seq : {type: Number},
    title : {type: String},
	article : {type: String}
});

var mongooseSchema_score = new mongoose.Schema({
    username : {type: String},
	password : {type: String},
	name : {type: String},
	info : {type: String},
	json : {type: String}
});

var mongooseSchema_schedule = new mongoose.Schema({
    nickname : {type: String},
	content : {type: String}
});

var mongooseSchema_flyBird = new mongoose.Schema({
    name : {type: String},
	score : {type: Number}
});

mongooseSchema.statics.findbyId = function(username, callback) {
    return this.model('news').find({username: username}, callback);
};

var mongooseModel = db.model('news', mongooseSchema);
var mongooseModel_score = db.model('score', mongooseSchema_score);
var mongooseModel_schedule = db.model('schedule', mongooseSchema_schedule);
var mongooseModel_flyBird = db.model('flyBird', mongooseSchema_flyBird);

var add = function(doc, callback){
	mongooseModel.create(doc, function(error){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('save ' + doc.username);
	    }
	    if(callback)
	    	callback();
	    // db.close();
	});
};

var findName = function(username, callback){
	mongooseModel.findbyId(username, function(error, result){
		if(error)
		{
			console.log(error);
			callback("Server Error",error);
			return;
		}
		callback(false,result);
		// db.close();
	});
}

var update = function(username, newData, callback){
	mongooseModel_score.update(
		{username: username},
		{$set : newData},
		{upsert : true},
		function(err){
			if(err)
				console.log(err);
			if(callback)
				callback();
		}
	);
}

var add_schedule = function(doc, callback){
	mongooseModel_schedule.create(doc, function(error){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('save ' + doc.username);
	    }
	    if(callback)
	    	callback();
	    // db.close();
	});
};

var add_flyBird = function(doc, callback){
	mongooseModel_flyBird.create(doc, function(error){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('save ' + doc.username);
	    }
	    if(callback)
	    	callback();
	    // db.close();
	});
};

var getAllUser = function(callback){
	mongooseModel.find({},{username : 1, password : 1, _id : 0},callback);
}


exports.getAllUser = getAllUser;
exports.add = add;
exports.findName = findName;
exports.update = update;
exports.add_schedule = add_schedule;
exports.add_flyBird = add_flyBird;
exports.model = mongooseModel;
exports.mongooseModel_score = mongooseModel_score;
exports.mongooseModel_schedule = mongooseModel_schedule;