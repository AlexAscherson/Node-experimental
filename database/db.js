function databaseOpenConnection(){
	var express = require('express'),
		mysql = require('mysql');

	/*MySql connection*/
	var connection  = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'test',
		debug    :  true //set true if you wanna see debug logger

	});

	connection.connect(function(error){
		if(!!error){
			console.log("error" + text);
		} else {
			console.log("connected");
		}
	});
	return connection;
}

function databaseOpenConnectionPool(){
	console.log("opening connection pool");
	var express   =    require("express");
	var mysql     =    require('mysql');
	var app       =    express();

	var pool      =    mysql.createPool({
	    connectionLimit : 100, //important
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'test',
	    debug    :  false
	});
	//module.exports.pool = pool;
	return pool;

}

// Connection Pooling example
function handleDatabase(req,res, pool) {

	console.log("handling DB");

    if(pool == undefined && pool == null) {
    	console.log("Pool not found, opening new pool"); 
    	var pool = databaseOpenConnectionPool();
    } 
    pool.getConnection(function(err,connection){
        if (err) {
        	console.log(err);
          res.json({"code" : 100, "status" : "Error Getting connection to database"});
          return;
        }   

        console.log('connected to pool as id ' + connection.threadId);
        
        connection.query("select * from t_user",function(err,rows){
            connection.release();
            console.log("Query was good, releasing connection and returning json");
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in thrown connection database"});
              return;     
        });
  });
}


module.exports.databaseOpenConnection = databaseOpenConnection;

module.exports.databaseOpenConnectionPool = databaseOpenConnectionPool;
module.exports.handleDatabase = handleDatabase;

