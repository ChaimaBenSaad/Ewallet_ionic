var mysql = require('mysql')
var bcrypt = require('bcrypt');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "playcoin"
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
// 'module.exports' is a node.JS specific feature, it does not work with regular JavaScript
module.exports =
{
  checkUsername: function (username)
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT * FROM user WHERE username = '"+username+"'", function (err, result, fields) {
        if (err) return reject(err);
        if (result.length  > 0) {
            // username already exist
            return  resolve(true);
        }
      return  resolve(false);
     });
    })
  },
  checkEmail: function (email)
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT * FROM user WHERE email = '"+email+"'", function (err, result, fields) {
        if (err) return reject(err);
        if (result.length  > 0) {
            // username already exist
            return  resolve(true);
        }
      return  resolve(false);
     });
    })
  },
  addUser: function (username, password, email, image,address,private)
  {
    return new Promise(function (resolve,reject) {
      // the salt round" they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash.
      const saltRounds = 5;
      bcrypt.hash(password, saltRounds, function( err, bcryptedPassword) {
          //save to db
          var sql = "INSERT INTO user (username, password, email, image,address,private_key) VALUES ('"+username+"','"+bcryptedPassword+"','"+email+"','"+image+"',' "+address+"','"+private+"')";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            return  resolve("1 record inserted");
          });
      });
    })
  },
  UpdateTokenDateAccount: function (username, token)
  {
        //update the token and date creation to verify the email
        var sql = "UPDATE user SET confirmation_token = '"+token+"', date_creation = now() WHERE username = '"+username+"'";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("token and date creation updated");
          return "token and date creation updated";
        });
  },
  addTransaction: function (tx, sender, receiver, type)
  {
      var sql = "INSERT INTO transaction (tx, sender, receiver, type)"+
      "VALUES ('"+tx+"','"+sender+"','"+receiver+"','"+type+"')";
      connection.query(sql, function (err, result) {
        if (err) throw err;

      });
  },
  addGameAccount: function (username, password, email, game_description, game_type, image,address,private)
  {
      return new Promise(function (resolve,reject) {
        // the salt round" they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash.
        const saltRounds = 5;
        bcrypt.hash(password, saltRounds, function( err, bcryptedPassword) {
            //save to db
          var sql = "INSERT INTO user (username, password, email, account_type, game_description, game_type, image,address,private_key)"+
          "VALUES ('"+username+"','"+bcryptedPassword+"','"+email+"','game','"+game_description+"','"+game_type+"','"+image+"',' "+address+"','"+private+"')";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          return  resolve("1 record inserted");
          });
        });
      })
  },
  selectUsers: function ()
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT * FROM user", function (err, result, fields) {
        if (err) return reject(err);
        console.log("result");
        console.log(result);
      return  resolve(result);
      });
    })
  },
  selectAllGames: function ()
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT * FROM user WHERE account_type = 'game'", function (err, result, fields) {
        if (err) return reject(err);
        console.log("result");
        console.log(result);
      return  resolve(result);
      });
    })
  },
  selectGamesFromAllGames: function (searchInput)
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT * FROM user WHERE account_type = 'game' AND ((username like '%"+searchInput+"%') OR (game_description like '%"+searchInput+"%') OR (game_type = '"+searchInput+"'))",
       function (err, result, fields) {
        if (err) return reject(err);
        console.log("result");
        console.log(result);
      return  resolve(result);
      });
    })
  },
  selectMyGames: function (user_id)
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT user.* FROM user_games,user WHERE user_games.game = user.id AND user_games.user = '"+user_id+"'", function (err, result, fields) {
        if (err) return reject(err);
        console.log("result");
        console.log(result);
      return  resolve(result);
      });
    })
  },
  selectGamesFromMyGames: function (user_id,searchInput)
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT user.* FROM user_games,user WHERE user_games.game = user.id AND user_games.user = '"+user_id+"' AND ((user.username like '%"+searchInput+"%') OR (user.game_description like '%"+searchInput+"%') OR (user.game_type = '"+searchInput+"'))",
       function (err, result, fields) {
        if (err) return reject(err);
        console.log("result");
        console.log(result);
      return  resolve(result);
      });
    })
  },
  selectGameById: function (id)
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT * FROM user WHERE id = '"+id+"'",
       function (err, result, fields) {
        if (err) return reject(err);
        console.log("result");
        console.log(result);
      return  resolve(result);
      });
    })
  },
  addGameToUser: function (id_game,id_user)
  {
    var sql = "INSERT INTO user_games (game, user) VALUES ('"+id_game+"','"+id_user+"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("game added to my games");
    });
  },
  selectUser: function (username, password)
  {
    return new Promise(function (resolve,reject) {
      connection.query("SELECT * FROM user WHERE username = '"+username+"'",
       function (err, result, fields) {
        if (err) return reject(err);
        console.log("result");
        console.log(result);
        //to compare password that user supplies in the future
        if (result[0] != null) {
          var hash = result[0].password;
          bcrypt.compare(password, hash, function(err, doesMatch){
            if (doesMatch){
               //password matchs
               return  resolve(result);
            }else{
               //password doesn't match
               return resolve([]);
            }
           });
        }else {
          //username doesn't exist
          return resolve([]);
        }
      });
    })
  },

};
