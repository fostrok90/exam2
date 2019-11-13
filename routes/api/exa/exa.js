var express = require('express');
var router = express.Router();

function initMangaApi(db){

var fileModel = require('../filemodel');
var prodCollection = fileModel.getProducts();

router.get('/', function (req, res) {
  res.json({
    "entity": "Manga",
    "version": "0.0.1"
  });
}); //get

router.get('/all', function(req, res){

  prdModel.getAllManga((err, manga)=>{
    if(err){
      res.status(404).json([]);
    } else {
      res.status(200).json(manga);
    }
  });// end getAllManga
}); // get /all

router.post('/new', function(req, res){

   if (req.user.roles.findIndex((o)=>{return o=="administrador"}) == -1) {
     return res.status(401).json({"error":"Sin privilegio"});
   }
   var newProd = Object.assign(
      {},
      req.body,
      { "stock":parseInt(req.body.stock),
        "price":parseFloat(req.body.price),
        "createdBy": req.user }
    );

    //AQUI SE AGREGO LO SIEGUIENTE
   prdModel.saveNewProduct(newProd, (err, rslt)=>{
     if(err){
       res.status(500).json(err);
     }else{
       res.status(200).json(rslt);
     }
   });// saveNewProduct
}); // post /new

router.put('/update/:prdid',
  function(req, res){

    var prdIdToModify = req.params.prdid;
    var amountToAdjust = parseInt(req.body.ajustar);
    var adjustType = req.body.tipo || 'SUB';
    prdModel.updateProduct(
      {stock:amountToAdjust,
      type:adjustType}, prdIdToModify,
      (err, rsult)=>{
        if(err){
          res.status(500).json({"error":"Lo sentimos mucho, ha ocurrido un error."});
        }else{
          res.status(200).json(rsult);
        }
      }
      ); //updateProduct
  }
);// put :prdsku

// endPoint ==  ejeutar operacion| obtenerRecurso| guardarrecurso
//              | > devuelve un recurso

// router  get| post | put | delete

router.delete(
  //'/delete/:prdsku',
  '/delete/:prdid',
  function( req, res) {

    var id = req.params.prdid || '';
    if(id===''){
      return res.status(404).json({"error":"Identificador no válido"});
    }
    prdModel.deleteProduct(id , (err, rslt)=>{
      if(err){
        return res.status(500).json({"error":"Ocurrio un error intente de nuevo."});
      }
      return res.status(200).json({"msg":"Deleted OK"});
    }); //deleteProduct
  }
);// delete

  return router;
} //end initMangaApi

//module.exports = router;
module.exports = initMangaApi;
