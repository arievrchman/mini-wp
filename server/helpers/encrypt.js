const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)

module.exports = {
  encrypt: function (password) {
    return bcrypt.hashSync(password, salt);
  },
  decrypt: function(password, input_pwd) {
    return bcrypt.compareSync(password, input_pwd);
  }
};
