var request = require("request");
var iconv = require('iconv-lite');
var cheerio = require("cheerio");
var mongo = require("./mongo");

function getSchedule (username, name, session, callback) {

    var name = name;
    // http://222.24.62.120/xskbcx.aspx?xh=04142129&xm=%C0%EE%D7%D3%BA%AD&gnmkdm=N121603
    var url = "http://222.24.62.120/xskbcx.aspx?gnmkdm=N121603&"+
                "xh=" + username + "&xm=" + encodeURI(name);;
    request(
    {
        url: url,
        method: "GET",
        encoding: null,
        // gzip: true,
        headers: {
            Referer: "http://222.24.62.120/xs_main.aspx?xh=" + username,
            Cookie: session
        }
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
        body = iconv.decode(body, "GB2312").toString('utf8');
        var $ = cheerio.load(body);
        var arr = $('#Table1 tbody').children();
        var arr_res = [];
        for(var i = 2; i < arr.length; i++){
            if(i%2 == 0){
                var arr_td = $(arr[i]).children()
                for(var j = 2; j < arr_td.length; j++){
                    if($(arr_td[j]).html() != '&#xA0;'){
                        arr_res.push($(arr_td[j]).text())
                    }
                }
            }
        }
        callback(arr_res);
    }

    );

}

module.exports = getSchedule;