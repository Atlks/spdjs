/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  // let message = req.query.message || req.body.message || 'Hello World!111';
  (async () => {


    mod = require('./flwUrl2rss.js');

    message = await mod.feilonveo2rss();
    console.log(message);
    res.status(200).send(message);
    //  throw 5;

  })();

};