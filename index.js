var superagent = require('superagent'); 
var cheerio = require('cheerio');
var async = require('async');
const mongo = require("./mongo");

console.log('爬虫程序开始运行......');

var pageUrls = [];

function transforImg(html){  
    var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){  
    var match = match.replace(/src=\"\.\.\/\.\.\//gi, 'src=\"http://news.xupt.edu.cn/').replace(/width=[\'"]+[0-9]+[\'"]+/gi,'width="100%"').replace(/height=[\'"]+[0-9]+[\'"]+/gi,'height="auto"');
    return match;  
});  
return newContent;  
} 

superagent
    .post('http://www.xiyou.edu.cn/')
    .end(function(err, res){  
        
        // 请求返回后的处理
        
        var $ = cheerio.load(res.text);
        $('.conMid_ul2 li a').each(function(i,e){
            pageUrls.push($(e).attr('href'));
        })

        pageUrls.forEach(function(pageUrl, idx){
            superagent.get(pageUrl)
                .end(function(err,res){
                    console.log('fetch ' + pageUrl + ' successful');
                    // 常规的错误处理
                    if (err) {
                        console.log(err);
                    }
                    // pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
                    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                    // 剩下就都是 jquery 的内容了
                    var $ = cheerio.load(res.text);
                    var title = $('#nrys div:first-child').text()
                    var article = transforImg($($('.nrzwys')[0]).text());
                    mongo.add({seq:idx,title:title,article: article});
            })
        })
    });