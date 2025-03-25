const GameEvent = {
    System: 'system',
    End: 'leaveChat',
    Start: 'enterChat',
  };

class EventMessage {
    constructor(from, event, type, data){
        this.from = from;
        this.type = type;
        this.data = data;
    }
}

class ChatNotifier {
    events = [];
    handlers = [];
    constructor(){
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = () => {
            console.log('New WebSocket connection established');
            this.socket.send(sendEvent(EventMessage("chat", GameEvent.Start, 'User has entered the chat')));
        }
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.receiveEvent(data);
        }
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
            this.socket.send(sendEvent(EventMessage("chat", GameEvent.End, 'User has left the chat')));
        }
    }
    addHandler(handler){
        this.handlers.push(handler);
    }
    removeHandler(handler){
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    receiveEvent(event){
        this.events.push(event);
        this.handlers.forEach(handler => handler(event));
    }
    sendEvent(event){
        this.socket.send(JSON.stringify(event));
    }
}
const chatNotifier = new ChatNotifier();
export { chatNotifier, EventMessage };