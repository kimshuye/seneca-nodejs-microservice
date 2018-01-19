#เขียน Microservice ด้วย Node.js และ Seneca.js

#วิธีใช้งาน Seneca.js ช่วยให้สามารถสื่อสารระหว่าง Microservice ได้ดีขึ้น

#แนวคิดของ Seneca.js

จากปัญหาข้างบนจึงมีคนคิดขึ้นมาได้ว่าถ้างั้นแทนที่เราจะส่งต้องข้อความไปบอกทีละ Microservice ว่าทำนั่นแล้วนะทำนี่แล้วนะ เราก็ให้ Microservice ของเราตะโกนไปว่าฉันทำเสร็จแล้วนะ ทีนี้ Microservice ตัวไหนที่รออยู่ก็สามารถรับข้อความไปได้เลยไม่ต้องไล่ส่งข้อความไปบอกทีละคนอยู่ ถ้าต่อไปมี Microservice อื่นที่ต้องใช้ข้อความนี้ก็เอามาประกอบได้เลยไม่ต้องไปแก้อันเก่าแค่รอรับข้อความก็พอ ซึ่งก็คือ Seneca.jsนั่นเอง Seneca.js เนี่ยเค้าบอกว่าตัวเองคือ

Seneca is a microservices toolkit for Node.js. It helps you write clean, organized code that you can scale and deploy at any time.

แปลไทยก็ประมาณว่า seneca คือเครื่องมือที่ช่วยให้สถาปัตยกรรม Microservice ที่ implement ด้วย Node.js ชีวิตดีขึ้นว่างั้นเถอะ (สรุปเอาดื้อๆ) มันจะดีอย่างที่เค้าว่าหรือเปล่า ต่อไปเรามาลองใช้ Seneca.js กันนะครับ โดยเพื่อความสมจริง เราจะทำ Microservice 2 ตัวดังนี้ 

1. interface รับชื่อมาจาก Microservice

2. hello เอาชื่อมาส่งข้อความกลับไปว่า Hello ‘...'


Install

//interface service

mkdir interface

cd interface

npm init

npm install seneca express body-parser --save



//plus service

mkdir plus

cd plus

npm init

npm install seneca --save

Implement Seneca


//interface-service

const app = require('express')(),

      seneca = require('seneca')();

                    
app.get('/', (req, res) => {

   let name = req.query.name;

   seneca.client().act({service: 'hello', name: name}, (err, result) => {

       if (err) return console.error(err)

       res.send(result.answer)

    });

})

app.listen(3000, function() {

    console.log('Listening on port: 3000');

});


จาก Code ข้างบนจะเห็นว่าก็ใช้ express ธรรมดาสิ่งที่อยากให้โฟกัสก็คือ


seneca.client().act({service: 'hello', name: name}, (err, result) => {

	if (err) return console.error(err)

    res.send(result.answer)

});


คำสั่ง

seneca.client().act({service: 'hello', name: name}); 


คือการสั่งให้ seneca ตะโกนออกไปนะครับ ซึ่งค่าที่ส่งไปเป็นแบบ key-value


(err, result) => {

    if (err) return console.error(err)

    res.send(result.answer)

});


คือการ handle สิ่งที่ตอบกลับมา 

ต่อมาเราจะมาดูในส่วนของ Microservice hello กันนะครับ


//hello service

const seneca = require('seneca')();

let hello = (msg, reply) => {

    reply(null, {answer: ('Hello ' + msg.name)})

};


seneca.add('service:hello', hello).listen();


คำสั่ง


seneca.add('service:hello', hello).listen(); 


คือการบอกให้รอฟังสิ่งที่ service อื่นตะโกนมานะครับโดยจะต้อง match กับ


'service:hello'


เท่านั้นถึงจะทำงาน แล้วเราก็ส่ง function hello เข้าไปเพียงแค่นี้พอเราลองรัน service ทั้งสองตัวและเรียกไปที่ http://localhost:3000?name=noob ก็จะมี response ตอบกลับมาตามรูปนะจ๊ะ


เขียน Microservice ด้วย Node.js และ Seneca.js


หากต้องการ fix port, protocol, ip ก็สามารถทำได้ดังนี้


//interface service

.client({ port: 8080, host: '192.168.0.2',type: 'http' })


//hello service

.listen({ port: 8080, host: '192.168.0.2',type: 'http' })



นอกจากนี้ seneca.js ยังมีลูกเล่น และ plugin 

อีกเยอะแยะมากมายบรรยายไม่หมดเลยนะครับโดยสามารถเข้าไปดูเพิ่มเติมได้ที่ http://senecajs.org/

ref: https://noob-studio.github.io/2018/01/18/seneca-nodejs-microservice/

Posted by ป๋าแพะ on January 18, 2018

