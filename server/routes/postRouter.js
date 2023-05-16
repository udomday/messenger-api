const Router = require(`express`)
const postController = require("../controllers/postController")
const router = new Router()

router.post('/', postController.createPost)
router.get('/', postController.getPosts)
router.get('/:id', postController.getOnePost)
router.put('/', postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router