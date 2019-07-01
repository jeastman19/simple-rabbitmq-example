var amqp = require('amqplib');

amqp.connect('amqp://localhost').then(function (conn) {
    return conn.createChannel().then(function (ch) {
        var q = 'hello';
        // var msg = 'Hello World!';
        var data = [{
            id: 1,
            firstname: 'Jorge',
            lastname: 'Eastman',
            edge: 53
        }]

        var ok = ch.assertQueue(q, {
            durable: false
        });

        return ok.then(function (_qok) {
            let msg = JSON.stringify( data )
            ch.sendToQueue( q, new Buffer.from( msg ) );
            console.log(Buffer.from(msg));
            console.log(" [x] Sent '%s'", msg);
            return ch.close();
        });
    }).finally(function () {
        conn.close();
    });
}).catch(console.warn);