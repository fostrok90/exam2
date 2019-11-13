var ObjectId = require('mongodb').ObjectId;
var IndexVerified = false;

function examnagaModel(db)
{
    let mangaModel = {};
    var mangaColl = db.collection("examen");

    exaModel.getAllMangas = (handler)=>
    {
        mangaColl.find({}).toArray(
          (err, docs)=>{
            if(err)
            {
              console.log(err);
              return handler(err, null);
            }
            return handler(null, docs);
          }
        );
    } // mangas end


    mangaModel.saveNewManga = (newmanga, handler)=>
    {
        exasCollection.insertOne(newManga, (err, rslt)=>
        {
          if(err)
          {
            console.log(err);
            return handler(err, null);
          }
          return handler(null, rslt);
        }); //insertOne
    }



    exaModel.updateManga = (updateFields, mangaId, handler)=>{
        let mangaFilter = {"_id": new ObjectId(mangaId)};
        let updateObject = {
          "$set": {
                    "Estado": updateFields.Estado,
                }
    };
    mangaColl.updateOne(
        mangaFilter,
        updateObject,
        (err, rslt)=>{
          if(err){
            console.log(err);
            return handler(err, null);
          }
          return handler(null, rslt);
        }
      );
    }; // updateObj


    exaModel.deleteManga = (id, handler)=>
    {
      var query = {"_id": new ObjectId(id)};
      mangaColl.deleteOne(query, (err, rslt)=>{
          if(err)
          {
            console.log(err);
            return handler(err, null);
          }
          return handler(null, rslt);
      })//deleteone
    }

    mangaModel.getOneManga = (id, handler)=>
    {
        var query = {"_id": new ObjectId(id)};
        mangaCollection.find(query).toArray(
          (err, docs)=>{
            if(err)
            {
              console.log(err);
              return handler(err, null);
            }
            return handler(null, docs);
          }
        );
    }

    return mangaModel;
}
module.exports = examangaModel;
