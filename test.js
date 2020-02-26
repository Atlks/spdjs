// main
logmdx = require('./jsdk/log.js');
logger = logmdx.logger;
var fs = require("fs");


for (j = 1; j <= 200; j++)
  for (i = 1; i <= 2; i++) {
    // url = 'https://cn.pornhub.com/video?c=80&page=' + i;
    // cateid = 24; 
    cateid = j; cate = '';
    //cate='公众野战';
    page = i;
    fname = "D:\\prj\\dataCateTest\\hornhub" + "_cate" + cateid + "_page" + page + '.html';
    console.log(fname);
    logger.info(fname)

    if (fname.indexOf('.nopage') > 0)
      continue;
    try {
      var html = fs.readFileSync(fname, "utf8");
      if (html.indexOf('没发现页面') > 0)
        fs.renameSync(fname, fname + '.nopage')

    } catch (e) {
      console.log(e)
      logger.error(e)
    }

  }







var date1 = '2020/02/25 18:23:00';  //开始时间
var now = new Date();    //结束时间
var date3 = now.getTime() - new Date(date1).getTime();   //时间差的毫秒数    
//计算出相差天数
var min = Math.floor(date3 / (1000 * 60))
console.log(min)

console.log(parseInt("1"))

s = '/view_video.php?viewkey=ph5cbc7af265355';
index = s.indexOf('viewkey=');
pageid = s.substring(index + 8);
console.log(pageid)




jsonstr = '[{"urlid":"/view_video.php?viewkey=1008110901"},{"urlid":"/view_video.php?viewkey=1027011661"},{"urlid":"/view_video.php?viewkey=1031923747"},{"urlid":"/view_video.php?viewkey=1032854684"},{"urlid":"/view_video.php?viewkey=1038116855"}]'
jsonarr = JSON.parse(jsonstr)
for (it of jsonarr) {
  url = 'https://cn.pornhub.com' + it.urlid
  console.log(url)
}