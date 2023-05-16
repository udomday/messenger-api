const db = require('../db/db')

class PostController{
    async createPost(req, res){
        const {messange, date, user_id} = req.body
        const newPost = await db.query(`INSERT INTO "post" (messange, date, user_id) values ($1, $2, $3) RETURNING *`, [messange, date, user_id])
        res.json(newPost.rows)
    }

    async getPosts(req, res){
        const getPosts = await db.query(`SELECT * FROM "post"`)

        res.json(getPosts.rows)
    }

    async getOnePost(req, res){
        const {id} = req.params

        console.log(id)
        //const getOnePost = db.query(`SELECT * FROM "post" WHERE id = $1`, [id])
    }

    async updatePost(req, res){

    }
    
    async deletePost(req, res){

    }
}

module.exports = new PostController()