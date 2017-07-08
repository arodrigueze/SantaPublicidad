/*
* impScripts.js (framework de importar scripts) 
* by stevenn2012, https://stevenn2012.github.io
*/
var impScripts = {
  /*********************************
  *almacena la traza de documentos importados
  *********************************/
  trace: '',
  /*********************************
  *indica si se empezo a importar
  *********************************/
  starImport:false,
  /*********************************
  *DocumentURL: documento a importar
  *********************************/
  import: function(DocumentURL){
    if(this.starImport == false) { this.clearConsole(); start = true; }
    var script = 'null';
    var extension = DocumentURL.split(".")[DocumentURL.split(".").length-1].toLowerCase();
    if( extension == 'js'){
      script = "<script type='text/javascript' src='"+DocumentURL+"'></script>";
    }else if(extension = 'css'){  
      script = "<link rel='stylesheet' type='text/css' href='"+DocumentURL+"'>";
    }
    document.write(script); 
    this.trace += "\tImport "+DocumentURL.split("/")[DocumentURL.split("/").length-1]+": "+"\n\t\t->url: "+DocumentURL+", \n\t\t->Script: "+script+"\n";
  },
  /********************************
  *imprimir en consola la traza de imports
  ********************************/
  seeTrace:function(){
    console.log(this.trace="<import framewor='impScripts.js'>\n"+this.trace+"</import>");
  },
  /*******************************
  *limpiar la consola
  *******************************/
  clearConsole: function(){
    //console.clear();
  }
}