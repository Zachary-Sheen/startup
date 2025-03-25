const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function createSocket(server){
    const wss = new WebSocketServer({ noServer: true });
    const clients = {};

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
          wss.emit('connection', ws, request);
        });
      });
    
    wss.on('connection', function connection(ws, request) {
        const id = uuid.v4();
        clients[id] = {alive: true, ws: ws};

        //forwarding message to all clients
        ws.on('message', function message(msg) {
            Object.keys(clients).forEach(key => {
                clients[key].send(msg);
            });
        })
        //remove client on close
        ws.on('close', function close() {
            delete clients[id];
        });
        
        //Respond to pong
        ws.on('pong', function alive() {
            ws.alive = true;
        })
    });

    setInterval(() => {
        clients.forEach(client => {
            if(!client.alive)
            {
                client.ws.terminate();
                delete clients[client.id];
            }
            else{
                client.alive = false;
                client.ws.ping();
            }
        });
    }, 10000);
}

module.exports = createSocket;
