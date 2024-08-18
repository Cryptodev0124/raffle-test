import { WebSocket, WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 8080 });

const users = new Set();

server.on('connection', (socket) => {
  const clientId = generateUniqueId();
  users.add(clientId);
  broadcast({ type: 'onlined', count: users.size });

  socket.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'join') {
      users.add(clientId);
      broadcast({ type: 'onlined', count: users.size });
    } else if (data.type === 'leave') {
      users.delete(clientId);
      broadcast({ type: 'onlined', count: users.size });
    }
  });

  socket.on('close', () => {
    users.delete(clientId);
    broadcast({ type: 'onlined', count: users.size });
  });
});

function broadcast(data) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}
