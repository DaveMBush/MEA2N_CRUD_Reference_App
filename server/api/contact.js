var Phone = require('../models/phone');
var Contact = require('../models/contact');
var express = require('express');
var router = express.Router();
router.route('/contact/:id')
    .get(function(req,res){
        Contact.findById(req.params.id,function(err,contact){
            if(err){
                res.send(err);
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            if(!contact._doc.phones){
                contact._doc.phones = [];
            }
            res.json(contact);
        });
    })
    .post(function(req,res){
        Contact.findById(req.params.id,function(err,contact){
            if(err){
                res.send(err);
            }
            contact.name = req.body.name;
            contact.sex = req.body.sex;
            contact.dob = req.body.dob;
            contact.phones = req.body.phones;
            contact.save(function(err){
                if(err){
                    res.send(err);
                    return;
                }
                res.json({result:'OK'});
            });
        })
    })
    .delete(function(req,res){
        Contact.remove({_id: req.params.id},function(err /*,contact*/){
            if(err){
                res.send(err);
            }
            res.json({result:'OK'});
        })
    });


router.route('/contact')
    .post(function(req,res){ // Add new record
        var contact = new Contact();      // create a new instance of the Bear model
        contact.name = req.body.name;  // set the bears name (comes from the request)
        contact.sex = req.body.sex;
        contact.dob = req.body.dob;
        contact.phones = req.body.phones;

        contact.save(function(err) {
            if (err)
                res.send(err);

            res.json({ result: 'OK' });
        });
    })
    .get(function(req,res){
        Contact.find(function(err,contacts){
            if(err){
                res.send(err);
            }
            res.setHeader('Content-Type', 'application/json');
            for(var contactIndex = 0;contactIndex < contacts.length;contactIndex++){
                if(!contacts[contactIndex]._doc.phones){
                    contacts[contactIndex]._doc.phones = [];
                }
            }
            res.json(contacts);
        })
    });

module.exports = router;