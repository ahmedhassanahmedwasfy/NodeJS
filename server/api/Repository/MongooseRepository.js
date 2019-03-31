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

    async find(skip,limit,populate){
        let data,err;
        try {
            let q=this.collection.find();
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
            data=   await this.collection.delete(query).lean().exec();

        }catch (e) {
            err=e;
        }

        // let {err,res}= await this.collection.find().lean().exec();
        return {err,data};
    }

    async update(model){
        let data,err;
        try {
            data=   await this.collection.findOneAndUpdate({_id:model._id},model).lean().exec();

        }catch (e) {
            err=e;
        }

        // let {err,res}= await this.collection.find().lean().exec();
        return {err,data};
    }

    async create(objs){
        let data,err;
        try {
            data=   await this.collection.create(objs);

        }catch (e) {
            err=e;
        }
        // let {err,res}= await this.collection.find().lean().exec();
        return {err,data};
    }

    async CreateOrUpdate(model){
     if(model._id){
         return  this.update(model);
     }
     else{
       return  this.create(model);
     }
    }


}

module.exports=MongooseRepository;