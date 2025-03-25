const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function createSocket(server){
    const wss = new WebSocketServer({ server });
    const clients = {};

    // server.on('upgrade', (request, socket, head) => {
    //     wss.handleUpgrade(request, socket, head, function done(ws) {
    //       wss.emit('connection', ws, request);
    //     });
    //   });
    
    wss.on('connection', function connection(ws, request) {
        // const id = uuid.v4();
        // clients[id] = {alive: true, ws: ws};

        //forwarding message to all clients
        ws.on('message', function message(msg) {
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN && client !== ws) {
                    client.send(msg);
                }
            });
        })
        //remove client on close
        ws.on('close', function close() {
            wss.terminate();
        });
        
        //Respond to pong
        ws.on('pong', function alive() {
            ws.isAlive = true;
        })
    });

    setInterval(() => {
        clients.forEach(client => {
            if (client.isAlive === false) {
                return client.terminate();
            }
            client.isAlive = false;
            client.ping();
        });
    }, 10000);
}

module.exports = createSocket;
