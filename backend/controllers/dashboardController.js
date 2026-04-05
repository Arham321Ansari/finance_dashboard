const Record = require("../models/Record");
const record = require("../models/Record");
const mongoose = require("mongoose");

//summary of whole expenses and income
const getSumamry = async(req,res)=>{
    try{
        const result = await Record.aggregate([
            {
                $match: {user: new mongoose.Types.ObjectId(req.user.id)}
            },
            {
                $group:{
                    _id:"$type",
                    total : {$sum : "$amount"}
                }
            }
        ]);
        let income = 0;
        let expense = 0;
        console.log(result)
        result.forEach((item)=>{
            if(item._id==="income") income = item.total;
            else expense = item.total;
        });
        res.json({
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense,
        });
    }catch(error){
        return res.status(500).json({message:error.message})
    }
};

//category wise total
const getCategoryData = async(req,res)=>{
    try{
        const data = await Record.aggregate([
            {
                $match: {user: new mongoose.Types.ObjectId(req.user.id)}
            },
            {
                $group:{
                    _id:"$category",
                    total : {$sum : "$amount"}
                },
            },
        ]);
        res.json(data);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
};

//monthly wise total
const getMonthlyTrend = async(req,res)=>{
    try{
        const data = await Record.aggregate([
            {
                $match: {user: new mongoose.Types.ObjectId(req.user.id)}
            },
            {
                $group:{
                    _id: {$month : "$date"},
                    total : {$sum : "$amount"}
                },
            },
            {$sort: {_id:1}}
        ]);
        res.json(data);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
};

//recent transactions records
const getRecentRecords = async(req,res)=>{
    try{
        const records = await Record.find({user: new mongoose.Types.ObjectId(req.user.id)})
        .sort({date:-1})
        .limit(5);
            
        res.json(records);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
};

module.exports = {getSumamry, getMonthlyTrend, getRecentRecords, getCategoryData};
