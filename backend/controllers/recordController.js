const Record = require("../models/Record");

//create records (Admin only)
const createRecord = async(req,res)=>{
    try{
        const record = await Record.create({
            ...req.body,
            user: req.user.id
        });
        console.log(req.user)
        res.status(201).json(record);
    }catch(error){
        res.status(500).json({message:error.message})
    }
};

//get record (Analyst + Admin)
const getRecord = async(req,res)=>{
    try{
        const {type, category, startDate, endDate} = req.query;
        let filter = {};
        if(type) filter.type = type;
        if(category) filter.category = category;
        if(startDate && endDate){
            filter.date = {
                $gte : new Date(startDate),
                $lte : new Date(endDate)
            }
        }
        const records = await Record.find(filter).sort({date:-1});
        res.json(records)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//updates Record (Admin only)
const updateRecord = async(req,res)=>{
    try{
        const record = await Record.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.json(record)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//Delete record (Admin Only)
const deleteRecord = async(req,res)=>{
    try{
        await Record.findByIdAndDelete(req.params.id);
        res.json({ message:"Record Deleted"});
    }catch(error){
        res.status(500).json({message:error.message})
    }
};

module.exports = {createRecord, getRecord, updateRecord, deleteRecord};