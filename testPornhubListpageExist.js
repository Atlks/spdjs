
logmdx = require('./jsdk/log.js');
logger = logmdx.logger;
logger.info("this is a info msg");


//'https://cn.pornhub.com/video?c='+j+'&page='+i;

let set = new Set(); //或者 new Set(null);
for(i=1;i<=200;i++)
{
  cateid=i;
  url = 'https://cn.pornhub.com/video?c='+cateid+'&page=2';
  getDetail(url,cateid,2);
}

console.log(JSON.stringify(set))

logger.info(JSON.stringify(set));

function getDetail(url,cateid,page)
{
  logger.info("this is a info msg"+url);
  const request = require('request');
  //console.log   "user-agent","Mozilla/5.0"
  request(url, { headers: { 'User-Agent': "Mozilla/5.0" } }, (err, res, body) => {
      if (err) { return console.log(err); }

      set.add(cateid);
      console.log(res);
    //  console.log(body);
  
  
      var fs = require("fs");
  
      console.log("准备写入文件");
      //console.log(body);
  
      fname="D:\\prj\\data\\hornhub"+"_cate"+cateid+"_page"+page+   '.html';
      console.log(fname);
      fs.writeFileSync(fname, body);
  
  
      const cheerio = require('cheerio')
      const $ = cheerio.load(body)
      var a_arr = $('li a[class=""]').toArray();
    console.log(a_arr)
      //$('li').toArray()
  
  
  });

}
