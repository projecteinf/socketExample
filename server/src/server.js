const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const documents = {};

http.listen(4444, () => {
    console.log('Listening on port 4444');
  });

io.on("connection", socket => {
    let previousId;

    io.emit("documents", Object.keys(documents));
    console.log(`Socket ${socket.id} has connected`);


    socket.on("getDoc", docId => {
        safeJoin(docId);
        socket.emit("document", documents[docId]);
    });

    socket.on("addDoc", doc => {
        documents[doc.id] = doc;
        safeJoin(doc.id);
        io.emit("documents", Object.keys(documents));
        socket.emit("document", doc);
        /*
            Note the difference between socket.emit() and io.emit() - 
            the socket version is for emitting back to only initiating the client, 
            the io version is for emitting to everyone connected to our server.
        */
    });
    
    socket.on("editDoc", doc => {
        documents[doc.id] = doc;
        socket.to(doc.id).emit("document", doc);
    });

    
    const safeJoin = currentId => {
        socket.leave(previousId);
        socket.join(currentId, () => console.log(`Socket ${socket.id} joined from ${currentId}`));
        previousId = currentId;
    }
});