const mongoose=require('mongoose');

class MongooseRepository {
    constructor(collectionName){
        this.collection = require('../models/'+collectionName)
    }
    async findOne(query, populate){
        let data,err;
        let q = this.collection.findOne(query)
       try {
            if(populate){
                q.populate(populate);
            }
       data=   await q.lean().exec();

       }catch (e) {
            err=e;
       }

        // let {err,res}= await this.collection.find().lean().exec();
       return {err,data};
    }
    async find(query,skip,limit,populate){
        let data,err;
        try {
            let q=this.collection.find(query);
            if(populate){
                q.populate(populate);
            }
            if(limit){
                q.limit(limit);
            }
            if(skip){
                q.skip(skip);
            }
            data=   await q.lean().exec();
        }catch (e) {
            err=e;
        }

        // let {err,res}= await this.collection.find().lean().exec();
        return {err,data};
    }
    async delete(query){
        let data,err;
        try {
            data=   await this.collection.deleteOne(query).lean().exec();

        }catch (e) {
            err=e;
        }

        // let {err,res}= await this.collection.find().lean().exec();
        return {err,data};
    }
    async update(query){
        let data,err;
        try {
            data=   await this.collection.updateOne(query).lean().exec();

        }catch (e) {
            err=e;
        }

        // let {err,res}= await this.collection.find().lean().exec();
        return {err,data};
    }
    async create(objs){

        let data,err;
        try {
            data=   await this.collection.create(objs).lean().exec();

        }catch (e) {
            err=e;
        }

        // let {err,res}= await this.collection.find().lean().exec();
        return {err,data};
    }
}


module.exports=MongooseRepository;