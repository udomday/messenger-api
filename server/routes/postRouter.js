const Router = require(`express`)
const postController = require("../controllers/postController")
const router = new Router()

router.post('/', postController.createPost)
router.post('/withmedia', postController.createPostWithMedia)
router.post('/onlymedia', postController.createPostMedia)
router.get('/', postController.getPosts)
router.get('/:id', postController.getOnePost)
router.get('/media/:id', postController.getMedia)
router.put('/', postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router