var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

function initMangaApi(db){

var mangaColl = db.collection('Manga');

router.get('/', (req, res, next)=>{

   mangaColl.find().toArray(err, manga)=>{
     if(err){
       console.log(err);
       return res.status(404).json({"error":"Error al extraer manga de BD"});
     }
     return res.status(200).json(manga);

   });
});//get all

router.get('/:id', function(req, res, next)=>{

  var id  = new ObjectId(req.params.id);

    mangaColl.findOne({"_id":id}, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(404).json({"error":"no se pudo obtener manga de BD"});
      }
       return res.status(200).json(doc);
  });//findOne
}); // id

router.post('/', (req, res, next)=>{

  if (req.user.roles.findIndex((o)=>{return o=="administrador"}) == -1) {
    return res.status(401).json({"error":"Sin privilegio"});
  }

  var newPlanta = Object.assign({},
    {
    "Nombre":"",
    "Autor":"",
    "PaisOrigen":"",
    "NumeroTomos": 0,
    "Estado": [Ongoing | Completed | Hiatsu |Dicontinued],
    "KeyWords": [],
    "Categorias":[]
  },
   req.body
 );
 mangaColl.insertOne(newmanga, (err, rslt)={
   if(err){
     console.log(err);
     return res.status(404).json({"error":"no se pudo agregar manga de BD"});
   }
   if(err.ops.length===0){
     console.log(err);
     return res.status(404).json({"error":"no se pudo agregar manga de BD"});
   }

   return res.status(200).json(rslt.ops[0]);

 });//plantasColl
});//post


router.put('/:Estado', (req, res, next)=>{
  var query ={"Estado": new ObjectId(req.params.Estado)};
  var update = {"$inc":{"NumeroTomos":1}};

  mangaColl.updateOne(query, update, (err, rslt)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"no se pudo modificar manga de BD"});
    }

    return res.status(200).json(rslt);

  });//mangaColl

});//put

router.delete('/:id', (req, res, next)=>{
  var query ={"_id": new ObjectId(req.params.id)};
  var update = {"$inc":{"NumeroTomos":1}};

  mangaColl.removeOne(query, update, (err, rslt)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"no se pudo borrar manga de BD"});
    return res.status(200).json(rslt);
  });//mangaColl
});//delete

  return router;
} //end initMangaApi

//module.exports = router;
module.exports = initMangaApi;
