var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

function initMangaApi(db){

var mangaColl = db.collection('Manga');

var mangaModel = require('./exa.model')(db);

    router.get('/all', function(req, res){
        exaModel.getAllmangas((err, mangas)=>{
          if(err){
            res.status(404).json([]);
          } else {
            res.status(200).json(mangas);
          }
        });// end getAllProducts
      }); // get /a


router.post('/', (req, res, next)=>{

  if (req.user.roles.findIndex((o)=>{return o=="administrador"}) == -1) {
    return res.status(401).json({"error":"Sin privilegio"});
  }

  var newmanga = Object.assign(
             {},
             req.body,
             {
               "Nombre":req.body.Nombre,
               "Autor":req.body.Autor,
               "PaisOrigen": req.body.PaisOrigen,
               "NumeroTomos": parseInt(req.body.NumeroTomos),
               "Estado":req.body.apartament,
               "KeyWords": [req.body.KeyWords1, req.body.KeyWords2],
               "Categorias": [req.body.Categorias1, req.body.Categorias2],
               "CreatedBy": req.user
             }
           );
          mangaModel.saveNewManga(newmanga, (err, rslt)=>{
            if(err){
              res.status(404).json(err);
            }else{
              res.status(200).json(rslt);
            }
 });//mangacoll
});//post


router.put('/update/:mangaid',
    function(req, res)
    {
      var mangaIdToModify = req.params.conid;
      var estadoAct= req.body.Estado;
      exaModel.updateManga(
        {Estado: estadoAct}, mangaIdToModify,
        (err, rsult)=>{
          if(err){
            res.status(404).json(err);
          }else{
            res.status(200).json(rsult);
          }
        }
        ); //update Manga
    }
   );// put

router.delete('/:id', (req, res, next)=>{
  var query ={"_id": new ObjectId(req.params.id)};


  mangaColl.removeOne(query, (err, rslt)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"no se pudo borrar manga de BD"});
    }
    return res.status(200).json(rslt);
  });//mangaColl
});//delete

router.get('/:id', (req, res, next)=>{
var id  = new ObjectId(req.params.id);
  plantasColl.findOne({"_id":id}, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"no se pudo obtener manga de BD"});
    }
     return res.status(200).json(doc);
  });//findOne
});// /:id

  return router;
} //end initMangaApi

//module.exports = router;
module.exports = initMangaApi;
