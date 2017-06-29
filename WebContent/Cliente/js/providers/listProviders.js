$(document).ready(function(){
	getProviders();
	listProviders();
	$(".filter").keyup(function(){listProviders()});
	$(".filter").focus();
});

var providers = {};
function getProviders() {
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLog = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: providersList,
			type: 'GET',
			data: accountLog,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				//console.log("GET PROVIDERS: "+JSON.stringify(data));
				if(data.validate == "true"){
					providers = sortByKey(data.providers, 'name');
				}else{
					console.log("No tiene permisos para listar proveedores");
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	console.log("error",objXMLHttpRequest);
			}
		});
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key].toUpperCase(); var y = b[key].toUpperCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function listProviders() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>NIT</th><th>Nombre</th><th>Descripcion</th><th>Digito de<br>verificacion</th><th>Direcciones</th><th>Contactos</th><th>Productos y servicios</th></tr>';
	var data = "";
	for (var i = 0; i < providers.length; i++) {
		var provider = (providers[i].NIT+providers[i].name+providers[i].description).toUpperCase();
		if(find == "" || provider.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+providers[i].NIT+'</td>';
			data+='<td>'+providers[i].name+'</td>';
			data+='<td>'+providers[i].description+'</td>';
			data+='<td>'+providers[i].DV+'</td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalAddress" onclick="seeAddress('+providers[i].idProvider+')">Direcciones</button></td>'; 
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalContacts" onclick="seeContacts('+providers[i].idProvider+')">Contactos</button></td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalProductsServices" onclick="seeProductServices('+providers[i].idProvider+')">Productos y servicios</button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){
		$('#msfind').html("No se encontraron proveedores");
	}else{
		$('#msfind').html("");
	}
	content += data+'</table>';
	$('#lista').html(content);
}

function seeAddress(idProvider) {
	//console.log("SEE ADDRESS: "+idProvider);
	var provider = getProvider(idProvider);
	//console.log(JSON.stringify(provider));
	
	var address = provider.address;

	var number = 1;
	
	var data = '<div class="scroll panel panel-info"><div class="panel-heading"> Direcciones de '+provider.name+'</div><div class="panel-body">';
	data += '<p>Acontinuacion se muestran las direcciones del proveedor seleccionado, de click sobre la direccion para ver mas informacion.</p>';
	data += '<div id="accordion'+number+'" class="panel-group" role="tablist" aria-multiselectable="true">';
	for (var i = 0; i <address.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += address[i].direccion;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	   	//data += 'info: '+JSON.stringify(address)+"<br>";
	    data += '<strong>Pais: </strong>'+address[i].pais+"<br>";
	    data += '<strong>Ciudad: </strong>'+address[i].ciudad+"<br>";
	    data += '<strong>Direccion: </strong>'+address[i].direccion+"<br>";
	    data += '</div></div></div>';	
	}
    data += '</div></div></div>';		
	$('#bodyModalSeeAddress').html(data);
}

function seeContacts(idProvider) {
	//console.log("SEE CONTACTS: "+idProvider);
	var provider = getProvider(idProvider);
	//console.log(JSON.stringify(provider));

	var contacts = provider.contacts;

	var number = 2;
	var data = '<div class="scroll panel panel-info"><div class="panel-heading"> Contactos de '+provider.name+'</div><div class="panel-body">';
	data += '<p>Acontinuacion se muestran los contactos del proveedor seleccionado, de click sobre el contacto para ver mas informacion.</p>';
	data += '<div id="accordion'+number+'" class="panel-group" role="tablist" aria-multiselectable="true">';
	for (var i = 0; i <contacts.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += contacts[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    //data += 'info: '+JSON.stringify(contacts)+"<br>";
	    data += '<strong>Nombre: </strong>'+contacts[i].name+"<br>";
	    data += '<strong>Correo electronico: </strong>'+contacts[i].email+"<br>";
	    data += '<strong>Telefono: </strong>'+contacts[i].phoneNumber+"<br>";
	    data += '</div></div></div>';	
	}
    data += '</div></div></div>';		
	$('#bodyModalSeeContacts').html(data);
}

function seeProductServices (idProvider) {
	//console.log("SEE PRODUCTS SERVICES: "+idProvider);
	var provider = getProvider(idProvider);
	//console.log(JSON.stringify(provider));

	var productServices = provider.productServices;

	var number = 3;
	var data = '<div class="scroll panel panel-info"><div class="panel-heading"> Productos y servicios de '+provider.name+'</div><div class="panel-body">';
	data += '<p>Acontinuacion se muestran los productos y servicios del proveedor seleccionado, de click sobre el producto o servicio para ver mas informacion.</p>';
	data += '<div id="accordion'+number+'" class="panel-group" role="tablist" aria-multiselectable="true">';
	for (var i = 0; i <productServices.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += productServices[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    //data += 'info: '+JSON.stringify(productServices)+"<br>";
	    data += '<strong>Producto o servicio: </strong>'+productServices[i].name+"<br>";
	    data += '<strong>Precio: </strong>'+formatNumber.new(parseFloat(productServices[i].price), "$")+"<br>";
	    data += '<strong>Descripcion: </strong>'+productServices[i].description+"<br>";
	    data += '</div></div></div>';	
	}
    data += '</div></div></div>';		
	$('#bodyModalSeeProductsServices').html(data);
}

var formatNumber = {
	separador: ".", // separador para los miles
	sepDecimal: ',', // separador para los decimales
	formatear:function (num){
		num +='';
	  	var splitStr = num.split('.');
	  	var splitLeft = splitStr[0];
	  	var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
	  	var regx = /(\d+)(\d{3})/;
	  	while (regx.test(splitLeft)) {
	  		splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
	  	}
	  	return this.simbol + splitLeft  +splitRight;
	},
	new:function(num, simbol){
	  	this.simbol = simbol ||'';
	  	return this.formatear(num);
	}
}

function getProvider(idProvider) {
	for (var i = 0; i <providers.length; i++) {
		if(idProvider == providers[i].idProvider){
			return providers[i];
		}
	};
}