/*
* DinamicOWS.js (framework de accesso a datos webservices) 
* by stevenn2012, https://stevenn2012.github.io
*/
function newDinamicOWS(msNewObj){
	if(msNewObj)console.log("DinamicOWS.js: new object DinamicOWS created");
    return {
    	/**************************************
    	*datos recibidos en get
		**************************************/
		dataArray: [],
		/**************************************
		*crea una copia de los datos almacenados
		**************************************/
		cloneData: function() {
			return this.dataArray;
		},
		/**************************************
		*path: direccion del webservice
		*dataAndAccount: datos a enviar al webservice
		*idData: nombre de los datos que se recibiran del webservice
		**************************************/
		add:function(path ,dataAndAccount, idData) {	//Create (C)
			data = this.consumeService(path, dataAndAccount);
			var dataReturn = [{'success': 'true','status':'success', 'data':[]}];
			if(data.success == 'true'){
				if(data.data.validate == 'true'){
					if(data.data.insert == 'true'){
						if(idData == '') dataReturn.data = data.data;
						else dataReturn.data = data.data[idData];
					}else{ dataReturn.success = 'false'; dataReturn.status = data.data.status; }
				}else{ dataReturn.success = 'false'; dataReturn.status = 'No tiene los permisos requeridos'; }
			}else{ dataReturn.success = 'false'; dataReturn.status = data.status; }
			return dataReturn;
		},
		/**************************************
		*path: direccion del webservice
		*dataAndAccount: datos a enviar al webservice
		*sortBy: el nombre del atributo por el que organizara
		*idData: nombre de los datos que se recibiran del webservice
		**************************************/
		get: function(path ,dataAndAccount, sortBy, idData) { //Read (R)
			data = this.consumeService(path, dataAndAccount);
			var dataReturn = [{'success': 'true','status':'success'}];
			if(data.success == 'true'){
				if(data.data.validate == 'true'){
					if(data.data.list == 'true' || data.data.accionListar == 'true'){
						this.dataArray = this.sortByKey(data.data[idData], sortBy);
					}else{ dataReturn.success = 'false'; dataReturn.status = data.data.status; }
				}else{ dataReturn.success = 'false'; dataReturn.status = 'No tiene los permisos requeridos'; }
			}else{ dataReturn.success = 'false'; dataReturn.status = data.status; }
			return dataReturn;
		},	
		/**************************************
		*path: direccion del webservice
		*dataAndAccount: datos a enviar al webservice
		*idData: nombre de los datos que se recibiran del webservice
		**************************************/
		set:function(path ,dataAndAccount, idData) { //Update (U)
			data = this.consumeService(path, dataAndAccount);
			var dataReturn = [{'success': 'true','status':'success', 'data':[]}];
			if(data.success == 'true'){
				if(data.data.validate == 'true'){
					if(data.data.update == 'true'){
						if(idData == '') dataReturn.data = data.data;
						else dataReturn.data = data.data[idData];
					}else{ dataReturn.success = 'false'; dataReturn.status = data.data.status; }
				}else{ dataReturn.success = 'false'; dataReturn.status = 'No tiene los permisos requeridos'; }
			}else{ dataReturn.success = 'false'; dataReturn.status = data.status; }
			return dataReturn;
		},
		/**************************************
		*path: direccion del webservice
		*dataAndAccount: datos a enviar al webservice
		*idData: nombre de los datos que se recibiran del webservice
		**************************************/
		remove: function(path ,dataAndAccount, idData) { //Delete (D)
			data = this.consumeService(path, dataAndAccount);
			var dataReturn = [{'success': 'true','status':'success', 'data':[]}];
			if(data.success == 'true'){
				if(data.data.validate == 'true'){
					if(data.data.delete == 'true'){
						if(idData == '') dataReturn.data = data.data;
						else dataReturn.data = data.data[idData];
					}else{ dataReturn.success = 'false'; dataReturn.status = data.data.status; }
				}else{ dataReturn.success = 'false'; dataReturn.status = 'No tiene los permisos requeridos'; }
			}else{ dataReturn.success = 'false'; dataReturn.status = data.status; }
			return dataReturn;
		},
		/**************************************
		*idElement: id a buscar
		*idCompare: nombre del atributo con el que se comparará
		*printElement: imprimir el elemento encontrado
		*message: mensaje a mostrar en caso de imprimir
		**************************************/
		getById: function(idElement, idCompare, printElement, message){
			for (var i = 0; i < this.dataArray.length; i++){
				var element = this.dataArray[i];
				if(idElement == element[idCompare]) {
					if (printElement) this.logEspecificElement(message,element);
					return element; 
				}			
			}
			if (printElement) {
				var element = [];
				this.logEspecificElement(message,element);
			}
			return null;
		},
		/**************************************
		*array: arreglo que se ordenara
		*key: nombre del atributo por el que se ordenará
		**************************************/
		sortByKey: function (array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key].toUpperCase(); var y = b[key].toUpperCase();
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    });
		},
		/**************************************
		*consumir Web Service 
		*link: direccion del webservice
		*dataAndAccount: datos a enviar
		*service: nombre del servicio
		**************************************/
		consumeService: function (link, dataAndAccount) {
			validateAccount();
			var dataReturn = {'success': 'false', 'status':'', 'data':[]};
			$.ajax({
				url: link,
				type: 'GET',
				data: dataAndAccount,
				async : false,
				dataTipe: 'JSON',
				success: function (data) {
					//console.log(JSON.stringify(data));
					dataReturn.data = data;
			       	dataReturn.success = 'true';
			      	dataReturn.status = "success";
			    },
			    error: function(objXMLHttpRequest) {
			       	console.log("error",objXMLHttpRequest);
					dataReturn.data = objXMLHttpRequest;
					dataReturn.status = "error de conexion";
				}
			});
			validateAccount();
			return dataReturn;
		},
		/**************************************
		*Imprimir datos de dataArray
		*message: mensaje a mostrar
		**************************************/
		logData: function(message){
			console.log("DinamicOWS.js: "+message+": "+JSON.stringify(this.dataArray));
		},
		/**************************************
		*element: elemento a imprimir
		**************************************/
		logEspecificElement: function (message, element){
			console.log("DinamicOWS.js: "+message+": "+JSON.stringify(element));
		},
		/**************************************
		*Imprimir mensaje en un div especifico
		*idMessage: id del elemento html que llevara el mensaje
		*idFocus: id del elemento html en el que se hará focus
		*message: mensaje a mostrar
		*typeAlert: tipo de alerta a mostrar
		*typeSreenup: tipo de screenup ('default' o 'modal')
		*temporal: booleano que indica si el mensaje debe ser temporal o permanente
		**************************************/
		showMessage: function(idMessage, idFocus, message, typeAlert, typeSreenup, temporal) {
			$('#'+idMessage).html('<div class="alert alert-'+typeAlert+'" role="alert">'+message+'</div>');
			if(typeSreenup == "modal"){ $('#'+idFocus).scrollTop(0);
			}else{ $('htmls,body').animate({ scrollTop: $("#"+idFocus).offset().top }, 500);}
			if(temporal){setTimeout(function() { $('#'+idMessage).html(""); },10000);}
		}
	}
};