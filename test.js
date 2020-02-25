// main



var date1= '2020/02/25 18:23:00';  //开始时间
var now = new Date();    //结束时间
var date3 = now.getTime() - new Date(date1).getTime();   //时间差的毫秒数    
//计算出相差天数
var min=Math.floor(date3/( 1000*60))
console.log(min)

console.log( parseInt("1") )

  s='/view_video.php?viewkey=ph5cbc7af265355';
index=s.indexOf('viewkey=');
pageid=s.substring(index+8);
console.log(pageid)




jsonstr='[{"urlid":"/view_video.php?viewkey=1008110901"},{"urlid":"/view_video.php?viewkey=1027011661"},{"urlid":"/view_video.php?viewkey=1031923747"},{"urlid":"/view_video.php?viewkey=1032854684"},{"urlid":"/view_video.php?viewkey=1038116855"}]'
jsonarr=JSON.parse(jsonstr)
for( it of jsonarr){
  url='https://cn.pornhub.com'+it.urlid
  console.log(url)
}