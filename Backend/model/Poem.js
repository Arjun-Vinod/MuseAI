const mongoose=require('mongoose');

const poemSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    prompt:{type:String,required:true},
    poem:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Poem',poemSchema);