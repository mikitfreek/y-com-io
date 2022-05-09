const express = require('express')
const WsServer = require('ws')
const { createServer } = require('http')

const app = express()
const server = createServer(app)

// const path = require('path')

// let url_id

function initWs() {
  const options = {
    noServer: true
  }

  return new WsServer.Server(options)
}

function initHttpServer(port) {
  // app.set('view engine', 'ejs')

  app.use(express.static(__dirname + '/dist'));

  // app.get('/r/:roomId', async(req, res) => {
  //   // req.params.roomId; // { roomId: '42' }
  //   console.log('id from url: ' + req.params.roomId)
  //   url_id = req.params.roomId
  //   res.redirect('back');
  // });

  server.listen(process.env.PORT || port, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT || port}`)
  })

  return app
}

// Import
const config = require('./config.json');

function initWebSocketServer(port = config.port) {
  initHttpServer(port)
  const wss = initWs()

  server.on('upgrade', async(req, socket, head) => {
    try {
      wss.handleUpgrade(req, socket, head, (ws) => {
        // Do something before firing the connected event
        wss.emit('connection', ws, req)
      })
    } catch(err) {
      // Socket uprade failed
      // Close socket and clean
      console.log('Socket upgrade failed', err)
      socket.destroy()
    }
  })

  return wss
}
const wss = initWebSocketServer()

wss.on('connection', async(ws, req) => {
  connect(ws, req)
  // console.log('url_id: ' + url_id)
})

const { v4: uuidv4 } = require('uuid')

const clients = {}
  
//////////////////////
//      LOGIC
//////////////////////

// Items
const baza = require('./items.json');

function connect(ws, req) {
  // TODO Load id from cookie on comeback
  const clientId = uuidv4();
  ws.id = clientId
  // check if another client has same name   
  // ws.id = req.headers['sec-websocket-key'];
  const clientIp = req.socket.remoteAddress;

  const clientData = {
    'id': clientId,
    'connection': ws,
    'ip': clientIp,
    'bucket': []
  }
  clients[clientId] = clientData

  // Connection payload
  const payLoad = {
    'method': 'connect',
    'clientId': clientId
  }
  ws.send(JSON.stringify(payLoad))


  // console.log('* >======== ' + clientName + ' ========>');
  console.log('New connection: '+ clientId);
  

  ws.on('message', function(msg) {
    const res = JSON.parse(msg) //.utf8Data

    

    // 
    if (res.method === 'request') {
      if (res.type === 'data') {
        // res.cat

        let data = baza[res.cat];

        const payLoad = {
          'method': 'resolve',
          'data': data
        }

        // let cl = JSON.parse(clients);
        // clients.forEach(c => {
        //   clients[c.id].connection.send(JSON.stringify(payLoad))
        // })
        ws.send(JSON.stringify(payLoad))
        
        console.log("here")
        // res.page
      }
      else if (res.type === 'bucket') {
        
      }
    }
  })

  // Connection close
  ws.on('close', function() {
    const clientId = ws.id

    delete clients[clientId]

    console.log('Connection close: ' + clientId)
  })
}
