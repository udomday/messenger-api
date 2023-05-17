require("dotenv").config()
const db = require('../db/db')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJWT = (id, login) => {
    return jwt.sign(
        {id, login}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UserController{
    //Регистрация пользователя
    async registration(req, res, next){
        const {login, password, photo} = req.body
        if(!login || !password){
            return next(ApiError.badRequest('Некорректный номер телефона или пароль'))
        }
        const candidate = await db.query(`SELECT * FROM "user" WHERE login = $1`, [login])
        if(candidate.rows.length !== 0){
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await db.query(`INSERT INTO "user" (login, password, photo) values ($1, $2, $3) RETURNING *`, [login, hashPassword, photo])
        const token = generateJWT(newUser.rows[0].id, newUser.rows[0].login)
        res.json({token})
    }

    //Авторизация пользователя
    async login(req, res, next){
        const {login, password} = req.body
        const user = await db.query(`SELECT * FROM "user" WHERE login = $1`, [login])
        if(user.rows.length === 0){
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.rows[0].password)
        if(!comparePassword){
            return next(ApiError.badRequest('Неверный логин или пароль'))
        }
        const token = generateJWT(user.rows[0].id, user.rows[0].login)
        return res.json({token})
    }

    //Проверка авторизацмм
    async check(req, res){
        const token = generateJWT(req.user.id, req.user.phone)
        return res.json({token})
    }

    async updateUser(req, res){
        
    }

    async deleteUser(req, res){
        
    }
}

module.exports = new UserController()