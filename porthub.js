
console.log("--")
var url = 'https://cn.pornhub.com/video?c=80&page=1';

//  trouble 
// node.js pachon spider
// const https = require("https");

cateid=24

console.log("fi");

for(i=1;i<=2;i++)
{
  url = 'https://cn.pornhub.com/video?c='+24+'&page='+i;
  getDetail(url,cateid,i);
}

function getDetail(url,cateid,page)
{
  const request = require('request');
  //console.log   "user-agent","Mozilla/5.0"
  request(url, { headers: { 'User-Agent': "Mozilla/5.0" } }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(res);
    //  console.log(body);
  
  
      var fs = require("fs");
  
      console.log("准备写入文件");
      //console.log(body);
  
      fname="hornhub"+"_cate"+cateid+"_page"+page+   '.html';
      console.log(fname);
      fs.writeFileSync(fname, body);
  
  
      const cheerio = require('cheerio')
      const $ = cheerio.load(body)
      var a_arr = $('li a[class=""]').toArray();
    console.log(a_arr)
      //$('li').toArray()
  
  
  });

}




  
function intervalFunc() {
  console.log('Cant stop me now!');
}

//setInterval(intervalFunc, 1500);
