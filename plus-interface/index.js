//hello service
const seneca = require('seneca')();
let hello = (msg, reply) => {
    reply(null, {answer: ('Hello ' + msg.name)})
};

seneca.add('service:hello', hello).listen();