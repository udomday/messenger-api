const db = require('../db/db')
const uuid = require('uuid')
const path = require('path');

class PostController{
    async createPost(req, res){
        try{
            const {messange, date, user_id} = req.body
            const newPost = await db.query(`INSERT INTO "post" (messange, date, user_id) values ($1, $2, $3) RETURNING *`, [messange, new Date(date), Number(user_id)])
            res.json(newPost.rows[0])
        } catch(e){
            console.log(e)
        }
    }

    async createPostWithMedia(req, res){
        try{
            const {messange, date, user_id} = req.body
            const {media} = req.files
            const newPost = await db.query(`INSERT INTO "post" (messange, date, user_id) values ($1, $2, $3) RETURNING *`, [messange, new Date(date), Number(user_id)])
            console.log(media.mimetype.split('/')[1])
            let fileName = uuid.v4() + `.${media.mimetype.split('/')[1]}`
            media.mv(path.resolve(__dirname, '..', 'static', fileName))
            await db.query(`INSERT INTO "media" (type, url_media, post_id) values ($1, $2, $3) RETURNING *`, [media.mimetype.split('/')[0], fileName, Number(newPost.rows[0].id)])
            res.json(newPost.rows[0])
        } catch(e){
            console.log(e)
        }
    }

    async createPostMedia(req, res){
        try{
            const {date, user_id} = req.body
            const {media} = req.files
            const newPost = await db.query(`INSERT INTO "post" (messange, date, user_id) values ($1, $2) RETURNING *`, [new Date(date), Number(user_id)])
            console.log(media.mimetype.split('/')[1])
            let fileName = uuid.v4() + `.${media.mimetype.split('/')[1]}`
            media.mv(path.resolve(__dirname, '..', 'static', fileName))
            await db.query(`INSERT INTO "media" (type, url_media, post_id) values ($1, $2, $3) RETURNING *`, [media.mimetype.split('/')[0], fileName, Number(newPost.rows[0].id)])
            res.json(newPost.rows[0])
        } catch(e){
            console.log(e)
        }
    }

    async getPosts(req, res){
        const getPosts = await db.query(`SELECT "post".id, messange, date, login, user_id FROM "post" JOIN "user" ON "post".user_id = "user".id ORDER BY "post".id`)
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
        const deleteMedia = await db.query(`DELETE FROM "media" WHERE post_id = $1 RETURNING *`, [id])
        res.json(deletePost.rows[0])
    }

    async getMedia(req, res){
        const {id} = req.params
        const getMedia = await db.query(`SELECT * FROM "media" WHERE post_id = $1`, [id])
        res.json(getMedia.rows)
    }
}

module.exports = new PostController()