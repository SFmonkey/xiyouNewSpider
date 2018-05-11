

var request = require("request");

function getImg (username, name,session,callback) {

    var url = "http://222.24.62.120/readimagexs.aspx?xh=" + username;
    var referer = "http://222.24.62.120/xsgrxx.aspx?gnmkdm=N121501&" +
                    "xh=" + username + "&xm=" + encodeURI(name);
    request(
    {
        url: url,
        method: "GET",
        // encoding: null,
        Accept : "image/webp,image/*,*/*;q=0.8",
        headers: {
            Referer: referer,
            Cookie: session
        }
    },function (err, res, body){
        console.log(res);
    }
    );
}


module.exports = getImg;


