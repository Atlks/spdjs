
(async () => {
    logmdx = require('./jsdk/log.js');
    logger = logmdx.logger;
    logger.info("this is a info msg");
    mdx = require('./conn.js');
    connection = mdx.conn;

    query = require('./jsdk/mysql.js')

    const readline = require('readline');
    const fs = require('fs');


    
    sql = "select 	json_unquote (urlid) as urlid from  抓取数据记录  where (urlid is not null and json_unquote(json_extract( 其他扩展字段, '$.downed' ))='n' ) OR ( urlid is not null  and 其他扩展字段 is null ) or    (  urlid is not null  and json_extract( 其他扩展字段, '$.downed' ) is null )  order by id desc limit 9"
    logger.info(sql);
    let rows = await query(connection, sql)
    logger.info(rows);
    lists = JSON.stringify(rows);
    for (row of rows) {
        sql = " update 抓取数据记录 set 其他扩展字段 = json_set(其他扩展字段,'$.downed','y','$.downtime',NOW()) where json_unquote (urlid)='@urlid@' ";
        sql = sql.replace('@urlid@', row.urlid)
        logger.info(sql);
        let rzt = await query(connection, sql)
        logger.info(rzt);
    }

    

    var line;
    while (line = await reader.next()) {
        try {
            logger.info(line);
            
            let rzt = await query(connection, line)
            logger.info(rzt);

        } catch (e) {
            logger.error(e);
        }
    }


    // main().catch(error => console.log(error));

 
})();