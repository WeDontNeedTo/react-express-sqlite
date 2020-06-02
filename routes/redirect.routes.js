const { Router } = require("express");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./mydb.db3");
db.get("PRAGMA foreign_keys = ON");
const router = Router();

router.get(
  "/:code",
  (async = (req, res) => {
    try {
      db.serialize(() => {
        db.get(
          `select * from Links where code=?`,
          [req.params.code],
          (err, row) => {
            if (err) {
              console.log("query error", err);
            }
            console.log(row);

            if (row == null || row === undefined) {
              return res.status(400).json("Ссылка не найдена");
            } else {
              db.run(
                `update Links set clicks = ? where code= ? `,
                [row.clicks + 1, req.params.code],
                (err) => {
                  if (err) {
                    console.log("clicks ++ error -->", err);
                  }
                  console.log("Insert done");
                }
              );
              return res.redirect(row.linkfrom);
            }
          }
        );
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так =(. Попробуйте снова" });
    }
  })
);

module.exports = router;
