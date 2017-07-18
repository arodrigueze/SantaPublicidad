$(document).ready(function () {
	loadClientes();
	loadCities();
	$(".filter").keyup(function () { listClients() });
	$('.filter').focus();
});

var clientes = {};
var ciudades = {};

function loadClientes() {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode };
	var users = newDinamicOWS(false);
	var data = users.get(clientList, dataAndAccount, 'NIT', 'clientes');
	if (data.success == 'false') {
		users.showMessage('msCRUDClientes', 'nameEmployed', 'No se pudo cargar los Clientes<br><strong>Motivo: </strong>' + data.status, 'danger', 'default', true);
	} else {
		clientes = users.dataArray;
		console.log(clientes);
		listClients();
	}
}

function loadCities() {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode };
	var city = newDinamicOWS(false);
	var data = city.get(citysListService, dataAndAccount, 'name', 'cities');
	if (data.success == 'false') {
		city.showMessage('msCRUDClientes', 'nameEmployed', 'No se pudo cargar las ciudades<br><strong>Motivo: </strong>' + data.status, 'danger', 'default', true);
	} else {
		ciudades = city.dataArray;
		console.log(ciudades);
	}
}

function listClients() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content += '<tr><th>NIT</th><th>Nombre</th><th>Editar</th><th>Borrar</th><th>Ver</th><th>Contacto</th><th>Dirección</th></tr>';
	var data = "";
	for (var i = 0; i < clientes.length; i++) {
		var usuario = (clientes[i].name).toUpperCase();
		if (find == "" || usuario.indexOf(find) != -1) {
			data += '<tr>';
			data += '<td>' + clientes[i].NIT + '</td>';
			data += '<td>' + clientes[i].name + '</td>';
			data += '<td onclick="editClient(' + clientes[i].idClient + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="deleteClient(' + clientes[i].idClient + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="verClient(' + clientes[i].idClient + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="ContactClient(' + clientes[i].idClient + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="AddressClient(' + clientes[i].idClient + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span></button></center></td>';
			data += '</tr>';
		}
	};
	if (data == "") {
		$('#msfind').html("No se encontraron clientes");
	} else { $('#msfind').html(""); }
	content += data + '</table>';
	$('#lista').html(content);
}

/**Funciones de Direcciones */
function AddressClient(id) {
	var cliente = findElement(clientes, 'idClient', id);
	$('#idClientAddress').val(id);
	$('#titleModalDirecciones').html("Direcciones de " + cliente.name);
	crearDireccion();
	$('#direccionesModal').modal('show');
}

function editarDireccion() {
	var cliente = findElement(clientes, 'idClient', $('#idClientAddress').val());
	$("#liEditarDireccion").addClass("active");
	$("#liCrearDireccion").removeClass("active");
	$("#liBorrarDireccion").removeClass("active");
	var data = "";
	data += '<form action="javascript:approvedEditAddress()">';
	data += '<div class="form-group">';
	data += '<h3>Editar Dirección</h3>';
	data += '<p>Selecciona una dirección para editarla.</p>';
	data += '<label>Direcciones</label>';
	data += '<select class="form-control" id="addressEdit">';
	data += '<option value="0">-- Seleccione la dirección --</option>';
	for (var i = 0; i < cliente.direcciones.length; i++) {
		data += '<option value="' + cliente.direcciones[i].idAddress + '" onclick="loadUpdateContact(' + cliente.direcciones[i].idAddress + ')">' + cliente.direcciones[i].direccion + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '</form>';
	$('#addressCrud').html(data);
}

function crearDireccion() {
	$("#liCrearDireccion").addClass("active");
	$("#liEditarDireccion").removeClass("active");
	$("#liBorrarDireccion").removeClass("active");
	var data = "";
	data += '<form action="javascript:approvedCreateAddress()">';
	data += '<h3>Crear Dirección</h3>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Dirección</label>';
	data += '<input type="text" class="form-control" id="direccionCrear" placeholder="Dirección" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label>Ciudades</label>';
	data += '<select class="form-control" id="ciudadesAddressList">';
	data += '<option value="0">-- Seleccionela ciudad --</option>';
	for (var i = 0; i < ciudades.length; i++) {
		data += '<option value="' + ciudades[i].idCity + '">' + ciudades[i].name + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '<div id="controlModal" class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button type="submit" class="btn btn-primary">Crear Dirección</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#addressCrud').html(data);
};

function approvedCreateAddress() {

	var address = newDinamicOWS(false);

	if ($('#ciudadesAddressList').val() == 0) {
		address.showMessage('msCRUDAddress', 'nameEmployed', "Selecciona una ciudad.", 'warning', 'default', true);
		return;
	}

	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"address": $('#direccionCrear').val(),
		"idCity": $('#ciudadesAddressList').val(),
		"idClient": $('#idClientAddress').val()
	};

	if (notBlakSpaceValidation(dataAndAccount.address) == false) {
		address.showMessage('msCRUDAddress', 'nameEmployed', "Ingresa una dirección.", 'warning', 'default', true);
		return;
	}

	var data = address.add(createAddressService, dataAndAccount, '');

	if (data.success == 'false') {
		address.showMessage('msCRUDAddress', 'nameEmployed', 'No se pudo crear la dirección<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#direccionesModal').modal('hide');
		loadClientes();
		address.showMessage('msCRUDClientes', 'nameEmployed', 'La dirección se creo con éxito:', 'success', 'default', true);
	}
}

/**Funciones de contacto*/
function ContactClient(id) {
	var cliente = findElement(clientes, 'idClient', id);
	$('#idClientContact').val(id);
	$('#titleModalContact').html("Contactos de " + cliente.name);
	crearContacto();
	$('#contactosModal').modal('show');
}

function crearContacto() {
	$("#liCrearContacto").addClass("active");
	$("#liEditarContacto").removeClass("active");
	$("#liBorrarContacto").removeClass("active");
	var data = "";
	data += '<form action="javascript:approvedCreateContact()">';
	data += '<h3>Crear Contacto</h3>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Nombre</label>';
	data += '<input type="text" class="form-control" id="nombreContactoCrear" placeholder="Nombre" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Correo Electronico</label>';
	data += '<input type="email" class="form-control" id="emailContactoCrear" placeholder="Email" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Telefono</label>';
	data += '<input type="text" class="form-control" id="telefonoContactoCrear" placeholder="Telefono" required>';
	data += '</div>';
	data += '<div id="controlModal" class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button type="submit" class="btn btn-primary">Crear</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#contactCrud').html(data);
};

function editarContacto() {
	var cliente = findElement(clientes, 'idClient', $('#idClientContact').val());
	$("#liEditarContacto").addClass("active");
	$("#liCrearContacto").removeClass("active");
	$("#liBorrarContacto").removeClass("active");
	var data = "";
	data += '<form action="javascript:approvedEditContact()">';
	data += '<div class="form-group">';
	data += '<h3>Editar Contacto</h3>';
	data += '<p>Selecciona un contacto para editarlo.</p>';
	data += '<label>Contactos</label>';
	data += '<select class="form-control" id="contactEdit">';
	data += '<option value="0">-- Seleccione el Contacto --</option>';
	for (var i = 0; i < cliente.contactos.length; i++) {
		data += '<option value="' + cliente.contactos[i].idContact + '" onclick="loadUpdateContact(' + cliente.contactos[i].idContact + ')">' + cliente.contactos[i].name + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Nombre</label>';
	data += '<input type="text" class="form-control" id="nombreContactoEditar" placeholder="Nombre" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Correo Electronico</label>';
	data += '<input type="email" class="form-control" id="emailContactoEditar" placeholder="Email" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Telefono</label>';
	data += '<input type="text" class="form-control" id="telefonoContactoEditar" placeholder="Telefono" required>';
	data += '</div>';
	data += '<div id="controlModal" class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button type="submit" class="btn btn-primary">Editar</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#contactCrud').html(data);
}

function borrarContacto() {
	$("#liBorrarContacto").addClass("active");
	$("#liEditarContacto").removeClass("active");
	$("#liCrearContacto").removeClass("active");
	var cliente = findElement(clientes, 'idClient', $('#idClientContact').val());
	var data = "";
	data += '<form action="javascript:approvedDeleteContact()">';
	data += '<div class="form-group">';
	data += '<h3>Editar Contacto</h3>';
	data += '<p>Selecciona un contacto para borrarlo.</p>';
	data += '<label>Contactos</label>';
	data += '<select class="form-control" id="contactDeleteList">';
	data += '<option value="0">-- Seleccione el Contacto --</option>';
	for (var i = 0; i < cliente.contactos.length; i++) {
		data += '<option value="' + cliente.contactos[i].idContact + '" onclick="showDeleteContact(' + cliente.contactos[i].idContact + ')">' + cliente.contactos[i].name + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '<div id="showDeleteContactView"></div>';
	data += '<div id="controlModal" class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button class="btn btn-primary" type="submit">Confirmar Borrardo</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#contactCrud').html(data);
}

function showDeleteContact(idContact) {
	var contactDelete = newDinamicOWS(false);
	if (idContact == 0) {
		contactDelete.showMessage('msCRUDContact', 'nameEmployed', "Selecciona un Contacto.", 'warning', 'default', true);
		return;
	}
	var cliente = findElement(clientes, 'idClient', $('#idClientContact').val());
	var contacto = findElement(cliente.contactos, 'idContact', idContact);
	var data = "";
	data += '<p><strong>Nombre: </strong><span>' + contacto.name + '</span></p>';
	data += '<p><strong>Correo: </strong><span>' + contacto.email + '</span></p>';
	data += '<p><strong>Telefono: </strong><span>' + contacto.phoneNumber + '</span></p>';
	$('#showDeleteContactView').html(data);
}

function approvedDeleteContact() {
	var contactDelete = newDinamicOWS(false);
	var idContact = $('#contactDeleteList').val();
	if (idContact == 0) {
		contactDelete.showMessage('msCRUDContact', 'nameEmployed', 'Selecciona un contacto valido.', 'warning', 'default', true);
		return;
	}
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idContact": idContact
	};
	var data = contactDelete.remove(deleteContactService, dataAndAccount, '');
	if (data.success == 'false') {
		contactDelete.showMessage('msCRUDContact', 'nameEmployed', 'No se pudo borrar el contacto<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#contactosModal').modal('hide');
		loadClientes();
		contactDelete.showMessage('msCRUDClientes', 'nameEmployed', 'El contacto se ha borrado con éxito.', 'success', 'default', true);
	}
}

function approvedEditContact() {
	var contactUpDate = newDinamicOWS(false);
	var idContact = $('#contactEdit').val();

	if (idContact == 0) {
		contactUpDate.showMessage('msCRUDContact', 'nameEmployed', "Selecciona un Contacto valido.", 'warning', 'default', true);
		return;
	}

	var cliente = findElement(clientes, 'idClient', $('#idClientContact').val());
	var contacto = findElement(cliente.contactos, 'idContact', idContact);

	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idClient": contacto.idClient,
		"idContact": contacto.idContact,
		"name": $('#nombreContactoEditar').val(),
		"email": $('#emailContactoEditar').val(),
		"phoneNumber": $('#telefonoContactoEditar').val()
	};

	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		contactUpDate.showMessage('msCRUDContact', 'nameEmployed', "Ingresa un nombre", 'warning', 'default', true);
		return;
	}

	if (emailValidation(dataAndAccount.email) == false) {
		contactUpDate.showMessage('msCRUDContact', 'nameEmployed', "Ingrese un correo valido", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.phoneNumber) == false) {
		contactUpDate.showMessage('msCRUDContact', 'nameEmployed', "Ingrese un telefono valido.", 'warning', 'default', true);
		return;
	}

	var data = contactUpDate.set(editContactService, dataAndAccount, '');
	if (data.success == 'false') {
		contactUpDate.showMessage('msCRUDContact', 'nameEmployed', 'No se pudo editar el contacto<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#contactosModal').modal('hide');
		loadClientes();
		contactUpDate.showMessage('msCRUDClientes', 'nameEmployed', 'Se editó el contacto con exito:', 'success', 'default', true);
	}

}

function loadUpdateContact(idContact) {
	if (idContact == 0) return;
	var cliente = findElement(clientes, 'idClient', $('#idClientContact').val());
	var contacto = findElement(cliente.contactos, 'idContact', idContact);
	console.log("Datos carga form update " + contacto.name + " " + contacto.email + " " + contacto.phoneNumber);
	$('#nombreContactoEditar').val(contacto.name);
	$('#emailContactoEditar').val(contacto.email);
	$('#telefonoContactoEditar').val(contacto.phoneNumber);
}

function approvedCreateContact() {
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idClient": $('#idClientContact').val(),
		"name": $('#nombreContactoCrear').val(),
		"email": $('#emailContactoCrear').val(),
		"phoneNumber": $('#telefonoContactoCrear').val()
	};

	var contact = newDinamicOWS(false);

	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		contact.showMessage('msCRUDContact', 'nameEmployed', "Ingresa un nombre.", 'warning', 'default', true);
		return;
	}

	if (emailValidation(dataAndAccount.email) == false) {
		contact.showMessage('msCRUDContact', 'nameEmployed', "Ingrese un correo valido.", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.phoneNumber) == false) {
		contact.showMessage('msCRUDContact', 'nameEmployed', "Ingrese un telefono.", 'warning', 'default', true);
		return;
	}

	console.log("Los datos son: " + dataAndAccount.name + " " + dataAndAccount.email + " " + dataAndAccount.phoneNumber + " " + dataAndAccount.idClient);

	var data = contact.add(createContactService, dataAndAccount, '');
	if (data.success == 'false') {
		contact.showMessage('msCRUDContact', 'nameEmployed', 'No se pudo crear el contacto<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#contactosModal').modal('hide');
		loadClientes();
		contact.showMessage('msCRUDClientes', 'nameEmployed', 'El contacto se creo con éxito:', 'success', 'default', true);
	}
}

/*Client functions */
function createClient() {
	$('#myModalCreate').modal('show');
}

function approvedCreateClient() {
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"nit": $('#nitCreate').val(),
		"name": changeNameFirstUpperCase($('#nameCreate').val()),
		"description": $('#descriptionCreate').val(),
		"dv": $('#dvCreate').val()
	};

	var client = newDinamicOWS(false);

	if (notBlakSpaceValidation(dataAndAccount.nit) == false) {
		client.showMessage('msClientCreate', 'nameEmployed', "El NIT ingresado no es valido", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		client.showMessage('msClientCreate', 'nameEmployed', "Ingrese un nombre", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.description) == false) {
		client.showMessage('msClientCreate', 'nameEmployed', "Ingrese un nombre de usuario", 'warning', 'default', true);
		return;
	}

	console.log("Los datos son: " + dataAndAccount.dv + " " + dataAndAccount.description + " " + dataAndAccount.name + " " + dataAndAccount.nit);
	if (dvValidation(dataAndAccount.dv) == false) {
		client.showMessage('msClientCreate', 'nameEmployed', "El digito de verificacion es incorrecto.", 'warning', 'default', true);
		return;
	}

	var data = client.add(createClientService, dataAndAccount, '');
	if (data.success == 'false') {
		client.showMessage('msMyUserCreate', 'nameEmployed', 'No se pudo crear el Cliente<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#myModalCreate').modal('hide');
		loadClientes();
		client.showMessage('msCRUDClientes', 'nameEmployed', 'El Cliente se Creo con exito:', 'success', 'default', true);
	}
}

function closeModalCreate() {
	$('#myModalCreate').modal('hide');
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++) { var element = obj[i]; if (idCompare == element[attrib]) return element; } return null;
}