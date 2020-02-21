logmdx = require('./jsdk/log.js');
logger = logmdx.logger;
logger.info("this is a info msg");
logger.error("this is a err msg");


var fs = require("fs");

for (i = 1; i <= 2; i++) {
    // url = 'https://cn.pornhub.com/video?c=80&page=' + i;
    cateid = 24; cate = '公众野战';
    page = i;
    fname = "hornhub" + "_cate" + cateid + "_page" + page + '.html';
    console.log(fname);
    var html = fs.readFileSync(fname, "utf8");
    getDetailLinkV2(html, cateid, cate);

}

console.log("Ff")

function getDetailLinkV2(html, cateid, cate) {

    var fs = require("fs");



    const cheerio = require('cheerio')
    const $ = cheerio.load(html)
    var a_arr = $('li a[class=""]').toArray();
    console.log(a_arr)
    //  <div id="player" class="original mainPlayerDiv" data-video-id="219486801">
    //var data-video-id = $('#player').atrr('data-video-id');

    for (item of a_arr) {
        console.log(item.attribs.href)
        console.log(item.attribs.title)

        var obj = {};
        obj.cateid = cateid; obj.cate = cate;
        obj.LiAattribs = item.attribs;
        obj.detailurl = "";
        var obj2str = JSON.stringify(obj);
        var detailUrl = 'https://cn.pornhub.com/' + item.attribs.href;
        var detailPgeid = getPageid(item.attribs.href);
        var detailfileSave = 'detailpage_view_video_' + detailPgeid + '.htm';
       
        downDetailpage(detailUrl, detailfileSave);


    }



}

function getPageid(url) {
    //   s='/view_video.php?viewkey=ph5cbc7af265355';
    s = url
    index = s.indexOf('viewkey=');
    pageid = s.substring(index + 8);
    //   console.log(pageid)
    return pageid;

}

function downDetailpage(url, detailfileSave) {

    var fs = require("fs");
    if (fs.existsSync(detailfileSave)) {
        logger.info("file exist " + detailfileSave);
        return;
    }


    logger.info("file  not exist " + detailfileSave);
    console.log('start dowe url' + detailUrl)
    const request = require('request');
    //console.log   "user-agent","Mozilla/5.0"
    request(url, { headers: { 'User-Agent': "Mozilla/5.0" } }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(res);
        //  console.log(body);


        var fs = require("fs");

        console.log("准备写入文件");
        //console.log(body);
        fs.exists(detailfileSave, function (exists) {
            //  console.log(exists ? "创建成功" : "创建失败");
            if (!exists)
                fs.writeFileSync(detailfileSave, body);
        });




        //     const cheerio = require('cheerio')
        //     const $ = cheerio.load(body)
        //     var a_arr = $('li a[class=""]').toArray();
        //   console.log(a_arr)
        //     //$('li').toArray()


    });
}
