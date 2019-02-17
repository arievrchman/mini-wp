const routes = require('express').Router();
const { signin, signup, checkUser } = require('../controllers/userController');
const { getAllArticle, myArticle, createNewArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { isLogin } = require('../middlewares/authUser');

routes.get('/', (req, res) => {
  res.json({ message: 'Connected' });
});

routes.get('/articles/discover', getAllArticle);
routes.get('/articles/myArticles', isLogin, myArticle);
routes.post('/articles', isLogin, createNewArticle);
routes.put('/articles/:id', isLogin, updateArticle);
routes.delete('/articles/:id', isLogin, deleteArticle);

routes.post('/user/signup', signup);
routes.post('/user/signin', signin);
routes.get('/user/auth', isLogin, checkUser);

module.exports = routes;