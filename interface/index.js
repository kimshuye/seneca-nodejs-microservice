//interface service
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