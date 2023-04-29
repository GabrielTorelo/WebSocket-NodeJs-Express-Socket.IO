import express from 'express';
import socketIO from 'socket.io';
import path from 'path';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const io = new socketIO.Server(httpServer);

app.use(express.static(path.resolve(__dirname, '..', 'public')));

io.on('connection', (socket) => {
    console.log(`New Connection: ${socket.id}`);
    
    socket.on('message', message => {
        socket.emit('received', `Mensagem Recebida! Mensagem: ${message}`);
    })
})

httpServer.listen(5000);