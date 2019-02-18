# Mini Wordpress

Mini Wordpress project by Arief Rachman


>### API Endpoints for Article
| Route | Method | Desc |
|-------|--------|------|
| /articles/discover | **GET** | Read all Articles members myWordpress **(readonly, allusers)** |
| /articles/myArticles | **GET** | Edit and delete own articles **(owner article)** |
| /articles/ | **POST** | Create a new article **(member only)** |
| /articles/ | **PUT** | Edit article **(member only, owner article)** |
| /articles/ | **DELETE** | Delete article **(member only, owner article)** |

>### API Endpoints for Article
| Route | Method | Desc |
|-------|--------|------|
| /user/signup | **POST** | Register as new member |
| /user/signin | **POST** | Login into myWordpress |
| /user/auth | **GET** | Authentication user |

>### Usage Guide
Before you run this app, make sure you have :
1. Installed Node.js and npm installed in your computer
2. Google Cloud Platform Account
3. Bucket in your Google Cloud Storage
4. Fill the .env-template
5. Get your service credentials account and download the private key in `JSON` format. For doing so, you can follow this [documentation](https://cloud.google.com/storage/docs/authentication#service_accounts) or this [youtube video](https://www.youtube.com/watch?v=tSnzoW4RlaQ) and move it into project directory.
6. and run these commands
```bash
$ npm install
$ npm start
```

>### Deploy Link

__coming soon__