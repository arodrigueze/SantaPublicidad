var contacts = [];
var address = [];
var productsServices = [];
var countrys = [];
var citys = [];
var pointerAddress = 0;
var pointerContacts = 0;
var pointerProductsServices = 0;

$(document).ready(function(){
	listAddress();
	listContacts();
	listProductsServices();
	getCountrys();
	getCitys(0);
	countryButton();
	cityButton();
	$('#cityButton').click(function(){cityButton()});
	$('#countryButton').click(function(){countryButton()});
	$('.closeModal').click(function(){closeModal()});
	$('#cancel').click(function(){cancel()});
	$('#countryList').change(function(){listCitys($('#countryList').val())});
	$('.modal').on('hidden.bs.modal', function(){closeModal()})
	$('#NIT').focus();

	$('#modalAddAddress').on('shown.bs.modal', function () {
    	$('#countryList').focus();
	});

	$('#modalAddContact').on('shown.bs.modal', function () {
    	$('#nameContact').focus();
	});

	$('#modalAddProductService').on('shown.bs.modal', function () {
    	$('#nameProductService').focus();
	});
});

function cancel() {
	closeModal();
	window.location.assign('../../');
}

function listAddress() {
	//console.log("LIST ADDRESS "+address.length+", "+JSON.stringify(address));
	var data = '';
	if(address.length > 0){
		data += '<table class="table table-bordered"><tr>';
		data += '<th>Direccion</th>';
		data += '<th>Ciudad</th>';
		data += '<th>Pais</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < address.length; i++) {
			data += '<tr>';
			data += '<td>'+address[i].address+'</td>';
			data += '<td>'+address[i].city+'</td>';
			data += '<td>'+address[i].country+'</td>';
			data += '<td><button class="btn btn-default" type="button" onclick="removeAddress('+address[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#addressTable').html(data);
}

function listContacts() {
	//console.log("LIST CONTACTS "+contacts.length+", "+JSON.stringify(contacts));
	var data = '';
	if(contacts.length > 0){
		data += '<table class="table table-bordered"><tr>';
		data += '<th>Nombre</th>';
		data += '<th>Correo</th>';
		data += '<th>Telefono</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < contacts.length; i++) {
			data += '<tr>';
			data += '<td>'+contacts[i].name+'</td>';
			data += '<td>'+contacts[i].email+'</td>';
			data += '<td>'+contacts[i].phoneNumber+'</td>';
			data += '<td><button class="btn btn-default" type="button" onclick="removeContact('+contacts[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#contactsTable').html(data);
}

function listProductsServices() {
	//console.log("LIST PRODUCTS SERVICES "+productsServices.length+", "+JSON.stringify(productsServices));
	var data = '';
	if(productsServices.length > 0){
		data += '<table class="table table-bordered"><tr>';
		data += '<th>Producto o servicio</th>';
		data += '<th>Descripcion</th>';
		data += '<th>Precio</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < productsServices.length; i++) {
			data += '<tr>';
			data += '<td>'+productsServices[i].name+'</td>';
			data += '<td>'+productsServices[i].description+'</td>';
			data += '<td>'+productsServices[i].price+'</td>';
			data += '<td><button class="btn btn-default" type="button" onclick="removeProductService('+productsServices[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#productsServicesTable').html(data);
}

function cityButton(){
	var value = $('#cityButton').prop('checked');
	if(value){
		$('#cityList').val(0);
		$('#cityList').prop('disabled', true);
		$('#cityAddress').prop('disabled', false);
	}else{
		$('#cityList').prop('disabled', false);
		$('#cityAddress').prop('disabled', true);
		$('#cityAddress').val("");
	}
}

function countryButton(){
	var value = $('#countryButton').prop('checked');
	if(value){
		$('#countryList').val(0);
		listCitys(0);
		$('#countryList').prop('disabled', true);
		$('#countryAddress').prop('disabled', false);
	}else{
		$('#countryList').prop('disabled', false);
		$('#countryAddress').prop('disabled', true);
		$('#countryAddress').val("");
	}
}

//add
function addAddress() {
	//console.log("ADD ADDRESS ::::::::::::::::::::::::");
	var newAddres = {
		"id":pointerAddress++,
		"idCity":$("#cityList option:selected").val(),
		"idCountry":$("#countryList option:selected").val(),
		"country":$('#countryAddress').val(),
		"city":$('#cityAddress').val(),
		"address":$('#addressProvider').val()
	};

	if(newAddres.idCountry!=0 || newAddres.country!=""){
		if($('#countryButton').prop('checked') == true && newAddres.idCountry==0){
			newAddres.idCountry = createCountry(newAddres.country);
		}else{
			if($('#countryButton').prop('checked') != false && newAddres.idCountry != 0){
				$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Error seleccionando Pais</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
				return;
			}
		}
		if(newAddres.country == ""){
			newAddres.country = $('#countryList option:selected').html();	
		}
			
	}else{
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Seleccione un pais</div>');
		ScreenUp("modalAddAddress", "msAddAddress");
		return;
	}

	if(newAddres.idCity!=0 || newAddres.city!=""){
		if($('#cityButton').prop('checked') == true && newAddres.idCity==0){
			newAddres.idCity = createCity(newAddres.idCountry, newAddres.city);
		}else{
			if($('#cityButton').prop('checked') != false && newAddres.idCity != 0){
				$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Error seleccionando Ciudad</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
				return;
			}
		}
		if(newAddres.city == ""){
			newAddres.city = $('#cityList option:selected').html();
		}	
	}else{
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Seleccione una ciudad</div>');
		ScreenUp("modalAddAddress", "msAddAddress");
		return;
	}

	//console.log("NewAddress: "+JSON.stringify(newAddres));
	if(newAddres.idCity <= 0 || newAddres.idCountry <=0){
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Error seleccionando pais o ciudad en el servidor</div>');
		ScreenUp("modalAddAddress", "msAddAddress");
		return;	
	}

	//console.log(JSON.stringify(newAddres));
	address.push({
		"id":newAddres.id,
		"idCity":newAddres.idCity,
		"idCountry":newAddres.idCountry,
		"country":newAddres.country,
		"city":newAddres.city,
		"address":newAddres.address,
		"inDB":false
	});
	listAddress();
	$('#closeAddAddress').click();
}

function getCountrys() {
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode
	};
	$.ajax({
		url: countryListService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService get Countrys: "+JSON.stringify(data));
			if(data.validate == "true"){
				countrys = data.countries;
				listCountrys();
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de listar paises</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msCreateProvider').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress", "msAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
}

function getCitys(idCountry) {
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode
	};
	$.ajax({
		url: citysListService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService get Citys: "+JSON.stringify(data));
			if(data.validate == "true"){
				citys = data.cities;
				listCitys(idCountry);
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de listar ciudades</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddres", "msAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
}

function listCountrys() {
	var data = '<option value="0">-- Seleccione el pais --</option>';
	for (var i = 0; i < countrys.length; i++) {
		data += '<option value="'+countrys[i].idCountry+'">'+countrys[i].name+'</option>';
	};
	$('#countryList').html(data);
}

function listCitys(idCountry) {
	var data = '';
	for (var i = 0; i < citys.length; i++) {
		if(citys[i].idCountry == idCountry){
			data += '<option value="'+citys[i].idCity+'">'+citys[i].name+'</option>';
		}
	};
	if(data == ''){
		$('#cityButton').prop('checked', true);
	}else{
		$('#cityButton').prop('checked', false);
	}
	cityButton();
	data = '<option value="0">-- Seleccione la ciudad --</option>'+data;
	$('#cityList').html(data);
}

function createCountry(countryName){
	var idReturn = -1;
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode,
		"cname":countryName,
		"countryCode":""
	};
	$.ajax({
		url: createCountryService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService Crear Country: "+JSON.stringify(data));
			if(data.validate == "true"){
				if(data.insert=="true"){
					getCountrys();
				}else{
					$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No se pudo crear el pais'+data.status+'</div>');
					ScreenUp("modalAddAddress", "msAddAddress");
				}
				idReturn = data.idCountry;
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear paises</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress", "msAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
	//console.log("Create country return: "+idReturn);
	return idReturn;
}

function createCity(idCountry, cityName){
	var idReturn = -1;
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode,
		"name":cityName,
		"idCountry":idCountry
	};
	$.ajax({
		url: createCityService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService Crear City: "+JSON.stringify(data));
			if(data.validate == "true"){
				if(data.insert=="true"){
					getCitys(idCountry);
				}else{
					$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No se pudo crear la ciudad'+data.status+'</div>');
					ScreenUp("modalAddAddress", "msAddAddress");
				}
				idReturn = data.idCity;
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear ciudades</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress", "msAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
	//console.log("Create city return: "+idReturn);
	return idReturn;
}

function ScreenUp (id, idMs) {
	//console.log("SCREEN UP "+id);
	if(id != "msCreateProvider"){
		$('#'+id).scrollTop(0);
	}else{
		$('htmls,body').animate({
		    scrollTop: $("#nameEmployed").offset().top
		}, 500);
	}
	setTimeout(function() {
		$('#'+idMs).html("");
	},10000);
}

function addContact() {
	//console.log("ADD CONTACT");
	var newContact = {
		"id":pointerContacts++,
		"name":$("#nameContact").val(),
		"email":$("#emailContact").val(),
		"phoneNumber":$('#phoneNumberContact').val()
	};

	var valEmail = true;
	if(newContact.email.indexOf('@', 0) == -1) {
		valEmail = false;
    }else {
    	if(newContact.email.substring(newContact.email.indexOf('@', 0)).indexOf('.', 0) == -1){
    		valEmail = false;
    	}
    }
    if(valEmail == false){
    	$('#msContact').html('<div class="alert alert-warning" role="alert">El correo electrónico introducido no es correcto.</div>');
		ScreenUp("modalAddContact", "msContact");
        return false;
    }

	//console.log(JSON.stringify(newContact));
	contacts.push({
		"id":newContact.id,
		"name":newContact.name,
		"email":newContact.email,
		"phoneNumber":newContact.phoneNumber,
		"inDB":false
	});
	listContacts();
	$('#closeAddContact').click();
}

function addProductService() {
	//console.log("ADD PRODUCT SERVICE");
	var newProductService = {
		"id":pointerProductsServices++,
		"name":$("#nameProductService").val(),
		"description":$("#descriptionProductService").val(),
		"price":$('#priceProductService').val().replace(",",".")
	};

	var valNumber = parseFloat(newProductService.price);
	if(isNaN(valNumber)){
		$('#msAddProductService').html('<div class="alert alert-warning" role="alert">El precio no es correcto</div>');
		ScreenUp("modalAddProductService", "msAddProductService");
		return;
	}
	
	//console.log(JSON.stringify(newProductService));
	productsServices.push({
		"id":newProductService.id,
		"name":newProductService.name,
		"description":newProductService.description,
		"price":newProductService.price,
		"inDB":false
	});
	listProductsServices();
	$('#closeAddProductService').click();
}

//See
function seeAddress(idAddress) {
	//console.log("SEE ADDRESS: "+idAddress);
	var thisAddress;
	for (var i = 0; i < address.length; i++) {
		if(idAddress == address[i].id){
			thisAddress = address[i];
			break;
		}	
	}
	//console.log("\tAddress: "+JSON.stringify(thisAddress));
	var data = '<div class="panel panel-info"><div class="panel-heading">'+thisAddress.address+'</div><div class="panel-body">';
	data += '<strong>Pais: </strong>'+thisAddress.country+'<br>';
	data += '<strong>Ciudad: </strong>'+thisAddress.city+'<br>';
	data += '<strong>Direccion: </strong>'+thisAddress.address+'<br>';
	data += '</div></div>';
  	$('#bodyModalSeeAddress').html(data);
}

function seeContact(idContact) {
	//console.log("SEE CONTACT: "+idContact);
	var thisContact;
	for (var i = 0; i < contacts.length; i++) {
		if(idContact == contacts[i].id){
			thisContact = contacts[i];
			break;
		}	
	}
	//console.log("\tContact: "+JSON.stringify(thisContact));
	var data = '<div class="panel panel-info"><div class="panel-heading">'+thisContact.name+'</div><div class="panel-body">';
	data += '<strong>Nombre: </strong>'+thisContact.name+'<br>';
	data += '<strong>Correo electronico: </strong>'+thisContact.email+'<br>';
	data += '<strong>Telefono: </strong>'+thisContact.phoneNumber+'<br>';
	data += '</div></div>';
  	$('#bodyModalSeeContact').html(data);
}

function seeProductService(idProductService) {
	//console.log("SEE PRODUCT SERVICE: "+idProductService);
	var thisProductService;
	for (var i = 0; i < productsServices.length; i++) {
		if(idProductService == productsServices[i].id){
			thisProductService = productsServices[i];
			break;
		}	
	}
	//console.log("\tContact: "+JSON.stringify(thisProductService));
	var data = '<div class="panel panel-info"><div class="panel-heading">'+thisProductService.name+'</div><div class="panel-body">';
	data += '<strong>Producto o servicio: </strong>'+thisProductService.name+'<br>';
	data += '<strong>Descripcion: </strong>'+thisProductService.description+'<br>';
	data += '<strong>Precio: </strong>'+formatNumber.new(parseFloat(thisProductService.price), "$")+'<br>';
	data += '</div></div>';
  	$('#bodyModalSeeProductService').html(data);
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

//Remove
function removeAddress (idAddress) {
	//console.log("REMOVE ADDRESS: "+idAddress);
	for (var i = 0; i < address.length; i++) {
		if(idAddress == address[i].id){
			address.splice(i,1);
			break;
		}	
	}
	listAddress();
}

function removeContact (idContact) {
	//console.log("REMOVE CONTACT: "+idContact);
	for (var i = 0; i < contacts.length; i++) {
		if(idContact == contacts[i].id){
			contacts.splice(i,1);
			break;
		}	
	}
	listContacts();
}

function removeProductService (idProductService) {
	//console.log("REMOVE PRODUCT SERVICE: "+idProductService);
	for (var i = 0; i < productsServices.length; i++) {
		if(idProductService == productsServices[i].id){
			productsServices.splice(i,1);
			break;
		}	
	}
	listProductsServices();
}

function closeModal() {
	//console.log("CLOSE MODAL");
	$('#bodyModalSeeContact').html("");
	$('#bodyModalSeeAddress').html("");
	$("#cityList").val(0);
	$("#countryList").val(0);
	$('#countryAddress').val("");
	$('#cityAddress').val("");
	$('#addressProvider').val("");
	if($('#countryButton').prop('checked')){$('#countryButton').click();}
	if($('#cityButton').prop('checked')){$('#cityButton').click();}
	listCitys(0);

	$('#nameContact').val("");
	$('#emailContact').val("");
	$('#phoneNumberContact').val("");

	$('#nameProductService').val("");
	$('#descriptionProductService').val("");
	$('#priceProductService').val("");

	$('#msAddAddress').html("");
	$('#msContact').html("");
	$('#msAddProductService').html("");
}

//**********Guardar***********
function createProvider(){
	var provider = {
		"nit":$('#NIT').val(),
		"name":$('#name').val(),
		"description":$('#description').val(),
		"DV":$( "#DV option:selected" ).val(),
		"contacts":contacts,
		"address":address,
		"productsServices":productsServices
	};
	//console.log("CREATE PROVIDER: ",JSON.stringify(provider));

	if(provider.address.length == 0){
		$('#msCreateProvider').html('<div class="alert alert-warning" role="alert">Debe ingresar al menos una direccion</div>');
		ScreenUp("msCreateProvider", "msCreateProvider");
		return;
	}
	if(provider.contacts.length == 0){
		$('#msCreateProvider').html('<div class="alert alert-warning" role="alert">Debe ingresar al menos un contacto</div>');
		ScreenUp("msCreateProvider", "msCreateProvider");
		return;
	}
	if(provider.productsServices.length == 0){
		$('#msCreateProvider').html('<div class="alert alert-warning" role="alert">Debe ingresar al menos un producto o servicio</div>');
		ScreenUp("msCreateProvider", "msCreateProvider");
		return;
	}

	var dataProvider = saveProviderInServer(provider.nit, provider.name, provider.description, provider.DV);
	var idProvider = dataProvider.idProvider;
	
	if(isNaN(parseInt(idProvider)) || idProvider <= 0){
		$('#msCreateProvider').html('<div class="alert alert-warning" role="alert">Error al crear el proveedor '+dataProvider.status+'</div>');
		ScreenUp("msCreateProvider", "msCreateProvider");
		return;
	}

	var validation = true;
	for (var i = 0; i < provider.address.length; i++) {
		if(provider.address[i].inDB != true){
			provider.address[i].inDB = saveAddressInServer(provider.address[i].address, idProvider, provider.address[i].idCity, provider.address[i].idCountry);	
		}
		if(provider.address[i].inDB != true){
			validation = false;
		}
	};

	for (var i = 0; i < provider.contacts.length; i++) {
		if(provider.contacts[i].inDB != true){
			provider.contacts[i].inDB = saveContactInServer(provider.contacts[i].name, provider.contacts[i].email, provider.contacts[i].phoneNumber, idProvider);	
		}
		if(provider.contacts[i].inDB != true){
			validation = false;
		}
	};

	for (var i = 0; i < provider.productsServices.length; i++) {
		if(provider.productsServices[i].inDB != true){
			provider.productsServices[i].inDB = saveProductServiceInServer(provider.productsServices[i].name, provider.productsServices[i].description, provider.productsServices[i].price, idProvider);	
		}
		if(provider.productsServices[i].inDB != true){
			validation = false;
		}
	};

	if(validation){
		$('#msCreateProvider').html('<div class="alert alert-success" role="alert">Se creo el proveedor con exito!</div>');
		ScreenUp("msCreateProvider", "msCreateProvider");
		closeModal();
		contacts = [];
		address = [];
		productsServices = [];
		listAddress();
		listContacts();
		listProductsServices();
		$('#NIT').val("");
		$('#name').val("");
		$('#description').val("");
	}else{
		$('#msCreateProvider').html('<div class="alert alert-danger" role="alert">Error al insertar datos del proveedor</div>');
		ScreenUp("msCreateProvider", "msCreateProvider");
		contacts = provider.contacts;
		address = provider.address;
		productsServices = provider.productsServices;
		listAddress();
		listContacts();
		listProductsServices();
		return;
	}
}

function saveProviderInServer(nit, name, description, DV){
	//console.log("SAVE PROVIDER IN SERVER");
	if(sessionStorage.username && sessionStorage.logincode){
		var dataAndAccount = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode,
			"nit":nit,
			"name":name,
			"description":description,
			"DV":DV
		};
		var data = insertInServer(createProviderService, dataAndAccount, "Create provider");
		if(data.validate == "true"){
			if(data.insert=="true"){
				return data;
			}else{
				$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No se pudo crear el proveedor '+data.status+'</div>');		
				ScreenUp("msCreateUser","msCreateUser");
				return data;
			}
		}else{
			$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear proveedores</div>');
			ScreenUp("msCreateUser","msCreateUser");
			return data;
		}
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function saveAddressInServer(address, idProvider, idCity, idCountry){
	//console.log("SAVE ADDRESS IN SERVER");
	if(sessionStorage.username && sessionStorage.logincode){
		var dataAndAccount = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode,
			"address":address,
			"idProvider":idProvider,
			"idCity":idCity,
			"idCountry":idCountry
		};
		var data = insertInServer(createAddressService, dataAndAccount, "Create address");
		if(data.validate == "true"){
			if(data.insert=="true"){
				return true;
			}else{
				$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No se pudo crear la direccion '+data.status+'</div>');		
				ScreenUp("msCreateUser","msCreateUser");
				return false;
			}
		}else{
			$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear Direcciones</div>');
			ScreenUp("msCreateUser","msCreateUser");
			return false;
		}
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function saveContactInServer(name, email, phoneNumber, idProvider){
	//console.log("SAVE CONTACT IN SERVER: "+name);
	if(sessionStorage.username && sessionStorage.logincode){
		var dataAndAccount = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode,
			"name":name,
			"email":email,
			"phoneNumber":phoneNumber,
			"idProvider":idProvider
		};
		var data = insertInServer(createContactService, dataAndAccount, "Create Contact");
		if(data.validate == "true"){
			if(data.insert=="true"){
				return true;
			}else{
				$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No se pudo crear el contacto '+data.status+'</div>');		
				ScreenUp("msCreateUser","msCreateUser");
				return false;
			}
		}else{
			$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear contactos</div>');
			ScreenUp("msCreateUser","msCreateUser");
			return false;
		}
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function saveProductServiceInServer(name, description, price, idProvider){
	//console.log("SAVE PRODUCT SERVICE IN SERVER");
	if(sessionStorage.username && sessionStorage.logincode){
		var dataAndAccount = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode,
			"name":name,
			"description":description,
			"price":price,
			"idProvider":idProvider
		};
		var data = insertInServer(createProductServiceService, dataAndAccount, "Create Product or service");
		if(data.validate == "true"){
			if(data.insert=="true"){
				return true;
			}else{
				$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No se pudo crear el producto o servicio'+data.status+'</div>');		
				ScreenUp("msCreateUser","msCreateUser");
				return false;
			}
		}else{
			$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear Productos o servicios</div>');
			ScreenUp("msCreateUser","msCreateUser");
			return false;
		}
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function insertInServer(link, dataAndAccount, type) {
	//console.log("INSERT IN SERVER");
	validateAccount();
	var returnData = false;
	$.ajax({
		url: link,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService "+type+": "+JSON.stringify(data));
			returnData = data;
		},
		error: function(objXMLHttpRequest) {
		   	$('#msCreateProvider').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
		    ScreenUp("msCreateProvider", "msCreateProvider");
		    console.log("error",objXMLHttpRequest);
		}
	});
	return returnData;
}

