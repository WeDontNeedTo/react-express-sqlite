const express = require('express')
const config = require('config')
var sqlite3 = require('sqlite3').verbose();
const { User } = require('./modules/User')
var db = new sqlite3.Database('./mydb.db3');
db.serialize(function () {
   db.run("CREATE TABLE IF NOT EXISTS Users (userID BIGINT IDENTITY(1,1), email TEXT, password TEXT)");
});


const app = express()
app.use(express.json({ extented: true }))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {

   try {
      try {
         
         // todo query-funcs
         db.serialize(() => {
            db.all(`select * from Users`, (err, row) => {
               try {
                  console.log(row)
               }
               catch{
                  console.log('query error', err)
               }
            })
         })
      }
      catch (e) {
         console.log('query error -->', e)
      }
      app.listen(PORT, () => console.log(`Server is alive on port ${PORT}`))
   }
   catch (err) {

      return err;
   }


}

start()


