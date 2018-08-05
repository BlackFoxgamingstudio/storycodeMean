var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');

var router = express.Router();
mongoose.connect('mongodb://blackfox:naruto45@ds062448.mlab.com:62448/keytechlabs');
var Schema = mongoose.Schema;

var TopicDataSchema = new Schema({
  id: String,
  certifucation_id: String,
  num_of_topics: String,
  num_of_tasks: String,
  num_of_steps: String,
  name: String
}, {collection: 'topics'});

var CertDataSchema = new Schema({
  name: String,
  num_of_topics: String,
  num_of_tasks: String,
  num_of_steps: String,
  number_of_images: String,
  image: String,
  video: String,
  description: String
}, {collection: 'certifications'});

var TaskDataSchema = new Schema({
  id: String,
  name: String,
  topic_id:String,
  certifucation_id: String,
  num_of_topics: String,
  num_of_tasks: String,
  num_of_steps: String,
  image: String,
  video: String,
  description: String
}, {collection: 'Tasks'});

var StepDataSchema = new Schema({
  name: String,
  Tasks_id: String,
  certifucation_id: String,
  num_of_topics: String,
  num_of_tasks: String,
  num_of_steps: String,
  image: String,
  video: String,
  description: String
}, {collection: 'steps'});

var TopicData = mongoose.model('TopicData', TopicDataSchema);
var CertData = mongoose.model('CertData', CertDataSchema);
var StepData = mongoose.model('StepData', StepDataSchema);
var TaskData = mongoose.model('TaskData', TaskDataSchema);

  router.get('/production/certifucation/:name/topics/:certifucation_id', (req, res, next) => {
   
    CertData.findOne({name: req.params.name})
    .then(function(cdoc){
    TopicData.find({certifucation_id: req.params.certifucation_id})
    .then(function(tdoc) {
    

      res.render('index', {cert: cdoc, topic: tdoc})


      });
      });
      });
    
router.get('/production/topics/:topicid/tasks/:topic_id', (req, res, next) => {
   
    
    TopicData.findOne({topicid: req.params._id})
    .then(function(tdoc){
    TaskData.find({topic_id: req.params.topic_id})
    .then(function(ttdoc){

      res.render('task_view', {task: ttdoc, topic: tdoc })


      });
      });
    });
 router.get('/production/tasks/:task_id/steps/:Tasks_id', (req, res, next) => {
   
    TaskData.findOne({task_id: req.params._id})
    .then(function(tdoc){
    
    StepData.find({Tasks_id: req.params.Tasks_id})
    .then(function(sdoc){

      res.render('step_view', {task: ttdoc, steps: sdoc})


      });
      });
      });
 
module.exports = router;
