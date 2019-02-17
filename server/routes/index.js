const routes = require('express').Router();
const { signin, signup, checkUser } = require('../controllers/userController');
const { getAllArticle, myArticle, createNewArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const images = require('../helpers/images');
const { isLogin } = require('../middlewares/authUser');

routes.get('/', (req, res) => {
  res.json({ message: 'Connected' });
});

routes.get('/articles/discover', getAllArticle);

routes.post('/articles', isLogin, images.multer.single('file'), images.sendUploadToGCS, createNewArticle);
routes.get('/articles/myArticles', isLogin, myArticle);
routes.put('/articles/:id', isLogin, updateArticle);
routes.delete('/articles/:id', isLogin, deleteArticle);

routes.post('/user/signup', signup);
routes.post('/user/signin', signin);
routes.get('/user/auth', isLogin, checkUser);

module.exports = routes;