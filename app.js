const express = require("express");
const config = require("config");
var sqlite3 = require("sqlite3").verbose();
const { User } = require("./modules/User");

var db = new sqlite3.Database("./mydb.db3");
db.get("PRAGMA foreign_keys = ON");
db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS Users (userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT, password TEXT)"
  );
});
db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS Links (linkID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, linkfrom TEXT, linkto TEXT, code TEXT, date INTEGER, clicks INTEGER,  userlink INTEGER NOT NULL, FOREIGN KEY(userlink) REFERENCES Users(userID) ON DELETE CASCADE)"
  );
});
const app = express();
app.use(express.json({ extented: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/links.routes"));
app.use("/t", require("./routes/redirect.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    // todo query-funcs

    //

    //check database
    //  db.serialize(() => {
    //    db.all(`select * from Users`, (err, row) => {
    //      try {
    //        console.log(row);
    //      } catch {
    //        console.log("query error", err);
    //      }
    //    });
    //  });
    //  db.serialize(() => {
    //    db.all(`select * from Links`, (err, row) => {
    //      try {
    //        console.log(row);
    //      } catch {
    //        console.log("query error", err);
    //      }
    //    });
    //});

    app.listen(PORT, () => console.log(`Server is alive on port ${PORT}`));
  } catch (err) {
    return err;
  }
}

start();
//db.serialize(() => {
//    db.all(`delete from Links`, (err, row) => {
//      try {
//        console.log(row);
//      } catch {
//        console.log("query error", err);
//      }
//    });
//  });
//  db.serialize(() => {
//    db.all(`delete from Users`, (err, row) => {
//      try {
//        console.log(row);
//      } catch {
//        console.log("query error", err);
//      }
//    });
//  });
//           db.serialize(() => {
//       db.run(`insert into Users( email,password) values (?,?)`, ['mail','pass' ], (err) => {
//           if (err) {
//               return console.log(err.message);
//           }
//           console.log(`A row has been inserted with rowid ${this.lastID}`)
//       })
//   });
//      db.serialize(() => {
//       db.run(`insert into Links(clicks , userlink) values (?,?)`, [ 0 , id], (err) => {
//           if (err) {
//               return console.log(err.message);
//           }
//           console.log(`A row has been inserted`)
//       })
//   });

// db.serialize(() => {
//    db.all(`delete from Links`, (err, row) => {
//       try {
//          console.log(row)
//       }
//       catch{
//          console.log('query error', err)
//       }
//    })
// })
// db.serialize(() => {
//    db.all(`delete from Users`, (err, row) => {
//       try {
//          console.log(row)
//       }
//       catch{
//          console.log('query error', err)
//       }
//    })
// })

//       db.serialize(() => {
//          db.run(`insert into Users(userID, email,password) values (?,?,?)`, [id,'mail','pass' ], (err) => {
//              if (err) {
//                  return console.log(err.message);
//              }
//              console.log(`A row has been inserted with rowid ${this.lastID}`)
//          })
//      });
//      db.serialize(() => {
//       db.run(`insert into Links(linkID, clicks , userlink) values (?,?,?)`, [id, 0 , id], (err) => {
//           if (err) {
//               return console.log(err.message);
//           }
//           console.log(`A row has been inserted with rowid ${this.lastID}`)
//       })
//   });
