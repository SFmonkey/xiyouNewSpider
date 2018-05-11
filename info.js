//查看学生信息
var request = require("request");
var iconv = require('iconv-lite');
var cheerio = require("cheerio");

function getInfo (username, password, session, callback) {

    var url = "http://222.24.62.120/xsgrxx.aspx?gnmkdm=N121501&xh="+
                username+"&xm="+encodeURI(username);
    // console.log("request : url " + url + " rederer: " + "http://222.24.62.120/xs_main.aspx?xh=" + username);
    request(
    {
        url: url,
        method: "GET",
        encoding: null,
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
        body = iconv.decode(body, "GB2312").toString();
        // console.log(body);
        var $ = cheerio.load(body);
        var data = {};
        data.username = $("#xh").text();
        data.name = $("#xm").text();
        data.sex = $("#lbl_xb").text();
        data.brithday = $("#lbl_csrq").text();
        data.college = $("#lbl_xy").text();
        data.class = $("#lbl_xzb").text();
        callback({tag:200, data:data});
    }
    );
}

module.exports = getInfo;