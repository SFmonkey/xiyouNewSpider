var request = require("request");
const getInfo = require("./info");

function login (username, password, verCode, session, callback) {
	if (username == '' || password == '') {
        callback('Account Error');
        return;
    }

    var url = "http://222.24.62.120/default2.aspx";
    var data = {
    	'__VIEWSTATE': "dDwxNTMxMDk5Mzc0Ozs+lYSKnsl/mKGQ7CKkWFJpv0btUa8=",
		'txtUserName': username,
		'TextBox2': password,
        'txtSecretCode' : verCode,
		'RadioButtonList1': "%D1%A7%C9%FA",
		'Button1': "",
        'lbLanguage' : "",
        'hidPdrs' : "",
        'hidsc' : ""
    };

    request(
    {
    	url: url,
    	method: 'POST',
    	form: data,
        headers : {
            Referer: 'http://222.24.62.120/',
            Cookie: session
        }
    },
    function(err, res, body) {
    	if(err)
    	{
    		callback({tag:500,data:"Server Error"});
    		return;
    	}

        var ifSuccess = body.indexOf('Object moved');
        if (ifSuccess == -1) {
            callback({tag:400,data:'Please check your password or vercode'});
            return;
        }
        
        getInfo(username, password,session, function(res){
            callback(res);
        })
    }
    );
}

module.exports = login;