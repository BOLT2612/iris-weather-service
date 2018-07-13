'use strict'
const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

const APIKEY = process.env.OPENWEATHERMAP_APIKEY
console.log("APIKEY=",APIKEY)

server.listen();  // no more hardcode port 3010

server.on('listening', function() {
  console.log(`IRIS-Weather is listening on ${server.address().port} in ${service.get('env')} mode.`);

  const announce = () => {
    request.put(`http://127.0.0.1:3000/service/weather/${server.address().port}`, (err, res) => {
      if (err) {
        console.log(err);
        console.log("Error connecting to Iris");
      } else {
        console.log("IRIS-Weather service up!")
      }
      //console.log(res.body);
    })
  };

announce();
setInterval(announce, 15*1000);

})