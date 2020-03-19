/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  // let message = req.query.message || req.body.message || 'Hello World!111';


  var url = require('url');
  var q = url.parse(req.url, true).query;
  if (q.rss == 'flw') {
    mod = require('./flwUrl2rss.js');

    mod.feilonveo2rss().then(rzt => {
      console.log(rzt);//throw 5;
      res.status(200).send(rzt);
    });
  }
  else
  {
    res.status(200).send('ok');
  }


  // message = await mod.feilonveo2rss();
  // console.log(message);

  //  throw 5;



};