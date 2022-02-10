const PostModel = require('./post');
const UserModel  = require('./user');



module.exports = {
  CORS: require('./headers'),
  PostModel, 
  UserModel }
