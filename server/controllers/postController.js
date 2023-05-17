const db = require('../db/db')

class PostController{
    async createPost(req, res){
        const {messange, date, user_id} = req.body
        const newPost = await db.query(`INSERT INTO "post" (messange, date, user_id) values ($1, $2, $3) RETURNING *`, [messange, date, user_id])
        res.json(newPost.rows[0])
    }

    async getPosts(req, res){
        const getPosts = await db.query(`SELECT "post".id, messange, date, login, user_id FROM "post" JOIN "user" ON "post".user_id = "user".id`)
        res.json(getPosts.rows)
    }

    async getOnePost(req, res){
        const {id} = req.params
        const getOnePost = await db.query(`SELECT * FROM "post" WHERE id = $1`, [id])
        res.json(getOnePost.rows[0])
    }

    async updatePost(req, res){
        const {id, messange} = req.body
        const updatePost = await db.query(`UPDATE "post" set messange = $1 WHERE id = $2 RETURNING *`, [messange, id]) 
        res.json(updatePost.rows[0])
    }
    
    async deletePost(req, res){
        const {id} = req.params
        const deletePost = await db.query(`DELETE FROM "post" WHERE id = $1 RETURNING *`, [id])
        res.json(deletePost.rows[0])
    }
}

module.exports = new PostController()