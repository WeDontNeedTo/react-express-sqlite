// TODO  module with exporst quety funcs

// function User(){
//     var sqlite3 = require('sqlite3').verbose();  
//     var db = new sqlite3.Database('./mydb.db3');
//     db.serialize(function() {
//         db.run("CREATE TABLE IF NOT EXISTS Users (userID BIGINT IDENTITY(1,1), email TEXT, password TEXT)");
//     });

//     try{
//         db.serialize(()=>{
//             db.all('DELETE from Users', (err,rows)=>{
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log(rows);
//                 }
//             })
//         })

//         db.serialize(()=>{
//             db.all('select * from Users', (err,rows)=>{
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log(rows);
//                 }
//             })
//         })
//     }   
//     catch(e){
//         console.log('query error -->',e)
//     }
// }

// module.exports={User}