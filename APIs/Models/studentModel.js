const mongoose=require('mongoose');

const studentSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentID:{type:String, required:true},
    age:{type:Number,required:true},
    address:{type:String, required:true},
    birthDate:{type:String, required:true},
    classNume:{type:Number, required:true},
    finalGrade:{type:Number, required:false},
    level:{type:Number, required:true},
    parentNumber:{type:String, required:true},
    name:{type:String, required:true},
    gender:{type:String, required:true},
    religion:{type:String, required:true},
    feedBack:{type:String, required:false},
});
module.exports=mongoose.model('Student',studentSchema);