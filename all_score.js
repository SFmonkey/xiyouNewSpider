var request = require("request");
var iconv = require('iconv-lite');
var cheerio = require("cheerio");

function getScores (username, name, session, callback) {

    var url = "http://222.24.62.120/xscjcx.aspx?gnmkdm=N121605&"+
					"xh=" + username + "&xm=" + encodeURI(name);;
	var form = {
		__EVENTTARGET: "",
		__EVENTARGUMENT: "",
		__VIEWSTATE: viewstate,
		hidLanguage: "",
		ddlXN:"",
		ddlXQ:"",
		ddl_kcxz:"",
		btn_zcj:"历年成绩"
	};

	request(
	{
		url: url,
		method: "POST",
		encoding: null,
		headers: {
			Referer: "http://222.24.62.120/xs_main.aspx?xh=" + username,
			Cookie: session
		},
		form : form
	},
	function(err, res, body){
		if(err)
		{
			callback("Server Error",err);
			return;
		}
		if(Math.floor(res.statusCode / 100) === 3)
		{
			callback("Session Out");
			return;
		}
		body = iconv.decode(body, "GB2312").toString();
        var $ = cheerio.load(body);
        console.log(body)
		// var allviewstate = $("input[name='__VIEWSTATE']").val();
		//console.log(allviewstate);
		// var newviewstate = viewstateScores(allviewstate);
		//console.log(JSON.stringify(newviewstate));
		// mongo.update(username, {json: JSON.stringify(newviewstate)});
		// console.log("json " + username);
		// callback(false, newviewstate);
	}
	);

}

module.exports = getScores;