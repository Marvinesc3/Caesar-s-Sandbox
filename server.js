var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
    users_id = [];
//specify the html we will use
app.use('/', express.static(__dirname + '/www'));
//bind the server to the 80 port
//server.listen(3000);//for local test
server.listen(/*process.env.PORT */ 3000);//publish to heroku
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
//console.log('server started on port'+process.env.PORT || 3000);
//handle the socket
const amount_of_rooms = 100;

 rooms = [];


 var Room = function () {

 };

 Room.prototype = {
     server: 0,
     players_names: [0],
     players_ids: [0],
     army_submit: [0],
     meleeX: [],
     meleeY: [],
     archerX: [],
     archerY: [],
     tankX: [],
     tankY: []
 };

 for (i = 0; i<amount_of_rooms; i++){
     let x = new Room();
     x.server = i;
     x.players_names = [];
     x.players_ids = [];
     x.army_submit = [];
     x.meleeX = [];
     x.meleeY = [];
     x.archerX = [];
     x.archerY = [];
     x.tankX = [];
     x.tankY = [];
     rooms.push(x);
 }

io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname, server) {
        users_id.push(socket.id);
        if (server.trim().length === 0) {
            let x = parseInt(Math.random() * 100);
            console.log(x);
            server = x;
            socket.join(x);
        }
        else {
            socket.join(server);
        }
        socket.server = server;

        rooms[socket.server].players_names.push(nickname);
        rooms[socket.server].players_ids.push(socket.id);
        rooms[socket.server].army_submit.push(false);
        console.log(rooms[socket.server].army_submit);

        console.log(rooms[server].players_names);
        console.log(rooms[server].players_ids);


        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess', server);
            console.log(socket.server);
            console.log( "me"+rooms[socket.server].players_ids.indexOf(socket.id));
            io.sockets.in(server).emit('system', nickname, rooms[socket.server].players_ids.length, 'login', rooms[socket.server].players_ids.indexOf(socket.id));
        }

    });
    socket.on('start_game',function () {
        // meleeX1 = [];
        // meleeY1 = [];
        // archerX1 = [];
        // archerY1 = [];
        // tankX1 = [];
        // tankY1 = [];
        // meleeX2 = [];
        // meleeY2 = [];
        // archerX2 = [];
        // archerY2 = [];
        // tankX2 = [];
        // tankY2 = [];
        // for (let i=0; i<40; i++) {
        //     if (i%2===0) {
        //         meleeX1.push(Math.random()*(1000));
        //         meleeY1.push(Math.random()*(700));
        //         meleeX2.push(Math.random()*(1000));
        //         meleeY2.push(Math.random()*(700));
        //     } else {
        //         archerX1.push(Math.random()*(1000));
        //         archerY1.push(Math.random()*(700));
        //         archerX2.push(Math.random()*(1000));
        //         archerY2.push(Math.random()*(700));
        //
        //     }
        // }
        // console.log(rooms[socket.server].players_names[0]+"  !  "+rooms[socket.server].players_names[1]);
        // io.sockets.in(socket.server).emit("draw_game", rooms[socket.server].players_ids[0],rooms[socket.server].players_ids[1],rooms[socket.server].players_names[0],rooms[socket.server].players_names[1],40,'blue','red',meleeX1,meleeY1,archerX1,archerY1,meleeX2,meleeY2,archerX2,archerY2 );
        console.log("this "+rooms[socket.server].players_ids.indexOf(socket.id));
        io.to(rooms[socket.server].players_ids[0]).emit("make army", 0);
        io.to(rooms[socket.server].players_ids[1]).emit("make army", 1);

       // io.sockets.in(socket.server).emit("make army",rooms[socket.server].players_ids.indexOf(socket.id));
    });
    socket.on("army_submitted", function (meleeX,meleeY,archerX,archerY,tankX,tankY) {
        //console.log(rooms[socket.server].players_ids.indexOf(socket.id));
        rooms[socket.server].army_submit[rooms[socket.server].players_ids.indexOf(socket.id)] = true;
        // socket.meleeX = meleeX;
        // socket.meleeY = meleeY;
        // socket.archerX = archerX;
        // socket.archerY = archerY;
        // socket.tankX = tankX;
        // socket.tankY = tankY;
        console.log("army_submitted");
        if(rooms[socket.server].players_ids.indexOf(socket.id)===0){

            if(rooms[socket.server].army_submit[1]===true) {
                io.to(rooms[socket.server].players_ids[0]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY);
                io.to(rooms[socket.server].players_ids[1]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], meleeX, meleeY, archerX, archerY, tankX, tankY);
            }
            else{
                rooms[socket.server].meleeX = meleeX;
                rooms[socket.server].meleeY = meleeY;
                rooms[socket.server].archerX = archerX;
                rooms[socket.server].archerY= archerY;
                rooms[socket.server].tankX = tankX;
                rooms[socket.server].tankY = tankY;
            }
        }
        if(rooms[socket.server].players_ids.indexOf(socket.id)===1){

            if(rooms[socket.server].army_submit[0]===true) {
                io.to(rooms[socket.server].players_ids[1]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], rooms[socket.server].meleeX, rooms[socket.server].meleeY, rooms[socket.server].archerX, rooms[socket.server].archerY, rooms[socket.server].tankX, rooms[socket.server].tankY);
                io.to(rooms[socket.server].players_ids[0]).emit("enemy army", rooms[socket.server].players_ids[0], rooms[socket.server].players_ids[1], rooms[socket.server].players_names[0], rooms[socket.server].players_names[1], meleeX, meleeY, archerX, archerY, tankX, tankY);
            }
            else{
                rooms[socket.server].meleeX = meleeX;
                rooms[socket.server].meleeY = meleeY;
                rooms[socket.server].archerX = archerX;
                rooms[socket.server].archerY= archerY;
                rooms[socket.server].tankX = tankX;
                rooms[socket.server].tankY = tankY;
            }
        }

    });
    //user leaves
    socket.on('disconnect',function(){
        if (socket.nickname != null) {
            console.log(socket.nickname+" disconnected");
            //users.splice(socket.userIndex, 1);
            io.sockets.in(socket.server).emit('system', socket.nickname, rooms[socket.server].players_ids.length-1, 'logout', rooms[socket.server].players_ids.indexOf(socket.id));
            users.splice(users.indexOf(socket.nickname), 1);
            console.log(rooms[socket.server].players_names);
            console.log(rooms[socket.server].players_ids);

            rooms[socket.server].players_ids.splice(rooms[socket.server].players_ids.indexOf(socket.id),1);
            rooms[socket.server].players_names.splice(rooms[socket.server].players_names.indexOf(socket.nickname),1);
            rooms[socket.server].army_submit.splice(rooms[socket.server].players_names.indexOf(socket.nickname),1);

            console.log("after");
            console.log(rooms[socket.server].players_names);
            console.log(rooms[socket.server].players_ids);


        }
    });

    //new message get
    socket.on('postMsg', function(msg, color,server) {
        socket.broadcast.to(server).emit('newMsg', socket.nickname, msg, color);
    });
});