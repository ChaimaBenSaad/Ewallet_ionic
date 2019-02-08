//import { resolveNaptr } from 'dns';

var express = require('express');
var router = express.Router();
var db = require('../db');
Web3 = require('web3');
var net = require('net');
const Tx = require('ethereumjs-tx')
var balance = 0 ;
var abi =
[
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "player",
        "type": "address"
      },
      {
        "name": "gameCoins",
        "type": "uint256"
      }
    ],
    "name": "win",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "game",
        "type": "address"
      }
    ],
    "name": "getGameUnitPrice",
    "outputs": [
      {
        "name": "gameUnit",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "game",
        "type": "address"
      },
      {
        "name": "unit",
        "type": "uint256"
      }
    ],
    "name": "setGameUnitPrice",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "player",
        "type": "address"
      },
      {
        "name": "gameCoins",
        "type": "uint256"
      }
    ],
    "name": "lose",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "game",
        "type": "address"
      },
      {
        "name": "coins",
        "type": "uint256"
      }
    ],
    "name": "topUp",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "player",
        "type": "address"
      },
      {
        "name": "gameCoins",
        "type": "uint256"
      }
    ],
    "name": "cashOut",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "name": "game",
        "type": "address"
      }
    ],
    "name": "gameBalanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      },
      {
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "approveAndCall",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "newOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transferAnyERC20Token",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  }
];
var script = require('../public/javascripts/script.js');
var contract;

const fileUpload = require('express-fileupload');
var nodemailer = require("nodemailer");
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
  var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: "playcoininfo@gmail.com",
          pass: "playcoin2018"
      }
  });

/*------------------SMTP Over-----------------------------*/

// create expiration date
var expires = new Date();
var contractAddress="0x9378e4cf1b5991eb5f1483c885426a9d23d87534";

// check if user is connected before opening the page
function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    // TODO: add a page 404 or redirect to login
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
};
function sendMailer(req, res, next,username,email) {

  var token= '';
  //create random 16 character token
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var i = 16; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];
      }
  db.UpdateTokenDateAccount(username,token);

  host=req.get('host');
  link="http://"+req.get('host')+"/verify?id="+token;
  mailOptions={
      from: 'Do Not Reply '+email,
      to : email,
      subject : "Please confirm your Email account",
      html : "<h2>Please confirm your Email account</h2>Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"

  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Message sent: " + response.message);
      res.end("sent");
       }
  });


};

// router get URL

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Playcoin Wallet',myFunction : script.myFunction() });
});

/* GET signUp page for normal user. */
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'Playcoin Wallet'});
});

/* GET signUp page for game developer. */
router.get('/signUpDeveloper', function(req, res, next) {
  res.render('signUpDeveloper', { title: 'Playcoin Wallet'});
});

/* GET home page. */
router.get('/home', checkAuth, function (req, res, next) {
  // TODO: remove this static session balance
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
     web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
   //  var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net)); // mac os path

    }
    web3.eth.defaultAccount = req.session.user_address;

  contract  =new  web3.eth.Contract(abi,contractAddress);
  var balance ;
    contract.methods.balanceOf(req.session.user_address).call( function(error, result){
      console.log("x");
      console.log(result);
    if(!error)
    balance = result;
    else
    console.log('error');
    res.render('index', { title: 'Playcoin Wallet',userBalance: balance});

    });

    /*  var subscription = web3.eth.subscribe('logs', {
      address: '0x449f598D4e182301F90AD772D57f40991158AC5F',
    //  topics: ['0x12345...']
    }, function(error, result){
      if (!error)
          console.log(log);
      else
          console.log(error);

          res.render('index', { title: 'Playcoin Wallet',userBalance: balance});

    }); */


    /* contract.Transfer({
      filter: { from: '0x449f598D4e182301F90AD772D57f40991158AC5F'}
    }, function(error, event){
      console.log("logged In ...");
    console.log(balance);
      console.log(error);

    })
    .on('data', function(event){
      console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event){
      // remove event from local database
      console.log(event);
    })
    .on('error', console.error); */


});

/* GET url for logout btn home page. */
router.get('/logout', function (req, res) {
  //TODO: delete all atribute to session
  delete req.session.user_id;
  res.redirect('/');
});

/* GET all Games page for game developer. */
router.get('/allGames', checkAuth, function(req, res, next) {
    // TODO: remove this static session balance
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
       web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
     //  var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net)); // mac os path

      }
    web3.eth.defaultAccount = req.session.user_address;

    contract  =new  web3.eth.Contract(abi,contractAddress);
    var balance ;
      contract.methods.balanceOf(req.session.user_address).call( function(error, result){
        console.log("now");
      if(!error)
      balance = result;
      else
      console.log('error');

  // database request select all  games
  var result = db.selectAllGames().then(function (value) {
  res.render('gamesList', { title: 'All Games',accounts:value,userBalance: balance});
    });
  });
});

/* GET all Games page for game developer. */ //not ready yet
router.get('/myGames', checkAuth, function(req, res, next) {
      // TODO: remove this static session balance
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
         web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
       //  var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net)); // mac os path

        }
      web3.eth.defaultAccount = req.session.user_address;

      contract  =new  web3.eth.Contract(abi,contractAddress);
      var balance ;
        contract.methods.balanceOf(req.session.user_address).call( function(error, result){
          console.log("now");
        if(!error)
        balance = result;
        else
        console.log('error');
      // database request select my  games
      var result = db.selectMyGames(req.session.user_id).then(function (value) {
      res.render('gamesList', { title: 'My Games',accounts:value,userBalance: balance});
      });
    });
});

/* GET all Game details page. */
router.get('/game/:gameId', checkAuth, function(req, res, next) {
  // database request select a game by id
  var result = db.selectGameById(req.params.gameId).then(function (value) {
  res.render('gameDetails', { title: 'Playcoin Wallet game details',account:value[0]});
  });

});


router.post('/addtransaction', function(req, res) {
    var post = req.body;
    var result = db.addTransaction(post.tx,post.sender,post.receiver,post.type).then(function (value) {

      if (result)
      {
        res.send('Transaction saved');

      }
      res.send('error');
  });
});
router.post('/loggame', function(req, res) {
    var post = req.body;
    var result = db.selectUser(post.username,post.password).then(function (value) {

      if (typeof value[0] !== 'undefined' && value[0] )
      {
        // if username and password are correct
        //TODO: add all atribute to session
        if(value[0].account_type=='game'){
            res.send(JSON.stringify(value[0]));
        }
        res.send('not a game');

      }else{
        // if username or password are correct
        //TODO: create an alert
        res.send('Invalid credentials');
      }
  });
});
router.post('/loguser', function(req, res) {
  var post = req.body;
  var result = db.selectUser(post.username,post.password).then(function (value) {

    if (typeof value[0] !== 'undefined' && value[0] )
    {
      // if username and password are correct
      //TODO: add all atribute to session
      if(value[0].account_type=='user'){
          res.send(JSON.stringify(value[0]));
      }
      res.send('not a simple user');

    }else{
      // if username or password are correct
      //TODO: create an alert
      res.send('Invalid credentials');
    }
});
});


// router post URL
/*
//testing mailer
router.post('/sendMailer',function(req,res){

  var token= '';
  //create random 16 character token
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var i = 16; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];

      //expires.setHours(expires.getHours() + 6);
      expires.setMinutes(expires.getMinutes() + 2);

  host=req.get('host');
  link="http://"+req.get('host')+"/verify?id="+token;
  mailOptions={
      from: 'Do Not Reply <user@gmail.com>',
      to : "ahmed.besbes@esprit.tn",
      subject : "Please confirm your Email account",
      html : "<h2>Please confirm your Email account</h2>Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"

  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Message sent: " + response.message);
      res.end("sent");
       }
  });
});*/
router.get('/verify',function(req,res){

  if ((new Date()) < expires) {
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==token)
        {
            console.log("email is verified");
            res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
  }else {
    res.end("<h1>This session has expired please send another mail verification");
  }

});




/* post request from login page. */
router.post('/', function (req, res) {
    var post = req.body;
  // database request select user when logged in
    var result = db.selectUser(post.username,post.password).then(function (value) {

        if (typeof value[0] !== 'undefined' && value[0] )
        {
          // if username and password are correct
          req.session.user_id = value[0].id;
          req.session.user_username = value[0].username;
          req.session.user_email = value[0].email;
          req.session.user_account_type = value[0].account_type;
          req.session.user_image = value[0].image;
          req.session.user_address = value[0].address;
          req.session.user_private_key = value[0].private_keys;
          if (req.session.user_account_type == "game") {
            req.session.user_game_description = value[0].game_description;
            req.session.user_game_type = value[0].game_type;
          }
          // test if the account is activated
          if (value[0].enabled == 1) {
            res.redirect('/home');
          }else {
            res.render('verifyEmail');
          }
        }else{
          // if username or password are correct
          //TODO: create an alert
          res.send('Bad user/pass');
        }
    });
});

/*  post request from signUp page for normal user. */
router.post('/signUp', function(req, res, next) {

  // check if all parametre are passed
  var emptyField = false;
  if (!(req.body.username && req.body.email && req.body.password)) {
     emptyField = true;
     res.render('signUp', { title: 'sign up user',emptyField: emptyField });
  }else {
    // check login form username, email unique and password length
    var msg;
    var result = db.checkUsername(req.body.username).then(function (responseUsername) {
      if (req.body.password.length < 8) {
        msg = "password too short ( less than 8 letters )"
      }
      if (responseUsername) {
        console.log('username already exist');
        msg = "username already exist";
      }
      db.checkEmail(req.body.email).then(function (responseEmail) {
        if (responseEmail) {
          console.log('email already exist');
          msg = "email already exist";
        }
    // check if there is an error
    if (msg) {
      res.render('signUp', { title: 'sign up user',error: msg });
    }else {
      // database create an account of type game
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
         web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
       //  var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net)); // mac os path
      }
      var image;
      //upload image
      if (req.files.image)
        {
            image = Date.now()+req.files.image.name;
          // The name of the input field (i.e. "image") is used to retrieve the uploaded file
          let sampleFile = req.files.image;

          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv('public/uploads/'+image, function(err) {
          /*  if (err)
              return res.status(500).send(err);*/

          });
        }else {
              // select a default image if user didn't select any image
              image = "user.png"
              }
      // database create an account of type normal user
      var result = db.addUser(req.body.username,req.body.password,req.body.email,image,account.address,account.privateKey).then(function (value) {
        //create a blockchain account for new user
        account = web3.eth.accounts.create();
        sendMailer(req, res, next,req.body.username,req.body.email);
            });
      res.redirect('/');
        }
      });
    });

  }
});

/*  post request from signUp page for game developers. */
router.post('/signUpDeveloper', function(req, res, next) {
  // check if all parametre are passed
  var emptyField = false;
  if (!(req.body.username && req.body.email && req.body.password)) {
     emptyField = true;
     res.render('signUpDeveloper', { title: 'sign up game',emptyField: emptyField });
  }else {
    // check login form username, email unique and password length
    var msg;
    var result = db.checkUsername(req.body.username).then(function (responseUsername) {
      if (req.body.password.length < 8) {
        msg = "password too short ( less than 8 letters )"
      }
      if (responseUsername) {
        console.log('username already exist');
        msg = "username already exist";
      }
      db.checkEmail(req.body.email).then(function (responseEmail) {
        if (responseEmail) {
          console.log('email already exist');
          msg = "email already exist";
        }
    // check if there is an error
    if (msg) {
      res.render('signUpDeveloper', { title: 'sign up game',error: msg });
    }else {
      // database create an account of type game
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
         web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
       //  var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net)); // mac os path
      }
      var image;
      //upload image
      if (req.files.image)
        {
            image = Date.now()+req.files.image.name;
          // The name of the input field (i.e. "image") is used to retrieve the uploaded file
          let sampleFile = req.files.image;

          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv('public/uploads/'+image, function(err) {
            if (err)
              return res.status(500).send(err);

          });
        }else {
          // select a default image if user didn't select any image
          image = "game.png"
        }
      // database create an account of type developer
      var result = db.addGameAccount(req.body.username,req.body.password,req.body.email,req.body.GameDescription,req.body.GameTypes,image,account.address,account.privateKey).then(function (value) {
        //create a blockchain account for new user
        account = web3.eth.accounts.create();
        sendMailer(req, res, next,req.body.username,req.body.email);
            });
      res.redirect('/');
        }
      });
    });

  }
});

/*  post request from all games page for search . */
router.post('/allGames', checkAuth, function(req, res, next) {
      // database request select games from search input
      var result = db.selectGamesFromAllGames(req.body.search).then(function (value) {
      res.render('gamesList', { title: 'All Games',accounts:value});
      });
});

/*  post request from my games page for search . */
router.post('/myGames', checkAuth, function(req, res, next) {
      // database request select games from search input
      var result = db.selectGamesFromMyGames(req.session.user_id,req.body.search).then(function (value) {
      res.render('gamesList', { title: 'My Games',accounts:value});
      });
});

/*  post request from all games page for search . */  //must work only once
router.post('/addToMyGames', checkAuth, function(req, res, next) {
  // database request add game to user my games list
  console.log(req.body.gameId);
  var result = db.addGameToUser(req.body.gameId,req.session.user_id);
});


router.post('/send', function(req, res, next) {
    // TODO: remove this console.log test
    console.log(req.body.currency);
    console.log(req.body.to);
    console.log(req.body.amount);
    console.log(req.session.user_address);
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
          web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/6Eln6WdYNncc1lY1zSih'));
    // web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
      //  var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net)); // mac os path

      }

 // var gasPrice = web3.eth.gasPrice;
//var gasLimit = 90000;
  var rawTransaction = {
    "chainId": 0x03,
    //   gasPrice: web3.utils.toHex(gasPrice),
 //   gas : web3.utils.toHex(54536),
  //  gasLimit: web3.utils.toHex(54536),
    value: '0x00',
    //  "gasPrice": web3.utils.toHex( web3.utils.toWei( gasPrice)),
  };

  rawTransaction.from = req.session.user_address; // as you have set in example
  rawTransaction.to = contractAddress;
  rawTransaction.data = contract.methods.transfer(req.body.to, Number(req.body.amount)*10000).encodeABI(); // user's address is the address you want to send tokens to.
//  web3.eth.estimateGas(rawTransaction, function(error, gas) {
   // web3.eth.getGasPrice(function (error, gasPrice) {
    web3.eth.getGasPrice()
    .then(function (gasPrice){

     web3.eth.getTransactionCount(req.session.user_address).then(function (count){
      var gas = 999999;
      console.log('data')
      console.log(gas);
      console.log(gasPrice);
          rawTransaction.gasLimit= web3.utils.toHex(gas),
  rawTransaction.gasPrice= web3.utils.toHex(Number(gasPrice));
    rawTransaction.nonce = web3.utils.toHex(count);
    var privKey = new Buffer(req.session.private_key, "hex")
    var tx = new Tx(rawTransaction);
    tx.sign(privKey);
    var serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
      if (!err){
        db.userfromAddress(req.body.to).then(function (result){
             db.addTransaction(hash,req.session.user_id,result[0].id,"transfer");
                    console.log("hash : " +hash);
                    res.redirect('/home');
        });
      }
      else{
        console.log("fuck " + err);
        res.redirect('/home');
      }
    });
     });


    //});
  //    })

  });

});

router.post('/receive', function(req, res, next) {
  // TODO: remove this console.log test
  console.log(req.body.currency);
  console.log(req.body.from);
});


module.exports = router;
