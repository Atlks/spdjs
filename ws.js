const WebSocket = require('ws');

// npm install ws 
// npm install openssl-self-signed-certificate 
// node /data/ws.js
var https = require('https');
var selfSigned = require('openssl-self-signed-certificate');

var options = {
  key: selfSigned.key,
  cert: selfSigned.cert
};

console.log(options);

// 创建request请求监听器
const processRequest = (req, res) => {
  res.writeHead(200);
  res.end('ok,u r already receive cert,u can test WebSockets!\n');
};

const server = https.createServer(options, processRequest).listen(8888);
//console.log(`HTTPS started on port ${port + 1} (dev only).`);
const wss = new WebSocket.Server({ server });

wss.broadcast = function broadcast(msg) {      //服务端广播消息
  wss.clients.forEach(function each(client) {
    try {
      if (client.readyState == WebSocket.OPEN) {
        client.send(msg);
      }
    } catch (e) {
      console.log('received: %s', e);
    }

  });
  //end foreach
}


global.conns = new Array();
// {method:"testsend",msg:{"aa":1111}}
wss.on('connection', function connection(ws) {
  global.conns.push(ws);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    try {
      var json = eval('(' + message + ')');
      if (json.method == "testsend") {
        wss.broadcast(json.msg);
        global.conns.forEach((wsConn, i) => {
          //     console.log(v);
          try {

            var retstr = JSON.stringify(json.msg);
            console.log('conns .forEach send:' + retstr);
            wsConn.send(retstr);
          } catch (e) {
            wsConn.send('except:' + e);
          }


        }
        );
        //end foreach


        //end if 

      }
      else
        throw "cant find method ";


    } catch (e) {

      ws.send('except:' + e);
    }

  });

  ws.send('conn ok');
});
//end wss.conn 
//wss.broadcast();
console.log("fff")