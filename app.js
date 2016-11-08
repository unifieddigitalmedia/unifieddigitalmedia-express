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


db.collection('businesscontacts').insertOne( { "businessname":req.body.firm,"businesswebsite":req.body.website,"businessemail":req.body.email,"businesscontact":req.body.name,"typeofactivity":req.body.services}, function(err, result) {
 
    res.send("Inserted a document into the hotel collection.");
   
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
    res.json({"ERROR":"Inserted a document into the hotel collection."});
   
  });


});


var mandrill_client = require('node-mandrill')('fix_HqmjREpZnCAHR_Dhaw');

app.post('/api/queryLog/:name:email:subject:message', function (req, res) {

var name = req.body.email;


var message = {
    "html": "<p>Example HTML content</p>",
    "text": req.body.message,
    "subject": req.body.subject,
    "from_email": "info@sinopiainn.com",
    "from_name": req.body.name,
    "to": [{
            "email": "udigitallondon@hotmail.com",
            "name": "Recipient Name",
            "type": "to"
        }],
    "headers": {
        "Reply-To": "message.reply@example.com"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "message.bcc_address@example.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "mailchimp",
    "global_merge_vars": [{
            "name": "merge1",
            "content": "merge1 content"
        }],
    "merge_vars": [{
            "rcpt": "recipient.email@example.com",
            "vars": [{
                    "name": "merge2",
                    "content": "merge2 content"
                }]
        }],
    "tags": [
        "password-resets"
    ],
    "subaccount": "customer-123",
    "google_analytics_domains": [
        "example.com"
    ],
    "google_analytics_campaign": "message.from_email@example.com",
    "metadata": {
        "website": "www.example.com"
    },
    "recipient_metadata": [{
            "rcpt": "recipient.email@example.com",
            "values": {
                "user_id": 123456
            }
        }],
    "attachments": [{
            "type": "text/plain",
            "name": "myfile.txt",
            "content": "ZXhhbXBsZSBmaWxl"
        }],
    "images": [{
            "type": "image/png",
            "name": "IMAGECID",
            "content": "ZXhhbXBsZSBmaWxl"
        }]
};
var async = false;
var ip_pool = "Main Pool";
var send_at = "2016-07-23 12:01:00";


mandrill_client.messages.send({"message": message}, function(result) {

    console.log(result);

    res.end();
    /*
    [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
    */
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
     res.end();
});


});




module.exports = app;
