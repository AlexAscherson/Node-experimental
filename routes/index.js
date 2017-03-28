var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

//No pool Method
//var connection = db.databaseOpenConnection();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  //Non Pooling direct query 

  // connection.query("Select * FROM t_user", function( error, rows, fields){
  // 	//Callback on query
  // 	if(!!error){
  // 		console.log('error in the query');
  // 	} else {
  // 		console.log('Successfull Query' );
  // 		console.log(rows);
  // 	}
  // });
  

  // Pooling connection with query handled in function N.B This also renders
  	var pool = db.databaseOpenConnectionPool();
  	db.handleDatabase(req, res, pool);

  
  	//Non Pool end connection and render
  // connection.end( function (){
  // 	console.log("DB connection closed");
  // });

  //res.render('index', { title: 'Express' });
});

module.exports = router;
