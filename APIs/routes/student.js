
const express=require('express');
const router=express.Router();
const mongoose =require('mongoose');


const feedbackModel=require('../Models/feedbackModel');
const studentModel=require('../Models/studentModel');

const Attend=require('../Models/attendModel');

router.get('/feedback/:sid',(req,res,next)=>{
    const id=req.params.sid;
    feedbackModel.find()
        .select('feedback subject t_id')
        .where({s_id:id})
        .exec()
        .then((docs)=>{
            const result={
                count : docs.length ,
                feedbacks : docs.map((doc)=>{
                    return { subject:doc.subject , feedback:doc.feedback };
                })
            }
            res.status(200); 
            res.json(result);
            res.end();
        })
        .catch((err)=>{
            console.log(err);
            res.status(500); 
            res.json('can not get student feedback .');
        });
});


//Show attend
router.get('/attend/show/', (req, res, next) => {
    Attend.find()
        .select('studentID subjectName absent')
        .exec()
        .then(doc => {
            const response =
                {
                    count: doc.length,
                    note:doc.map(docs=>{
                        return {
                            studentID:docs.studentID,
                            subjectName:docs.subjectName,
                            absent:docs.absent,
                        }
                    })
                };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports=router;