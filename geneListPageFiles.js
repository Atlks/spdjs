logmdx = require('./jsdk/log.js');
logger = logmdx.logger;
console.log("--")

require('chromedriver'); //导入chrome浏览器 driver

var webdriver = require('selenium-webdriver'); //导入selenium 库

var driver = new webdriver.Builder().forBrowser('chrome').build(); //创建一个chrome 浏览器实例

(async () => {


  var url = 'https://cn.pornhub.com/video?c=80&page=1';

  //  trouble 
  // node.js pachon spider
  // const https = require("https");

  //cateid = 24

  console.log("fi");

  //102,103,10,119,121,129,12,145,
  catids = '14,159,15,161,16,175,17,189,18,190,1,20,24,25,26,28,29,2,32,3,42,55,65,7,80,80,88,8,96,9'
  arr = catids.split(',')

  // for(j=1;j<200;j++)
  for (catid of arr) {
    for (i = 1; i <= 30; i++) {


      page=i
      fname = "D:\\prj\\data\\hornhub" + "_cate" + catid + "_page" + page + '.html';
      var fs = require("fs");
      if (fs.existsSync(fname)) {
        logger.info("file exist " + fname);
        continue;
      }
      url = 'https://cn.pornhub.com/video?c=' + catid + '&page=' + i;
      logger.info("file not exist,ready to catch ,url: " + url);
  
      htmlbody = await getDetailV2(url, catid, i);
      writefilex(catid, page, htmlbody)
    }
  }



})();

//web driver
function getDetailV2(url, cateid, page) {
  // const request = await require('request');
  //console.log   "user-agent","Mozilla/5.0"
  return new Promise(function (resolve, reject) {




    driver.get(url)

    driver.sleep(10 * 1000).then(function () { //等待20秒
      try {



        //  console.log(driver.getCurrentUrl());

        driver.getTitle().then(function (title) {
          console.log(title);
        });


        driver.getPageSource().then(function (getPageSource) {


          //  console.log(getPageSource);

          resolve(getPageSource);

        });

      } catch (e) {
        reject(e);
      }

      // driver.quit(); //关闭浏览器
    });




  });//  promiss end
}

function writefilex(cateid, page, body) {

  var fs = require("fs");

  console.log("准备写入文件");
  //console.log(body);

  fname = "D:\\prj\\data\\hornhub" + "_cate" + cateid + "_page" + page + '.html';

  var fs = require("fs");
  if (fs.existsSync(fname)) {
    logger.info("file exist " + fname);
    return;
  }

  logger.info("file not exist,ready to gene  " + fname);
  console.log(fname);
  fs.writeFileSync(fname, body);


}


function getDetail(url, cateid, page) {
  const request = require('request');
  //console.log   "user-agent","Mozilla/5.0"
  return new Promise(function (resolve, reject) {
    request(url, { headers: { 'User-Agent': "Mozilla/5.0" } }, (err, res, body) => {
      if (err) {
        // return console.log(err);
        reject(error);
      }
      console.log(res);
      //  console.log(body);


      var fs = require("fs");

      console.log("准备写入文件");
      //console.log(body);

      fname = "D:\\prj\\data\\hornhub" + "_cate" + cateid + "_page" + page + '.html';

      var fs = require("fs");
      if (fs.existsSync(fname)) {
        logger.info("file exist " + fname);
        return;
      }

      logger.info("file not exist,ready to gene  " + fname);
      console.log(fname);
      fs.writeFileSync(fname, body);


      const cheerio = require('cheerio')
      const $ = cheerio.load(body)
      var a_arr = $('li a[class=""]').toArray();
      console.log(a_arr)
      //$('li').toArray()
      resolve(body);

    });

  })
}





// function intervalFunc() {
//       console.log('Cant stop me now!');
//     }

//setInterval(intervalFunc, 1500);
