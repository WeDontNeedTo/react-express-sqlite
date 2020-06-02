const { Router } = require("express");
const config = require("config");
const router = Router();
const auth = require("../middleware/auth.middleware");
const shortid = require("shortid");

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./mydb.db3");
db.get("PRAGMA foreign_keys = ON");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { linkfrom } = req.body;

    const code = shortid.generate();

    const linkto = baseUrl + "/t/" + code;

    db.serialize(() => {
      db.get(
        `select * from Links where linkfrom = ?`,
        [linkfrom],
        async (err, rows) => {
          if (err) {
            return console.error("query error-->", err.message);
          }
          console.log(rows);

          if (rows == null || rows === undefined) {
            db.serialize(() => {
              const stmt = db.prepare(
                "insert into Links(code,linkfrom, linkto, userlink, clicks, date) values (?,?,?,?,?,?)"
              );
              stmt.run(
                [code, linkfrom, linkto, req.user.userId, 0, Date.now()],
                function (err) {
                  if (err) {
                    return console.log("link query error -->", err.message);
                  }
                  console.log(`A row has been inserted`);
                  let id = this.lastID;

                  db.serialize(() => {
                    db.get(
                      `select * from Links where linkID = ?`,
                      [id],
                      (err, link) => {
                        if (err) {
                          return console.log(
                            "link query error -->",
                            err.message
                          );
                        }
                        res.status(201).json({ link });
                      }
                    );
                  });
                }
              );
            });
          } else {
            return res.status(200).json({ link: rows });
          }
        }
      );
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так =(. Попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    console.log("req.user.id -->", req.user.userId);
    db.serialize(() => {
      db.all(
        `select * from Links where userlink=?`,
        [req.user.userId],
        (err, row) => {
          if (err) {
            console.log("query error", err);
          }
          console.log(row);
          res.json({ row });
        }
      );
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так =(. Попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    console.log("req.params.id -->", req.params.id);
    db.serialize(() => {
      db.get(
        `select * from Links where linkID= ? `,
        [req.params.id],
        (err, row) => {
          if (err) {
            console.log("query error", err);
          }
          console.log(row);
          res.json(row);
        }
      );
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так =(. Попробуйте снова" });
  }
});

module.exports = router;
