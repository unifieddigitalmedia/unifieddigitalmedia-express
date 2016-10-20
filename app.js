var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var mongoose = require('mongoose');

var MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds017173.mlab.com:17173/bookingsystem';

var db = mongoose.createConnection(MONGOLAB_URI);


var app = express();



app.use(express.static('public'));

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {

      res.sendFile(path.join(__dirname + "/index.html"));

      })


app.use(express.static('bower_components'));


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());




app.post('/api/businesscontact/:name:email:subject:message', function (req, res) {




 var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'machelslack@hotmail.com', // Your email id
            pass: '321123ETz@' // Your password
        }
    });

 var text = 'Hello world from \n\n' + req.body.firm;


var mailOptions = {
    from: 'machelslack@hotmail.com', // sender address
    to: 'machelslack@hotmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: "hello world" //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};


transporter.sendMail(mailOptions, function(error, info){
    if(error){
     
      return error;
      
    }else{
     
       db.collection('businesscontacts').insertOne( { "businessname":req.body.firm,"businesswebsite":req.body.website,"businessemail":req.body.email,"businesscontact":req.body.name,"typeofactivity":req.body.services}, function(err, result) {
 
    res.send("Inserted a document into the business inquiries collection.");
   
  });

    };
});


});



app.get('/api/businesses', function (req, res) {

   
db.collection('placesofinterest').find( ).toArray(function(e, results){

console.log(results[0]);


   res.json(results);


});

});


app.post('/api/placesofinterest/', function (req, res) {

console.log(req.query.businessname);

console.log(req.body['activity[]']);

db.collection('placesofinterest').insert([{
  
  "businessname":req.query.businessname,
  "businessaddress":req.query.businessaddress,
  "businessphone":req.query.businessphone,
  "businesswebsite":req.query.businesswebsite,
  "businessemail":req.query.businessemail,
  "businessdescription":req.query.businessdescription,
  "country":"",
  "coordinates":{"Latitude":req.query.Latitude,"Longitude":req.query.Longitude},
  "nameofevent":"",
  "timeofevent":"",
  "dateofevent":"",
  "activity":req.body['activity[]'],
  "typeofactivity":[],
  "contactname":req.query.contactname,
  "location":"",
  "logourl":"",
  "showcaseurl":[],
  "comments":[],
  "averagerating":"",
  "avergaeprice":"",
  "date":"",
  "enabled":""}], function(err, result) {
 
 console.log(result);
    res.json({"ERROR":"Inserted a document into the business inquiries collection."});
   
  });


});


var mandrill_client = require('node-mandrill')('fix_HqmjREpZnCAHR_Dhaw');

app.post('/api/queryLog/:name:email:subject:message', function (req, res) {


console.log("this is a message");


 var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'machelslack@hotmail.com', // Your email id
            pass: '321123ETz@' // Your password
        }
    });

 var text = req.body.subject + ' from - '+ req.body.name;


var mailOptions = {
  
    from: 'machelslack@hotmail.com', // sender address
    to: 'machelslack@hotmail.com', // list of receivers
    subject:text, // Subject line
    text: req.body.message //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};


transporter.sendMail(mailOptions, function(error, info){

    if(error){
      
      return error;

    } else {
    
       db.collection('contacts').insertOne( { "name":req.body.name,"subject":req.body.subject,"message":req.body.message,"email":req.body.email}, function(err, result) {
 
    res.send("Inserted a document into the inquiries collection.");
   
  });

    };
});


});


var nodemailer = require('nodemailer');


module.exports = app;
