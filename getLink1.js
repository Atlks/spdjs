
mdx = require('./conn.js');
connection = mdx.conn;
var fs = require("fs");

for (i = 1; i <= 1; i++) {
   // url = 'https://cn.pornhub.com/video?c=80&page=' + i;
    cateid = 24; cate='公众野战';
    page = i;
    fname = "hornhub" + "_cate" + cateid + "_page" + page + '.html';
    console.log(fname);
    var html = fs.readFileSync(fname, "utf8");
    getDetailLinkV2(html,cateid,cate);
}



function getDetailLinkV2(html, cateid, cate) {

    var fs = require("fs");



    const cheerio = require('cheerio')
    const $ = cheerio.load(html)
    var a_arr = $('li a[class=""]').toArray();
    console.log(a_arr)
  //  <div id="player" class="original mainPlayerDiv" data-video-id="219486801">
  var data-video-id = $('#player').atrr('data-video-id');
  
    for (item of a_arr) {
        console.log(item.attribs.href)
        console.log(item.attribs.title)

        var obj = {};
        obj.cateid = cateid; obj.cate = cate; 
        obj.LiAattribs = item.attribs;
        obj.detailurl = "";
        var obj2str = JSON.stringify(obj);
        connection.query('INSERT INTO 抓取数据记录(数据) VALUES(?)', [obj2str], (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
        })

    }



}



function getDetailLink(html) {

    var fs = require("fs");



    var html = fs.readFileSync('input.txt.html', "utf8");
    console.log(html);
    const cheerio = require('cheerio')
    const $ = cheerio.load(html)
    var a_arr = $('li a[class=""]').toArray();
    console.log(a_arr)

    for (item of a_arr) {
        console.log(item.attribs.href)
        console.log(item.attribs.title)

    }

}