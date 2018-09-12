const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const feedbackModel=require('../Models/feedbackModel');

const Note = require('../Models/noteModel');
const Attend=require('../Models/attendModel');

router.get('/addfeedback/:tid/:sid/:subject/:feed',(req,res,next)=>{
    var f={
        _id: new mongoose.Types.ObjectId() ,
        t_id : req.params.tid ,
        s_id :req.params.sid,
        subject :req.params.subject , 
        feedback :req.params.feed 
    }
    const newfeedback=new feedbackModel(f);
    newfeedback.save()
        .then((result)=>{
            console.log(result);
            res.status(200);
            res.json('the feedback is added . ');
        })
        .catch((err)=>{
            console.log(err);
            res.status(500);
            res.json('can not add new feedback . ');
        });

});
/////////////////////////////////////////////////////////////////////////////////////

//Add Note
router.post('/note/add/', (req, res, next) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        studentID: req.body.studentID,
        teacherID: req.body.teacherID,
        note: req.body.note
    });
    note
        .save()
        .then(result => {
            console.log("ok")
            res.status(200).json({
                message: 'Note Add Succefully',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Delete Note
router.delete('/note/delete/:studID', (req, res, next) => {
    const id = req.params.studID;
    Note.remove({ studentID: id })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'Deleted',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Update Note
router.patch('/note/update/:studID', (req, res, next) => {
    const id = req.params.studID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Note
        .update({ studentID: id }, { $set: updateOps })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'note updated',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });;
});

//Show Note
router.get('/note/show/', (req, res, next) => {
    Note.find()
        .select('studentID teacherID note')
        .exec()
        .then(doc => {
            const response =
                {
                    count: doc.length,
                    note:doc.map(docs=>{
                        return {
                            stuId:docs.studentID,
                            teacId:docs.teacherID,
                            note:docs.note,
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




//Update Attendance
router.patch('/attend/update/', (req, res, next) => {
    const id = req.body.studID;
    const subName=req.body.subjectName;
    Attend
        .update({ studentID: id,subjectName:subName}, { $inc:{absent:1}})
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'Attend updated',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });;
});



module.exports=router;