const GameEvent = {
    System: 'system',
    End: 'leave',
    Start: 'enter',
  };

class EventMessage {
    constructor(from, event, data){
        this.from = from;
        this.event = event;
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
            if (this.username) {
                this.sendEvent(new EventMessage(this.username, GameEvent.Start, `${this.username} has entered the chat`));
            }
        }
        this.socket.onmessage = async (event) => {
            if (event.data instanceof Blob) { //IDK WHY it is a blob
                // Convert Blob to text
                const text = await event.data.text();
                const data = JSON.parse(text);
                console.log('Received message:', data);
                this.receiveEvent(data);
            } else {
                // Handle non-Blob data (e.g., plain JSON string)
                const data = JSON.parse(event.data);
                console.log('Received message:', data);
                this.receiveEvent(data);
            }
        }
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
            if (this.username) {
                this.receiveEvent(new EventMessage(this.username, GameEvent.End, `${this.username} has left the chat`));
            }
        }
    }
    setUsername(username) {
        console.log(`Username set to: ${username}`);
        this.username = username;

        // Send an "enter" event if the WebSocket is already open
        if (this.socket.readyState === WebSocket.OPEN) {
            this.sendEvent(new EventMessage(this.username, GameEvent.Start, `${this.username} has entered the chat`));
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