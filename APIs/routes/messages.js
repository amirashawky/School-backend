const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const teachersmessageModel = require('../Models/teachersmessageModel');
const studentsmessageModel = require('../Models/studentsmessageModel');

////////////////////////////////////////////////////////////////////////////////

router.post('/addmessage/student/:from_student_id/:to_teacher_id/:messagetext' , (req,res, next)=>{

  var teachermessobject={
    _id:new mongoose.Types.ObjectId() ,
    from_student_id : req.params.from_student_id , 
    to_teacher_id : req.params.to_teacher_id , 
    message_text : req.params.messagetext 
  }
  // this create an object from messagemodel and replace it's data with the new data

  const teachernewmessage = new teachersmessageModel(teachermessobject);

  teachernewmessage.save()
    .then( (result) => { console.log(result); res.status(200).end('Message added .');})
    .catch((err)=>{
      console.log(err); 
      res.end('Error On Adding message. '); 
     });
  
});
//////////////////////////////////////////////////////////////////////

router.get('/getmymessages/teacher/:tid',(req,res,next)=>{
  const id =req.params.tid;
  //// hnstakhdem el object el asly lan find static function we mosh m7tagin enna n3mel object gded
  
    teachersmessageModel.find()
      .select('message_text')
      .where({to_teacher_id:id})
      .exec()
      .then((docs)=>{
        const response=
        {
          count:docs.length , 
          messages:docs.map((doc)=>{return{mess:doc.message_text} })
        }
        res.status(200);
        res.json(response);
        
      })
      .catch((err)=>{
        res.status(500); 
        console.log(err);
        res.json('can not load teacher messages'); 
      });

});

////////////////////////////////////////////////////////////////////////
 
router.post('/addmessage/teacher/:from_teacher_id/:to_student_id/:messagetext' , (req,res, next)=>{

  var studentmessobject={
    _id:new mongoose.Types.ObjectId() ,
    to_student_id : req.params.to_student_id , 
    from_teacher_id : req.params.from_teacher_id , 
    message_text : req.params.messagetext 
  }
  // this create an object from messagemodel and replace it's data with the new data

  const studentnewmessage = new studentsmessageModel(studentmessobject);

  studentnewmessage.save()
            .then( (result) => { console.log(result);  res.end('Message added .'); })
            .catch((err)=>{console.log(err);});
  
});

router.get('/getmymessages/student/:sid',(req,res,next)=>{
  const id =req.params.sid;
  //// hnstakhdem el object el asly lan find static function we mosh m7tagin enna n3mel object gded

    studentsmessageModel.find()
      .select('message_text')
      .where({to_student_id:id})
      .exec()
      .then((docs)=>{
        const response=
        {
          count:docs.length , 
          messages:docs.map((doc)=>{
            return{mess:doc.message_text} })
        }
        res.status(200);
        res.json(response);
        
      })
      .catch((err)=>{
        console.log(err);
        res.status(500);
        res.json('cant load student messages');
      });
});
module.exports=router;