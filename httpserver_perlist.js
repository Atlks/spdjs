


logmdx = require('./jsdk/log.js');
logger = logmdx.logger;
logger.info("this is a info msg");

mdx = require('./conn.js');
connection = mdx.conn;

query = require('./jsdk/mysql.js')

//   node   D:\prj\spdJs\httpserver_perlist.js

// connection.query(, (err, results) => {
//     if (err) {
//         console.log(err);
//         logger.error(err);
//     }
//     logger.info(results);
//     String lists=JSON.stringify(results);
//     startServer(lists);
//  //   process.exit();
// })


// function startServer(lists) {


// }





t=parseInt('5')

var http = require('http');

//create a server object:
http.createServer(function (req, res) {

    (async () => {

        try{

          //  json_unquote (json_extract ( 其他扩展字段, '$.downed' ))
            sql = "select 	json_unquote (urlid) as urlid from  抓取数据记录  where urlid is not null and json_unquote(json_extract( 其他扩展字段, '$.downed' ))='n'  limit 9"
            let rows = await query(connection, sql)
            lists = JSON.stringify(rows);
            for( row of rows)
            {
                sql=" update 抓取数据记录 set 其他扩展字段 = json_set(其他扩展字段,'$.downed','y','$.downtime',NOW()) where json_unquote (urlid)='@urlid@' ";
                sql=sql.replace('@urlid@',row.urlid)
                logger.info(sql);
                let rzt = await query(connection, sql)
                logger.info(rzt);
            }

            res.write(lists); //write a response to the client
            res.end(); //end the response
        }catch(e)
        {
            logger.error(e);
            res.write( e.message);
          //  res.write( JSON.stringify( e )); //write a response to the client
            res.end(); //end the response
        }

       

    })();
}).listen(888); //the server object listens on port 8080

