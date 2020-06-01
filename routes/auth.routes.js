const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./mydb.db3');

const router = Router()

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log('data', req.body)
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неверные данные ввода'
                })
            }

            const { email, password } = req.body;


            db.serialize(() => {
                db.get(`select email from Users where email = ?`, [email], async (err, rows) => {
                    if (err) {
                        return console.error('query error-->', err.message);
                    }
                    console.log(rows)

                    if (rows == null || rows === undefined) {
                        const hashedPassword = await bcrypt.hash(password, 12)

                        db.serialize(() => {
                            db.run(`insert into Users(email,password) values (?,?)`, [email, hashedPassword], (err) => {
                                if (err) {
                                    return console.log(err.message);
                                }
                                console.log(`A row has been inserted with rowid ${this.lastID}`)
                            })
                        });

                        res.status(201).json({ message: 'Пользователь создан' })
                    }
                    else {
                        return res.status(400).json({ message: 'Такой пользователь уже существует' })
                    }
                })
            });

        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так =(. Попробуйте снова' })
        }
    })

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неверные данные при в ходе в систему'
                })
            }

            const { email, password } = req.body;

            console.log('login data', req.body)
            db.serialize(() => {
                db.get(`select * from Users where email = ?`, [email], async (err, rows) => {

                    if (err) {
                        console.log('query error', err)
                    }

                    console.log('data from db', rows)
                    if (rows) {

                        const isMatch = await bcrypt.compare(password, rows.password)
                        if (!isMatch) {
                            return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
                        }
                        const token = jwt.sign(
                            { userId: Date.now() },
                            config.get('tokenSecret'),
                            { expiresIn: '1h' }
                        )

                        res.json({ token, userId: Date.now() })
                    }
                    else {
                        return res.status(400).json({ message: 'Такой пользователь не существует' })
                    }
                })
            });
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так =(. Попробуйте снова' })
        }
    })


module.exports = router