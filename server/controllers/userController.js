const db = require('../db/db')

class UserController{
    async registration(req, res){
        const {login, password, photo} = req.body
        const newUser = await db.query(`INSERT INTO "user" (login, password, photo) values ($1, $2, $3) RETURNING *`, [login, password, photo])
        res.json(newUser.rows[0])
    }

    async login(req, res){
        
    }

    async check(req, res){
        
    }

    async updateUser(req, res){
        
    }

    async deleteUser(req, res){
        
    }
}

module.exports = new UserController()