const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function createSocket(server){
    const wss = new WebSocketServer({ server });
    
    wss.on('connection', function connection(ws, request) {
        ws.on('message', function message(msg) {
            console.log('received: %s', msg);
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN && client !== ws) {
                    console.log('forwarding message to client');
                    client.send(msg);
                }
            });
        })
        //remove client on close
        ws.on('close', function close() {
            console.log('Client disconnected');
        });
        
        //Respond to pong
        ws.on('pong', function alive() {
            ws.isAlive = true;
        })
    });

    setInterval(() => {
        console.log("Checking if clients are alive");
        // console.log(Object.values(wss.clients));
        wss.clients.forEach(client => {
            console.log("Is this client alive? " + client.isAlive);
            if (client.isAlive === false) {
                return client.terminate();
            }
            client.isAlive = false;
            client.ping();
        });
    }, 30000);
}

module.exports = { createSocket };
