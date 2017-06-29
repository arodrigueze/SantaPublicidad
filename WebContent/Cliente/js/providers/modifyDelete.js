var Provider = [];
var modalPattern = '';
$(document).ready(function(){
	initProviders();
	$(".filter").keyup(function(){listProviders()});
	$('.modalElement').on('hidden.bs.modal', function(){cancelEditElement()})
	$(".filter").focus();
});

function buttonAddress(idButton, idlist, idInput) {
	//console.log("button");
	var value = $('#'+idButton).prop('checked');
	if(value){
		$('#'+idlist).val(0);
		$('#'+idlist).prop('disabled', true);
		$('#'+idInput).prop('disabled', false);
	}else{
		$('#'+idlist).prop('disabled', false);
		$('#'+idInput).prop('disabled', true);
		$('#'+idInput).val("");
	}
}

//see
function initProviders() {
	Provider = newDinamicOWS(false);
	loadProviders();
}

function loadProviders() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var data = Provider.get(providersList ,dataAndAccount, 'name', 'providers');
	if(data.success == 'false') Provider.showMessage('msModifyDelete', 'nameEmployed', data.status, 'danger', 'default', true);
	listProviders();
}

function listProviders() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>NIT</th><th>Nombre</th><th>Descripcion</th><th>Digito de<br>verificacion</th><th>Direcciones</th><th>Contactos</th><th>Productos y servicios</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < Provider.dataArray.length; i++) {
		var provider = (Provider.dataArray[i].NIT+Provider.dataArray[i].name+Provider.dataArray[i].description).toUpperCase();
		if(find == "" || provider.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+Provider.dataArray[i].NIT+'</td>';
			data+='<td>'+Provider.dataArray[i].name+'</td>';
			data+='<td>'+Provider.dataArray[i].description+'</td>';
			data+='<td>'+Provider.dataArray[i].DV+'</td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeAddress(1, '+Provider.dataArray[i].idProvider+',true)">Direcciones</button></td>'; 
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeContacts(1, '+Provider.dataArray[i].idProvider+', true)">Contactos</button></td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeProductServices(1, '+Provider.dataArray[i].idProvider+', true)">Productos y servicios</button></td>';
		  	data+='<td><button id="Edit'+Provider.dataArray[i].idProvider+'" class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditProvider" onclick="editProvider('+Provider.dataArray[i].idProvider+')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
		  	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteProvider" onclick="deleteProvider('+Provider.dataArray[i].idProvider+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron Proveedores");
	}else{ $('#msfind').html(""); }
	content += data+'</table>';
	$('#lista').html(content);
}

function modalSee (number, titleModal, titlePanel, info, message, idModal) {
	if(idModal == 'bodyModalSee') modalPattern = 'modalSee'; else modalPattern = 'modalEditProvider';
	$('#myModalSeeLabel').html(titleModal);
	var data = '<div id="msElement"></div><div class="scroll panel panel-info"><div class="panel-heading">'+titlePanel+'</div><div class="panel-body">';
	data += '<div id="msSee"></div>';
	data += '<p>'+message+'</p>';
	data += '<div id="accordion'+number+'" class="panel-group" role="tablist" aria-multiselectable="true">';
	data += info;
	data += '</div></div></div>';		
	$('#'+idModal).html(data);
}

function seeAddress(number, idProvider, edit, idModal) {
	if(idModal==undefined) idModal = 'bodyModalSee';
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a mostrar');
	//console.log("SEE ADDRESS: "+idProvider);
	var message = 'Acontinuacion se muestran las direcciones del proveedor seleccionado, de click sobre la direccion para ver mas informacion.';
	var data = '';
	var address = provider.address;
	for (var i = 0; i <address.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += address[i].direccion;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	   	data += '<strong>Pais: </strong>'+address[i].pais+"<br>";
	    data += '<strong>Ciudad: </strong>'+address[i].ciudad+"<br>";
	    data += '<strong>Direccion: </strong>'+address[i].direccion+"<br>";
	   	if(edit) {
	   		data+='<br><div class="btn-group" role="group" aria-label="...">';
	   		data+='<button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditAddress" onclick="editAddress('+provider.idProvider+','+address[i].idAddress+')">Editar</button>';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteElementProvider" onclick="deleteAddress('+provider.idProvider+','+address[i].idAddress+')">Borrar</button></td>';
	   		data+='</div>';
	    }
	    data += '</div></div></div>';	
	}
	if(edit) {
		var buttons = '<button type="button" class="btn btn-primary" onclick="addAddress('+provider.idProvider+')">Agregar Direccion</button>';
		buttons += '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>';
		$('#buttonAdd').html(buttons);
	}
	if(data == '') message = 'No se encontraron direcciones para este proveedor';
   	modalSee(number, 'Direcciones', 'Direcciones de '+provider.name, data, message, idModal);
}

function seeContacts(number, idProvider, edit, idModal) {
	if(idModal==undefined) idModal = 'bodyModalSee';
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a mostrar');
	//console.log("SEE CONTACTS: "+JSON.stringify(provider));
	var message = 'Acontinuacion se muestran los contactos del proveedor seleccionado, de click sobre el contacto para ver mas informacion.';
	var data = '';
	var contacts = provider.contacts;
	for (var i = 0; i <contacts.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += contacts[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    data += '<strong>Nombre: </strong>'+contacts[i].name+"<br>";
	    data += '<strong>Correo electronico: </strong>'+contacts[i].email+"<br>";
	    data += '<strong>Telefono: </strong>'+contacts[i].phoneNumber+"<br>";
	    if(edit) {
	    	data+='<br><div class="btn-group" role="group" aria-label="...">';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditContact" onclick="editContact('+provider.idProvider+','+contacts[i].idContact+')">Editar</button></td>';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteElementProvider" onclick="deleteContact('+provider.idProvider+','+contacts[i].idContact+')">Borrar</button></td>';
	   		data+='</div>';
	    }
	    data += '</div></div></div>';
	}
	if(edit) {
		var buttons = '<button type="button" class="btn btn-primary" onclick="addContact('+provider.idProvider+')">Agregar Contacto</button>';
		buttons += '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>';
		$('#buttonAdd').html(buttons);
	}
	if(data == '') message = 'No se encontraron Contactos para este proveedor';
   	modalSee(number, 'Contactos',  'Contactos de '+provider.name, data, message, idModal);
}

function seeProductServices(number, idProvider, edit, idModal) {
	if(idModal==undefined) idModal = 'bodyModalSee';
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a mostrar');
	//console.log("SEE PRODUCTS SERVICES: "+JSON.stringify(provider));
	var message = 'Acontinuacion se muestran los productos y servicios del proveedor seleccionado, de click sobre el producto o servicio para ver mas informacion.';
	var data = '';
	var productServices = provider.productServices;
	for (var i = 0; i <productServices.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += productServices[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    data += '<strong>Producto o servicio: </strong>'+productServices[i].name+"<br>";
	    data += '<strong>Precio: </strong>'+formatNumber.new(parseFloat(productServices[i].price), "$")+"<br>";
	    data += '<strong>Descripcion: </strong>'+productServices[i].description+"<br>";
	    if(edit){ 
	    	data+='<br><div class="btn-group" role="group" aria-label="...">';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#" onclick="editPS('+provider.idProvider+','+productServices[i].idProductService+')">Editar</button></td>';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteElementProvider" onclick="deletePS('+provider.idProvider+','+productServices[i].idProductService+')">Borrar</button></td>';
	   		data+='</div>';
	    }
	    data += '</div></div></div>';
	}
	if(edit) {
		var buttons = '<button type="button" class="btn btn-primary" onclick="addProductService('+provider.idProvider+')">Agregar Producto o servicio</button>';
		buttons += '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>';
		$('#buttonAdd').html(buttons);
	}
	if(data == '') message = 'No se encontraron Productos o servicios para este proveedor';
   	modalSee(number, 'Productos y servicios',  'Productos y servicios de '+provider.name, data, message, idModal);
}

//delete
function deleteProvider(idProvider) {
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a eliminar');
	var data = '<p> Esta a punto de borrar el proveedor con los siguientes datos: </p>';
	data += '<div class="panel panel-info"><div class="panel-heading">Proveedor</div><div class="panel-body">';
    data += '<Strong>NIT : </strong>'+provider.NIT+"<br>";
    data += '<Strong>Nombre : </strong>'+provider.name+"<br>";
    data += '<Strong>Descripcion : </strong>'+provider.description+"<br>";
    
    data += '<Strong>Direcciones : </strong>';
    data += '<div id="seeAddressDelete"></div>';
    data += '<Strong>Contactos : </strong>';
    data += '<div id="seeContactsDelete"></div>';
    data += '<Strong>Productos y servicios : </strong>';
    data += '<div id="seeProductsServicesDelete"></div>';
    data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
  	$('#bodyModalDeleteProvider').html(data);

  	seeAddress(2, idProvider, false,'seeAddressDelete');
  	seeContacts(3, idProvider, false,'seeContactsDelete');
  	seeProductServices(4, idProvider, false, 'seeProductsServicesDelete');

  	var buttons = '<button id="continueDelete" type="button" class="btn btn-primary" onclick="ApprovedDeleteProvider('+idProvider+')">Continuar, Borrar el proveedor</button>';
  	buttons += '<button id="closeDeleteProvider" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	$('#modalDeleteProviderContinueButton').html(buttons);	
}

function deleteAddress (idProvider, idAddress) {
	$('#modalDeleteElementProvider').html();
	//console.log("deleteAddress: "+idProvider+", "+idAddress);
	var provider =  Provider.getById(idProvider, 'idProvider', false, 'Proveedor a borrar Direccion');
	var address = findElement(provider.address, 'idAddress', idAddress);

	$('#labelModalDeleteElementProvider').html('Eliminar direccion');
	var data = '<div id="msDeleteLement"></div>'; 
	data += '<p> Esta a punto de borrar la direccion con los siguientes datos: </p>';
	
	data += '<div class="panel panel-info"><div class="panel-heading"> Direccion de '+provider.name+'</div><div class="panel-body">';
    data += '<Strong>Pais : </strong>'+address.pais+"<br>";
    data += '<Strong>Ciudad : </strong>'+address.ciudad+"<br>";
    data += '<Strong>Direccion : </strong>'+address.direccion+"<br>";
    
    data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
	$('#bodyModalDeleteElementProvider').html(data);

	var buttons = '<button id="continueDelete" type="button" class="btn btn-primary" onclick="ApprovedDeleteAddress('+idProvider+','+idAddress+')">Continuar, Borrar la direccion</button>';
  	buttons += '<button id="closeDeleteElement" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	$('#modalDeleteElementContinueButton').html(buttons);

	$('#'+modalPattern).modal('hide');
}

function deleteContact (idProvider, idContact) {
	//console.log("deleteAddress: "+idProvider+", "+idContact);
	$('#modalDeleteElementProvider').html();

	var provider =  Provider.getById(idProvider, 'idProvider', false, 'Proveedor a borrar Direccion');
	var contact = findElement(provider.contacts, 'idContact', idContact);
	
	$('#labelModalDeleteElementProvider').html('Eliminar Contacto');
	var data = '<div id="msDeleteLement"></div>'; 
	data += '<p> Esta a punto de borrar el contacto con los siguientes datos: </p>';
	
	data += '<div class="panel panel-info"><div class="panel-heading"> Contacto de '+provider.name+'</div><div class="panel-body">';
    data += '<Strong>Nombre: </strong>'+contact.name+"<br>";
    data += '<Strong>Correo electronico: </strong>'+contact.email+"<br>";
    data += '<Strong>Telefono: </strong>'+contact.phoneNumber+"<br>";
    
    data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
	$('#bodyModalDeleteElementProvider').html(data);

	var buttons = '<button id="continueDelete" type="button" class="btn btn-primary" onclick="ApprovedDeleteContact('+idProvider+','+idContact+')">Continuar, Borrar el contacto</button>';
  	buttons += '<button id="closeDeleteElement" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	$('#modalDeleteElementContinueButton').html(buttons);

	$('#'+modalPattern).modal('hide');
}

function deletePS (idProvider, idProductService) {
	//console.log("deleteAddress: "+idProvider+", "+idProductService);
	$('#modalDeleteElementProvider').html();

	var provider =  Provider.getById(idProvider, 'idProvider', false, 'Proveedor a borrar Direccion');
	var ps = findElement(provider.productServices, 'idProductService', idProductService);
	
	$('#labelModalDeleteElementProvider').html('Eliminar Producto o servicio');
	var data = '<div id="msDeleteLement"></div>'; 
	data += '<p> Esta a punto de borrar el Producto o servicio con los siguientes datos: </p>';
	
	data += '<div class="panel panel-info"><div class="panel-heading"> Producto o servicio de '+provider.name+'</div><div class="panel-body">';
    data += '<Strong>Nombre del producto o servicio: </strong>'+ps.name+"<br>";
    data += '<Strong>Precio: </strong>'+formatNumber.new(parseFloat(ps.price),"$")+"<br>";
    data += '<Strong>Descripcion: </strong>'+ps.description+"<br>";
    
    data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
	$('#bodyModalDeleteElementProvider').html(data);

	var buttons = '<button id="continueDelete" type="button" class="btn btn-primary" onclick="ApprovedDeletePS('+idProvider+','+idProductService+')">Continuar, Borrar el Producto o servicio</button>';
  	buttons += '<button id="closeDeleteElement" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	$('#modalDeleteElementContinueButton').html(buttons);

	$('#'+modalPattern).modal('hide');
}

//aparoved delete
function ApprovedDeleteProvider(idProvider) {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, 'idProvider':idProvider};
	var data = Provider.remove(deleteProviderService ,dataAndAccount, '');
	if(data.success == 'false') Provider.showMessage('msModifyDelete', 'nameEmployed', "No se pudo eliminar el proveedor<br><strong>Motivo: </strong>"+data.status, 'warning', 'default', true);
	else {
		Provider.showMessage('msModifyDelete', 'nameEmployed', 'Se elimino el proveedor con exito!', 'success', 'default', true);
		$('#closeDeleteProvider').click();
		loadProviders();
	}
}

function ApprovedDeleteAddress (idProvider, idAddress) {
	//console.log("deleteAddress: "+idAddress);
	var add = newDinamicOWS(false);
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idAddress":idAddress};
	var data = add.remove(deleteAddressService ,dataAndAccount, '');
	if(data.success == 'false') add.showMessage('msDeleteLement', 'msDeleteLement', "No se pudo eliminar La direccion<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else {
		$('#modalDeleteElementProvider').modal('hide');
		loadProviders();
		seeAddress(1, idProvider, true);
		add.showMessage('msElement', 'msElement', "Se elimino con exito la direccion!", 'success', 'modal', true);
		cancelEditElement();
	}
}

function ApprovedDeleteContact (idProvider, idContact) {
	//console.log("deleteAddress: "+idContact);
	var contact = newDinamicOWS(false);
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idContact":idContact};
	var data = contact.remove(deleteContactService ,dataAndAccount, '');
	if(data.success == 'false') contact.showMessage('msDeleteLement', 'msDeleteLement', "No se pudo eliminar el contacto<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else {
		$('#modalDeleteElementProvider').modal('hide');
		loadProviders();
		seeContacts(1, idProvider, true);
		contact.showMessage('msElement', 'msElement', "Se elimino con exito el contacto!", 'success', 'modal', true);
		cancelEditElement();
	}
}

function ApprovedDeletePS (idProvider, idProductService) {
	//console.log("deleteAddress: "+idProductService);
	var proSer = newDinamicOWS(false);	
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idProductService":idProductService};
	var data = proSer.remove(deleteProductServiceService ,dataAndAccount, '');
	if(data.success == 'false') proSer.showMessage('msDeleteLement', 'msDeleteLement', "No se pudo eliminar el Producto o servicio<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		$('#modalDeleteElementProvider').modal('hide');
		loadProviders();
		seeProductServices(1, idProvider, true);
		proSer.showMessage('msElement', 'msElement', "Se elimino con exito el producto o servicio!", 'success', 'modal', true);
		cancelEditElement();
	} 
}

//edit
function editProvider(idProvider){
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a editar');
	
	var data = '<form action="javascript:ApprovedEditProvider()"><div id="messageEditProvider"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-default">';
  	data += '<div class="panel-heading">Informacion del proveedor</div>';
  	data += '<div class="panel-body">';
	data += generateInput('id','input','hidden','idEditProvider',true);
	data += generateInput('NIT','input','text','nitEditProvider',true);
	data += generateInput('Nombre','input','text','nameEditProvider',true);
	data += generateInput('Descripcion','input','textarea','descriptionEditProvider',false);
	data += '<div class="form-group"><label for="exampleInputPassword1">Digito de verificacion</label>';
	data +=	'<select id="DVoption" class="form-control">';
	data +=	'<option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>';
	data += '<option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option>';
	data +='</select></div>';
    data += '</div></div>';
    data += '<div class="panel panel-default">';
  	data += '<div class="panel-heading">Observacion de más informacion relacionada con el proveedor</div>';
  	data += '<div class="panel-body"><div class="alert alert-warning" role="alert">';
    data += '<p><strong>Nota: </strong>Esta seccion es solo para observacion. Para editar o eliminar las direcciones, contactos, productos o sercivios de este proveedor, seleccione la opcion en la tabla que permite ver estos datos, posterior a esto oprima click sobre el elemento a que desea cambiar o eliminar y seleccione la opcion que desea realizar.';
    data += '<br>(La edicion de estos datos <strong>NO</strong> se puede realizar desde esta ventana)</p>';
	data += '</div>';
	//data += '<label for="exampleInputEmail1">Direcciones: </label>';
    data += '<div id="editAddressDelete"></div>';
    //data += '<label for="exampleInputEmail1">Contactos: </label>';
    data += '<div id="editContactsDelete"></div>';
    //data += '<label for="exampleInputEmail1">Productos y/o servicios: </label>';
    data += '<div id="editProductsServicesDelete"></div>';
    data += '</div></div>';
    data += '</div>';
    
    data += '<div class="modal-footer">';
    data += '<button type="submit" class="btn btn-primary">Guardar Cambios</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
    data += '</div>';
    
    data += '</form>';
    $('#bodyModalEditProvider').html(data);

    $('#idEditProvider').val(provider.idProvider);
 	$('#nitEditProvider').val(provider.NIT);
 	$('#nameEditProvider').val(provider.name);
 	$('#descriptionEditProvider').val(provider.description); 	
 	$('#DVoption').val(provider.DV);
 	
 	seeAddress(2, idProvider, false,'editAddressDelete');
  	seeContacts(3, idProvider, false,'editContactsDelete');
  	seeProductServices(4, idProvider, false, 'editProductsServicesDelete');
  	
  	$('#modalEditProvider').on('shown.bs.modal', function () {
    	$('#nitEditProvider').focus();
	})
}


var countriesForList = newDinamicOWS(false);
var cities = [];
function editAddress (idProvider, idAddress) {
	$('#'+modalPattern).modal('hide');
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a editar direccion');
	var address = findElement(provider.address, 'idAddress', idAddress);
	//console.log(address);

	var data = '<form action="javascript:ApprovedEditAddress()"><div id="messageEditAddress"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel scroll panel-info">';
  	data += '<div class="panel-heading">Direccion del proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('id','input','hidden','idEditAddress',true);
	data += generateInput('idProvider','input','hidden','idProviderEditAddress',true);
	data += generateInput('Direccion','input','text','addressEditAddress',true);

	//country
	data += '<div class="form-group"><label for="exampleInputPassword1">Lista de paises</label><select id="listCountriesEditAddress" class="form-control"></select></div>';
	
	data += '<div class="checkbox"><label><input id="countryButtonEdit" type="checkbox" value="">';
	data += 'Crear un nuevo pais';
	data += '</label></div>';

	data += generateInput('Pais','input','text','countryEditAddress',false);

	//city
	data += '<div class="form-group"><label for="exampleInputPassword1">Lista de ciudades</label><select id="listCitiesEditAddress" class="form-control"></select></div>';

	data += '<div class="checkbox"><label><input id="cityButtonEdit" type="checkbox" value="">';
	data += 'Crear una nueva ciudad';
	data += '</label></div>';
	
	data += generateInput('Ciudad','input','text','cityEditAddress',false);
	
    data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueEdit" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalEditElementProvider').html(data);
    $('#labelModalEditElementProvider').html("Editar Direccion");

    $('#idProviderEditAddress').val(provider.idProvider);
    $('#idEditAddress').val(address.idAddress);
 	$('#addressEditAddress').val(address.direccion); 

 	loadCountries();
 	generateOptions(countriesForList.dataArray, 'idCountry', 'name', 'listCountriesEditAddress', 'Seleccione un pais');
 	for (var i = 0; i <countriesForList.dataArray.length; i++) {
 		if(countriesForList.dataArray[i].name==address.pais){
 			$('#listCountriesEditAddress').val(countriesForList.dataArray[i].idCountry);
 		}
 	}
 	getCitiesByIdCountry($('#listCountriesEditAddress').val(), 'listCitiesEditAddress');
 	for (var i = 0; i <cities.length; i++) {
 		if(cities[i].name==address.ciudad){
 			$('#listCitiesEditAddress').val(cities[i].idCity);
 		}
 	}

 	buttonAddress('countryButtonEdit', 'listCountriesEditAddress', 'countryEditAddress');
	buttonAddress('cityButtonEdit', 'listCitiesEditAddress', 'cityEditAddress');
	$('#countryButtonEdit').click(function(){buttonAddress('countryButtonEdit', 'listCountriesEditAddress', 'countryEditAddress')});
	$('#cityButtonEdit').click(function(){buttonAddress('cityButtonEdit', 'listCitiesEditAddress', 'cityEditAddress')});

 	$('#listCountriesEditAddress').change(function(){getCitiesByIdCountry($('#listCountriesEditAddress').val(), 'listCitiesEditAddress')});
	$('#modalEditElementProvider').modal('show');
}

function loadCountries(){
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var data = countriesForList.get(countryListService ,dataAndAccount, 'name', 'countries');
	if(data.success == 'false'){ 
		Provider.showMessage('messageEditAddress', 'modalEditElementProvider', "Error al cargar los paises: "+data.status, 'danger', 'modal', true);
	}
}

function getCitiesByIdCountry(idCountry, listName) {
	//console.log(":::::::::");
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	cities = newDinamicOWS(false);
	var data = cities.get(citysListService ,dataAndAccount, 'name', 'cities');
	if(data.success == 'false'){ 
		Provider.showMessage('messageEditAddress', 'modalEditElementProvider', "Error al cargar las ciudades: "+data.status, 'danger', 'modal', true);
	}else{
		cities = cities.dataArray;
		var data2 = [];
		for (var i = 0; i <cities.length; i++) {
			if(cities[i].idCountry == idCountry){
				data2.push({
					idCity: cities[i].idCity,
					name: cities[i].name
				});
			}
		}
		generateOptions(data2, 'idCity', 'name', listName, "Seleccione una ciudad");		
	}
}

function generateOptions(list, nameAttrib1, nameAttrib2, listName, messageInitial) {
	var data = '<option value="0">-- '+messageInitial+' --</option>';
	//console.log("..."+JSON.stringify(list));
	if(list != null){
		for (var i = 0; i < list.length; i++) {
			var d = list[i];
			data += '<option value="'+d[nameAttrib1]+'">'+d[nameAttrib2]+'</option>';
		}		
	}
	$('#'+listName).html(data);					   	
}

function editContact (idProvider, idContact) {
	$('#'+modalPattern).modal('hide');
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a editar contacto');
	var contact = findElement(provider.contacts, 'idContact', idContact);
	
	var data = '<form action="javascript:ApprovedEditContact()"><div id="messageEditContact"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-info">';
  	data += '<div class="panel-heading">Contacto del proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('id','input','hidden','idEditContact',true);
	data += generateInput('idProvider','input','hidden','idProviderEditContact',true);
	data += generateInput('Nombre','input','text','nameEditContact',true);
	data += generateInput('Correo electronico','input','text','emailEditContact',true);
	data += generateInput('Telefono','input','text','phoneEditContact',true);
     data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueEdit" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalEditElementProvider').html(data);
    $('#labelModalEditElementProvider').html("Editar Contacto");

    $('#idEditContact').val(contact.idContact);
 	$('#nameEditContact').val(contact.name);
 	$('#emailEditContact').val(contact.email);
 	$('#phoneEditContact').val(contact.phoneNumber); 
 	$('#idProviderEditContact').val(provider.idProvider);

	$('#modalEditElementProvider').modal('show');
}

function editPS (idProvider, idProductService) {
	$('#'+modalPattern).modal('hide');
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a editar producto o servicio');
	var productService = findElement(provider.productServices, 'idProductService', idProductService);
	
	var data = '<form action="javascript:ApprovedEditPS()"><div id="messageEditPS"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-info">';
  	data += '<div class="panel-heading">Productos y servicios del proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('id','input','hidden','idEditPS',true);
	data += generateInput('idProvider','input','hidden','idProviderEditPS',true);
	data += generateInput('Nombre del Producto o servicio','input','text','nameEditPS',true);
	data += generateInput('Descripcion','input','textarea','descEditPS',false);
	data += generateInput('Precio','input','number','priceEditPS',true);
    data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueEdit" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalEditElementProvider').html(data);
    $('#labelModalEditElementProvider').html("Editar Producto o servicio");

    $('#idEditPS').val(productService.idProductService);
 	$('#nameEditPS').val(productService.name);
 	$('#descEditPS').val(productService.description);
 	$('#priceEditPS').val(productService.price); 
 	$('#idProviderEditPS').val(provider.idProvider);

	$('#modalEditElementProvider').modal('show');
}

function generateInput (title, typeTag, type, idInput, required) {
	var data = '<div class="form-group">\n';
	if(type.toLowerCase() != 'hidden') data +='\t<label for="exampleInputEmail1">'+title+'</label>\n';
	data += '\t<'+typeTag+' id="'+idInput+'" type="'+type+'" name="comment" class="form-control" form="form" placeholder="'+title+'"'; 
	if(required) data += ' required';
	if(type.toLowerCase() == 'textarea') data += 'style="max-width:100%;"></textarea';	
	data += '>\n</div>';
	return data;
}

function cancelEditElement() {
	$('#modalEditElementProvider').modal('hide');
	$('#'+modalPattern).modal('show');
	$('#'+modalPattern).modal('handleUpdate')
}

//approved edit
function ApprovedEditProvider(){
	//console.log("ApprovedEditProvider");
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode, 
		"idProvider":$('#idEditProvider').val(),
		"nit":$('#nitEditProvider').val(),
		"name":$('#nameEditProvider').val(),
		"description":$('#descriptionEditProvider').val(),
		"DV":$('#DVoption option:selected').val()
	};

	if(notBlakSpaceValidation(dataAndAccount.nit) == false){
		Provider.showMessage('messageEditProvider', 'modalEditProvider', "Ingrese un NIT", 'warning', 'modal', true);
		return;
	}

	if(notBlakSpaceValidation(dataAndAccount.name) == false){
		Provider.showMessage('messageEditProvider', 'modalEditProvider', "Ingrese el nombre del proveedor", 'warning', 'modal', true);
		return;
	}

	//console.log("Create: "+JSON.stringify(dataAndAccount));
	var data = Provider.set(editProviderService ,dataAndAccount, '');
	if(data.success == 'false') Provider.showMessage('messageEditProvider', 'modalEditProvider', "No se pudo Editar el proveedor<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		loadProviders();
		Provider.showMessage('msModifyDelete', 'nameEmployed', "Se edito con exito el Proveedor!", 'success', 'modal', true);
		$('#modalEditProvider').modal('hide');
	} 
}

function ApprovedEditAddress(){
	//console.log("ApprovedEditAddress");
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode, 
		"idAddress":$('#idEditAddress').val(),
		"address":$('#addressEditAddress').val(),
		"idCity":$('#listCitiesEditAddress').val(),
		"idProvider":$('#idProviderEditAddress').val()
	};

	var idCountry = $("#listCountriesEditAddress").val();
	var country = $('#countryEditAddress').val();
	var city = $('#cityEditAddress').val();

	var address = newDinamicOWS(false);
	if(country == "" && idCountry == 0){
		address.showMessage('messageEditAddress', 'modalEditElementProvider', "Seleccione o ingrese un pais", 'warning', 'modal', true);
		return;
	}else{
		if(country != "" && idCountry == 0){
			var account = {"username":sessionStorage.username,"logincode":sessionStorage.logincode, "cname":country};
			var countryObj = newDinamicOWS(false);
			idCountry = countryObj.add(createCountryService ,account, '').data.idCountry;
		}else if(country != "" && idCountry != 0){
			address.showMessage('messageEditAddress', 'modalEditElementProvider', "Error seleccionando pais", 'warning', 'modal', true);
			return;
		}
	}
	if(city == "" && dataAndAccount.idCity == 0){
		address.showMessage('messageEditAddress', 'modalEditElementProvider', "Seleccione o Ingrese una ciudad", 'warning', 'modal', true);
		return;
	}else{
		if(city!="" && dataAndAccount.idCity == 0){
			var account = {"username":sessionStorage.username,"logincode":sessionStorage.logincode, "name":city, "idCountry":idCountry};
			var cityObj = newDinamicOWS(false);
			dataAndAccount.idCity = cityObj.add(createCityService ,account, '').data.idCity;
		}else if(city != "" && dataAndAccount.idCity != 0){
			address.showMessage('messageEditAddress', 'modalEditElementProvider', "Error seleccionando ciudad", 'warning', 'modal', true);
			return;
		}
	}

	if(notBlakSpaceValidation(dataAndAccount.address)==false){
		address.showMessage('messageEditAddress', 'modalEditElementProvider', "Ingrese una direccion", 'warning', 'modal', true);
		return;
	}

	//console.log(JSON.stringify(dataAndAccount));
	
	var data = address.set(editAddressService ,dataAndAccount, '');
	if(data.success == 'false') address.showMessage('messageEditAddress', 'modalEditElementProvider', "No se pudo editar la direccion<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		$('#modalEditElementProvider').modal('hide');
		loadProviders();
		seeAddress(1, dataAndAccount.idProvider, true);
		address.showMessage('msElement', 'msElement', "Se edito con exito la direccion!", 'success', 'modal', true);
		cancelEditElement();
	}
}

function ApprovedEditContact(){
	//console.log("ApprovedEditContact");
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode, 
		"idContact":$('#idEditContact').val(),
		"name":changeNameFirstUpperCase($('#nameEditContact').val()),
		"email":$('#emailEditContact').val(),
		"phoneNumber":$('#phoneEditContact').val(),
		"idProvider":$('#idProviderEditContact').val()
	};

	var contact = newDinamicOWS(false);

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		contact.showMessage('messageEditContact', 'modalEditElementProvider', "Ingrese un nombre de Contacto", 'warning', 'modal', true);
		return;
	}
	if(emailValidation(dataAndAccount.email) == false){
		contact.showMessage('messageEditContact', 'modalEditElementProvider', "el email ingresado no es valido", 'warning', 'modal', true);
		return;
	}
	if(phoneNumberValidation(dataAndAccount.phoneNumber) == false){
		contact.showMessage('messageEditContact', 'modalEditElementProvider', "el numero telefonico ingresado no es valido", 'warning', 'modal', true);
		return;
	}

	var data = contact.set(editContactService ,dataAndAccount, '');
	if(data.success == 'false') contact.showMessage('messageEditContact', 'modalEditElementProvider', "No se pudo editar el contacto<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		$('#modalEditElementProvider').modal('hide');
		loadProviders();
		seeContacts(1, dataAndAccount.idProvider, true);
		contact.showMessage('msElement', 'msElement', "Se edito con exito el contacto!", 'success', 'modal', true);
		cancelEditElement();
	}
}

function ApprovedEditPS(){
	//console.log("ApprovedEditPS");
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode, 
		"idProductService":$('#idEditPS').val(),
		"name":changeNameFirstUpperCase($('#nameEditPS').val()),
		"description":$('#descEditPS').val(),
		"price":$('#priceEditPS').val(),
		"idProvider":$('#idProviderEditPS').val()
	};

	var productService = newDinamicOWS(false);

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		productService.showMessage('messageEditPS', 'modalEditElementProvider', "Ingrese un nombre de producto o servicio", 'warning', 'modal', true);
		return;
	}

	if(numberValidation(dataAndAccount.price, true, true) == false){
		productService.showMessage('messageEditPS', 'modalEditElementProvider', "el precio ingresado no es valido", 'warning', 'modal', true);
		return;
	}

	//console.log(dataAndAccount);
	var data = productService.set(editProductServiceService ,dataAndAccount, '');
	if(data.success == 'false') productService.showMessage('messageEditPS', 'modalEditElementProvider', "No se pudo editar el producto o servicio<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		$('#modalEditElementProvider').modal('hide');
		loadProviders();
		seeProductServices(1, dataAndAccount.idProvider, true);
		productService.showMessage('msElement', 'msElement', "Se edito con exito el producto o servicio!", 'success', 'modal', true);
		cancelEditElement();
	}
}

//add element
function addAddress(idProvider) {
	$('#'+modalPattern).modal('hide');
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a Agregar direccion');
	
	var data = '<form action="javascript:ApprovedAddAddress()"><div id="messageAddAddress"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel scroll panel-info">';
  	data += '<div class="panel-heading">Agregar Direccion al proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('idProvider','input','hidden','idProviderAddAddress',true);
	data += generateInput('Direccion','input','text','addressAddAddress',true);

	//country
	data += '<div class="form-group"><label for="exampleInputPassword1">Lista de paises</label><select id="listCountriesAddAddress" class="form-control"></select></div>';
	data += '<div class="checkbox"><label><input id="countryButtonAdd" type="checkbox" value="">';
	data += 'Crear un nuevo pais';
	data += '</label></div>';
	data += generateInput('Pais','input','text','countryAddAddress',false);

	//city
	data += '<div class="form-group"><label for="exampleInputPassword1">Lista de ciudades</label><select id="listCitiesAddAddress" class="form-control"></select></div>';
	data += '<div class="checkbox"><label><input id="cityButtonAdd" type="checkbox" value="">';
	data += 'Crear una nueva ciudad';
	data += '</label></div>';
	data += generateInput('Ciudad','input','text','cityAddAddress',false);
	
    data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueAdd" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalAddElementProvider').html(data);
    $('#labelModalAddElementProvider').html("Agregar Direccion");

    $('#idProviderAddAddress').val(provider.idProvider);
    
 	loadCountries();
 	generateOptions(countriesForList.dataArray, 'idCountry', 'name', 'listCountriesAddAddress', 'Seleccione un pais');
 	
 	getCitiesByIdCountry($('#listCountriesAddAddress').val(), 'listCitiesAddAddress');

 	buttonAddress('countryButtonAdd', 'listCountriesAddAddress', 'countryAddAddress');
	buttonAddress('cityButtonAdd', 'listCitiesAddAddress', 'cityAddAddress');
	$('#countryButtonAdd').click(function(){buttonAddress('countryButtonAdd', 'listCountriesAddAddress', 'countryAddAddress')});
	$('#cityButtonAdd').click(function(){buttonAddress('cityButtonAdd', 'listCitiesAddAddress', 'cityAddAddress')});
 	
 	$('#listCountriesAddAddress').change(function(){getCitiesByIdCountry($('#listCountriesAddAddress').val(), 'listCitiesAddAddress')});
	$('#modalAddElementProvider').modal('show');
}

function addContact(idProvider) {
	$('#'+modalPattern).modal('hide');
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a Agregar contacto');
	
	var data = '<form action="javascript:ApprovedAddContact()"><div id="messageAddContact"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-info">';
  	data += '<div class="panel-heading">Agregar Contacto al proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('idProvider','input','hidden','idProviderAddContact',true);
	data += generateInput('Nombre','input','text','nameAddContact',true);
	data += generateInput('Correo electronico','input','text','emailAddContact',true);
	data += generateInput('Telefono','input','text','phoneAddContact',true);
     data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueAdd" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalAddElementProvider').html(data);
    $('#labelModalAddElementProvider').html("Agregar Contacto");
 	$('#idProviderAddContact').val(provider.idProvider);
	$('#modalAddElementProvider').modal('show');
}

function addProductService(idProvider) {
	$('#'+modalPattern).modal('hide');
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a Agregar producto o servicio');
	
	var data = '<form action="javascript:ApprovedAddProductService()"><div id="messageAddPS"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-info">';
  	data += '<div class="panel-heading">Agregar Producto o servicio al proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('idProvider','input','hidden','idProviderAddPS',true);
	data += generateInput('Nombre del Producto o servicio','input','text','nameAddPS',true);
	data += generateInput('Descripcion','input','textarea','descAddPS',false);
	data += generateInput('Precio','input','number','priceAddPS',true);
    data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueAdd" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalAddElementProvider').html(data);
    $('#labelModalAddElementProvider').html("Agregar Producto o servicio");
 
 	$('#idProviderAddPS').val(provider.idProvider);

	$('#modalAddElementProvider').modal('show');
}

//approved add element
function ApprovedAddAddress() {
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode, 
		"address":$('#addressAddAddress').val(),
		"idCity":$('#listCitiesAddAddress').val(),
		"idProvider":$('#idProviderAddAddress').val()
	};

	var idCountry = $("#listCountriesAddAddress").val();
	var country = $('#countryAddAddress').val();
	var city = $('#cityAddAddress').val();

	var address = newDinamicOWS(false);
	if(country == "" && idCountry == 0){
		address.showMessage('messageAddAddress', 'modalAddElementProvider', "Seleccione o ingrese un pais", 'warning', 'modal', true);
		return;
	}else{
		if(country != "" && idCountry == 0){
			var account = {"username":sessionStorage.username,"logincode":sessionStorage.logincode, "cname":country};
			var countryObj = newDinamicOWS(false);
			idCountry = countryObj.add(createCountryService ,account, '').data.idCountry;
		}else if(country != "" && idCountry != 0){
			address.showMessage('messageAddAddress', 'modalAddElementProvider', "Error seleccionando pais", 'warning', 'modal', true);
			return;
		}
	}
	if(city == "" && dataAndAccount.idCity == 0){
		address.showMessage('messageAddAddress', 'modalAddElementProvider', "Seleccione o Ingrese una ciudad", 'warning', 'modal', true);
		return;
	}else{
		if(city!="" && dataAndAccount.idCity == 0){
			var account = {"username":sessionStorage.username,"logincode":sessionStorage.logincode, "name":city, "idCountry":idCountry};
			var cityObj = newDinamicOWS(false);
			dataAndAccount.idCity = cityObj.add(createCityService ,account, '').data.idCity;
		}else if(city != "" && dataAndAccount.idCity != 0){
			address.showMessage('messageAddAddress', 'modalAddElementProvider', "Error seleccionando ciudad", 'warning', 'modal', true);
			return;
		}
	}

	if(notBlakSpaceValidation(dataAndAccount.address)==false){
		address.showMessage('messageAddAddress', 'modalAddElementProvider', "Ingrese una direccion", 'warning', 'modal', true);
		return;
	}

	//console.log(JSON.stringify(dataAndAccount));
	var data = address.add(createAddressService ,dataAndAccount, '');
	if(data.success == 'false') address.showMessage('messageAddAddress', 'modalAddElementProvider', "No se pudo Agregar la direccion<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		$('#modalAddElementProvider').modal('hide');
		loadProviders();
		seeAddress(1, dataAndAccount.idProvider, true);
		address.showMessage('msElement', 'msElement', "Se Agrego con exito la direccion!", 'success', 'modal', true);
		cancelEditElement();
	}
}

function ApprovedAddContact() {
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode,
		"name":changeNameFirstUpperCase($('#nameAddContact').val()),
		"email":$('#emailAddContact').val(),
		"phoneNumber":$('#phoneAddContact').val(),
		"idProvider":$('#idProviderAddContact').val()
	};

	var contact = newDinamicOWS(false);

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		contact.showMessage('messageAddContact', 'modalAddElementProvider', "Ingrese un nombre de Contacto", 'warning', 'modal', true);
		return;
	}
	if(emailValidation(dataAndAccount.email) == false){
		contact.showMessage('messageAddContact', 'modalAddElementProvider', "el email ingresado no es valido", 'warning', 'modal', true);
		return;
	}
	if(phoneNumberValidation(dataAndAccount.phoneNumber) == false){
		contact.showMessage('messageAddContact', 'modalAddElementProvider', "el numero telefonico ingresado no es valido", 'warning', 'modal', true);
		return;
	}

	var data = contact.add(createContactService ,dataAndAccount, '');
	if(data.success == 'false') contact.showMessage('messageAddContact', 'modalAddElementProvider', "No se pudo Agregar el contacto<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		$('#modalAddElementProvider').modal('hide');
		loadProviders();
		seeContacts(1, dataAndAccount.idProvider, true);
		contact.showMessage('msElement', 'msElement', "Se Agrego con exito el contacto!", 'success', 'modal', true);
		cancelEditElement();
	}
}

function ApprovedAddProductService() {
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode, 
		"name":changeNameFirstUpperCase($('#nameAddPS').val()),
		"description":$('#descAddPS').val(),
		"price":$('#priceAddPS').val(),
		"idProvider":$('#idProviderAddPS').val()
	};

	var productService = newDinamicOWS(false);

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		productService.showMessage('messageAddPS', 'modalAddElementProvider', "Ingrese un nombre de producto o servicio", 'warning', 'modal', true);
		return;
	}

	if(numberValidation(dataAndAccount.price, true, true) == false){
		productService.showMessage('messageAddPS', 'modalAddElementProvider', "el precio ingresado no es valido", 'warning', 'modal', true);
		return;
	}

	//console.log(dataAndAccount);
	var data = productService.add(createProductServiceService ,dataAndAccount, '');
	if(data.success == 'false') productService.showMessage('messageAddPS', 'modalAddElementProvider', "No se pudo Agregar el producto o servicio<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		$('#modalAddElementProvider').modal('hide');
		loadProviders();
		seeProductServices(1, dataAndAccount.idProvider, true);
		productService.showMessage('msElement', 'msElement', "Se Agrego con exito el Producto o servicio!", 'success', 'modal', true);
		cancelEditElement();
	}
}

//others
function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}