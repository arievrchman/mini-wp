var app = new Vue({
  el: '#app',
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data: {
    // ---- signin/signup ---- //
    isLogin: false,
    emailSignIn: '',
    passwordSignIn: '',
    nameSignUp: '',
    emailSignUp: '',
    passwordSignUp: '',
    // ---- display sidebar ---- //
    discoverEvents: true,
    createArticleEvents: false,
    myArticleEvents: false,
    // ---- display content ---- //
    showFormEdit: false,
    showArticles: false,
    // ---- list articles ---- //
    discoverArticles: [],
    ownArticles: [],
    //---- data articles ---- //
    id: '',
    title: '',
    description: '',
    text: '',
    author: '',
    qSearch: '',
    qOwnSearch: '',
    readArt: {},
    file: ''
  },
  methods: {
    signUp: function () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/user/signup',
        data: {
          name: this.nameSignUp,
          email: this.emailSignUp,
          password: this.passwordSignUp
        }
      })
        .then((response) => {
          console.log(response.data.result.message);
          this.nameSignUp = '';
          this.emailSignUp = '';
          this.passwordSignUp = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signIn: function () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/user/signin',
        data: {
          email: this.emailSignIn,
          password: this.passwordSignIn
        }
      })
        .then((response) => {
          console.log(response.data.result.message);
          localStorage.setItem('token', response.data.result.access_token);
          this.isLogin = true;
          this.myArticles();
          this.emailSignIn = '';
          this.passwordSignIn = '';
        }).catch((err) => {
          console.log(err);
        });
    },
    checkUser: function () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/user/auth',
        headers: { token: localStorage.getItem('token') }
      })
        .then((response) => {
          this.isLogin = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signOut: function () {
      localStorage.removeItem('token');
      this.isLogin = false;

    },
    clearValue: function () {
      this.title = '';
      this.description = '';
      this.text = '';
    },
    allArticles: function () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/articles/discover'
      })
        .then(({ data }) => {
          this.discoverArticles = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    myArticles: function () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/articles/myArticles',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.ownArticles = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleFileUpload: function () {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    addArticle: function () {

      let data = new FormData();
      data.append('file', this.file);
      data.append('title', this.title);
      data.append('description', this.description);
      data.append('content', this.text);

      axios({
        method: 'POST',
        url: 'http://localhost:3000/articles',
        data,
        // data: {
        //   title: this.title,
        //   description: this.description,
        //   content: this.text,
        // },
        headers: {
          token: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({ data: { result: data } }) => {
          this.clearValue();
          this.myArticles();
          this.allArticles();
          // this.ownArticles.push(data.data);
          // this.discoverArticles.push(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formEdit: function (article) {
      this.title = article.title;
      this.description = article.description;
      this.text = article.content;
      this.id = article._id;
    },
    editArticle: function () {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/articles/${this.id}`,
        data: {
          title: this.title,
          description: this.description,
          content: this.text,
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then((response) => {
          // this.ownArticles.map((data, idx) => {
          //   if (data._id === response.data.result.data._id) {
          //     return this.ownArticles[idx] = response.data.result.data
          //   }
          // });
          this.clearValue();
          this.myArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteArticle: function (id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/articles/${id}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then((response) => {
          // const idx = this.ownArticles.findIndex(e => {
          //   return e == id;
          // });
          // this.ownArticles.splice(idx, 1);
          this.allArticles();
          this.myArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    readArticle: function (article) {
      this.readArt = article;
      this.author = this.readArt.author.name
      console.log(this.readArt.author);
    }
  },
  created: function () {
    this.allArticles();
  },
  mounted: function () {
    if (localStorage.getItem('token')) {
      this.checkUser();
      this.myArticles();
    }
  },
  computed: {
    filterOwnArticle: function () {
      return this.ownArticles.filter(art => {
        let title = art.title;
        if (title) return new RegExp('.*' + this.qOwnSearch + '.*').test(title.toLowerCase());
      })
    },
    filterAllArticle: function () {
      return this.discoverArticles.filter(art => {
        let title = art.title;
        if (title) return new RegExp('.*' + this.qSearch + '.*').test(title.toLowerCase());
      })
    }
  }
});