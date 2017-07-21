
$(document).ready(function () {
	loadProveedores();
	loadCities();
	$(".filter").keyup(function () { listProviders() });
	$('.filter').focus();
});

var proveedores = {};
var ciudades = {};

function loadProveedores() {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode };
	var prov = newDinamicOWS(false);
	var data = prov.get(providersList, dataAndAccount, 'NIT', 'providers');
	if (data.success == 'false') {
		prov.showMessage('msCRUDProvider', 'nameEmployed', 'No se pudo cargar los Clientes<br><strong>Motivo: </strong>' + data.status, 'danger', 'default', true);
	} else {
		proveedores = prov.dataArray;
		console.log(proveedores);
		listProviders();
	}
}

function loadCities() {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode };
	var city = newDinamicOWS(false);
	var data = city.get(citysListService, dataAndAccount, 'name', 'cities');
	if (data.success == 'false') {
		city.showMessage('msCRUDProvider', 'nameEmployed', 'No se pudo cargar las ciudades<br><strong>Motivo: </strong>' + data.status, 'danger', 'default', true);
	} else {
		ciudades = city.dataArray;
	}
}

function listProviders() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content += '<tr><th>NIT</th><th>Nombre</th><th>Editar</th><th>Borrar</th><th>Ver</th><th>Contacto</th><th>Dirección</th><th>Producto/Servicio</th></tr>';
	var data = "";
	for (var i = 0; i < proveedores.length; i++) {
		var usuario = (proveedores[i].name).toUpperCase();
		if (find == "" || usuario.indexOf(find) != -1) {
			data += '<tr>';
			data += '<td>' + proveedores[i].NIT + '</td>';
			data += '<td>' + proveedores[i].name + '</td>';
			data += '<td onclick="editProvider(' + proveedores[i].idProvider + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="deleteProvider(' + proveedores[i].idProvider + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="verProvider(' + proveedores[i].idProvider + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="ContactProvider(' + proveedores[i].idProvider + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="addressProvider(' + proveedores[i].idProvider + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span></button></center></td>';
			data += '<td onclick="ProductServiceProvider(' + proveedores[i].idProvider + ')"><center><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span></button></center></td>';
			data += '</tr>';
		}
	};
	if (data == "") {
		$('#msfind').html("No se encontraron proveedores");
	} else { $('#msfind').html(""); }
	content += data + '</table>';
	$('#lista').html(content);
}
/*Funciones de Editar Proveedor */
function editProvider(idProvider) {
	var proveedor = findElement(proveedores, 'idProvider', idProvider);
	$('#idProviderEdit').val(idProvider);
	$('#nitEdit').val(proveedor.NIT);
	$('#nameEdit').val(proveedor.name);
	$('#descriptionEdit').val(proveedor.description);
	$('#dvEdit').val(proveedor.DV);
	$('#myModalEdit').modal('show');
}

function approvedEditProvider() {
	var providerUpDate = newDinamicOWS(false);
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idProvider": $('#idProviderEdit').val(),
		"nit": $('#nitEdit').val(),
		"name": $('#nameEdit').val(),
		"description": $('#descriptionEdit').val(),
		"DV": $('#dvEdit').val()
	};

	if (notBlakSpaceValidation(dataAndAccount.nit) == false) {
		providerUpDate.showMessage('msProviderEdit', 'nameEmployed', "Ingresa el nit.", 'warning', 'default', true);
		return;
	}
	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		providerUpDate.showMessage('msProviderEdit', 'nameEmployed', "Ingresa el nombre.", 'warning', 'default', true);
		return;
	}
	if (notBlakSpaceValidation(dataAndAccount.description) == false) {
		providerUpDate.showMessage('msProviderEdit', 'nameEmployed', "Ingresa una breve descripción.", 'warning', 'default', true);
		return;
	}
	if (dvValidation(dataAndAccount.DV) == false) {
		providerUpDate.showMessage('msProviderEdit', 'nameEmployed', "Ingresa un DV valido.", 'warning', 'default', true);
		return;
	}
	var data = providerUpDate.set(editProviderService, dataAndAccount, '');
	if (data.success == 'false') {
		providerUpDate.showMessage('msProviderEdit', 'nameEmployed', 'No se pudo editar el proveedor.<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#myModalEdit').modal('hide');
		loadProveedores();
		providerUpDate.showMessage('msCRUDProvider', 'nameEmployed', 'Se editó el proveedor con éxito:', 'success', 'default', true);
	}
}

/*Funciones de Borrar Proveedor */
function deleteProvider(idProvider) {
	var proveedor = findElement(proveedores, 'idProvider', idProvider);
	var data = "";
	data += '<div class="modal-body">';
	data += '<div id="msDeleteProvider"></div>';
	data += '<p>Está a punto de eliminar el Proveedor con los siguientes datos: </p>';
	data += '<div class="panel panel-default"><div class="panel-heading">Proveedor</div>';
	data += '<div class="panel-body">';
	data += '<p><strong>Nit: </strong><span>' + proveedor.NIT + '</span></p>';
	data += '<p><strong>Nombre: </strong><span>' + proveedor.name + '</span></p>';
	data += '<p><strong>Descripción: </strong><span>' + proveedor.description + '</span></p>';
	data += '<p><strong>DV: </strong><span">' + proveedor.DV + '</span></p>';
	data += '</div></div>';
	data += '<p>Esta acción es irreversible, ¿desea continuar?</p>';
	data += '</div><div class="modal-footer">';
	data += '<button type="button" class="btn btn-primary" onclick="approvedDeleteProvider(' + idProvider + ')">Continuar, Eliminar el proveedor</button>';
	data += '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
	data += '</div>';
	$('#bodyModalDelete').html(data);
	$('#myModalDelete').modal('show');
}

function approvedDeleteProvider(idProvider) {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode, "idProvider": idProvider };
	var proveedor = newDinamicOWS(false);
	var data = proveedor.remove(deleteProviderService, dataAndAccount, '');
	if (data.success == 'false') {
		$('#myModalDelete').modal('hide');
		proveedor.showMessage('msCRUDProvider', 'msCRUDProvider', 'No se pudo eliminar el proveedor<br><strong>Motivo: </strong>' + data.status, 'warning', 'modal', true);
	} else {
		$('#myModalDelete').modal('hide');
		proveedor.showMessage('msCRUDProvider', 'nameEmployed', 'Se eliminó el proveedor con éxito!', 'success', 'default', true);
		loadProveedores();
	}
}

/*funciones ver cliente */
function verClient(idCliente) {
	var cliente = findElement(proveedores, 'idClient', idCliente);
	var address = "";
	var contacts = "";

	$('#nitClienteSee').text(cliente.NIT);
	$('#nameClienteSeee').text(cliente.name);
	$('#descriptionClientSee').text(cliente.description);
	$('#dvClienteSee').text(cliente.DV);

	for (var i = 0; i < cliente.direcciones.length; i++) {
		address += '<li class="list-group-item">' + cliente.direcciones[i].direccion + '<br>' + cliente.direcciones[i].ciudad + '</li>';
	};
	for (var i = 0; i < cliente.contactos.length; i++) {
		contacts += '<li class="list-group-item">' + cliente.contactos[i].name + '<br>' + cliente.contactos[i].email + '<br>' + cliente.contactos[i].phoneNumber + '</li>';
	};
	$('#listaDireccionesAcordeon').html(address);
	$('#listaContactosAcordeon').html(contacts);
}

/**Funciones de Direcciones */
function addressProvider(id) {
	var proveedor = findElement(proveedores, 'idProvider', id);
	$('#idProviderAddress').val(id);
	$('#titleModalDireccionesProvider').html("Direcciones de " + proveedor.name);
	crearDireccionProvider();
	$('#direccionesModalProvider').modal('show');
}

function loadUpdateAddressProvider(idAddress) {
	if (idAddress == 0) {
		$('#direccionEditarProvider').val("");
		$('#ciudadesAddressListEditProvider option[value="0"]').prop('selected', 'selected');
		return;
	}
	var proveedor = findElement(proveedores, 'idProvider', $('#idProviderAddress').val());
	var direccion = findElement(proveedor.address, 'idAddress', idAddress);
	$('#direccionEditarProvider').val(direccion.direccion);
	$("#ciudadesAddressListEditProvider option").filter(function () { return $(this).text() == '' + direccion.ciudad + ''; }).prop("selected", true);
}

function loadDeleteAddressProvider(idAddress) {
	var proveedor = findElement(proveedores, 'idProvider', $('#idProviderAddress').val());
	var direccion = findElement(proveedor.address, 'idAddress', idAddress);
	var data = "";
	if (idAddress == 0) {
		data += '<p><strong>Dirección: </strong><span></span></p>';
		data += '<p><strong>Ciudad: </strong><span></span></p>';
		$('#showDeleteAddressProviderView').html(data);
		return;
	}
	data += '<p><strong>Dirección: </strong><span>' + direccion.direccion + '</span></p>';
	data += '<p><strong>Ciudad: </strong><span>' + direccion.ciudad + '</span></p>';
	$('#showDeleteAddressProviderView').html(data);
}

function borrarDireccionProvider() {
	var proveedor = findElement(proveedores, 'idProvider', $('#idProviderAddress').val());
	$("#liBorrarDireccionProvider").addClass("active");
	$("#liCrearDireccionProvider").removeClass("active");
	$("#liEditarDireccionProvider").removeClass("active");

	var data = "";
	data += '<form action="javascript:approvedDeleteAddressProvider()">';
	data += '<div class="form-group">';
	data += '<h3>Borrar dirección</h3>';
	data += '<p>Selecciona una dirección para borrarla.</p>';
	data += '<label>Direcciones</label>';
	data += '<select class="form-control" id="addressDeleteListProvider">';
	data += '<option value="0" onclick="loadDeleteAddressProvider(0)">-- Seleccione la Dirección --</option>';
	for (var i = 0; i < proveedor.address.length; i++) {
		data += '<option value="' + proveedor.address[i].idAddress + '" onclick="loadDeleteAddressProvider(' + proveedor.address[i].idAddress + ')">' + proveedor.address[i].direccion + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '<div id="showDeleteAddressProviderView"></div>';
	data += '<div class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button class="btn btn-primary" type="submit">Confirmar Borrardo</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#addressCrudProvider').html(data);
}

function editarDireccionProvider() {
	var proveedor = findElement(proveedores, 'idProvider', $('#idProviderAddress').val());
	$("#liEditarDireccionProvider").addClass("active");
	$("#liCrearDireccionProvider").removeClass("active");
	$("#liBorrarDireccionProvider").removeClass("active");
	var data = "";
	data += '<form action="javascript:approvedEditAddressProvider()">';
	data += '<div class="form-group">';
	data += '<h3>Editar Dirección</h3>';
	data += '<p>Selecciona una dirección para editarla.</p>';
	data += '<label>Direcciones</label>';
	data += '<select class="form-control" id="addressEditProvider">';
	data += '<option value="0" onclick="loadUpdateAddressProvider(0)">-- Seleccione la dirección --</option>';
	for (var i = 0; i < proveedor.address.length; i++) {
		data += '<option value="' + proveedor.address[i].idAddress + '" onclick="loadUpdateAddressProvider(' + proveedor.address[i].idAddress + ')">' + proveedor.address[i].direccion + '</option>';
	};
	data += '</select>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Dirección</label>';
	data += '<input type="text" class="form-control" id="direccionEditarProvider" placeholder="Dirección" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label>Ciudades</label>';
	data += '<select class="form-control" id="ciudadesAddressListEditProvider">';
	data += '<option value="0">-- Seleccionela ciudad --</option>';
	for (var i = 0; i < ciudades.length; i++) {
		data += '<option value="' + ciudades[i].idCity + '">' + ciudades[i].name + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '<div class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button type="submit" class="btn btn-primary">Editar Dirección</button>';
	data += '</div>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#addressCrudProvider').html(data);
}

function crearDireccionProvider() {
	$("#liCrearDireccionProvider").addClass("active");
	$("#liEditarDireccionProvider").removeClass("active");
	$("#liBorrarDireccionProvider").removeClass("active");
	var data = "";
	data += '<form action="javascript:approvedCreateAddressProvider()">';
	data += '<h3>Crear Dirección</h3>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Dirección</label>';
	data += '<input type="text" class="form-control" id="direccionCrearProvider" placeholder="Dirección" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label>Ciudades</label>';
	data += '<select class="form-control" id="ciudadesAddressListProvider">';
	data += '<option value="0">-- Seleccionela ciudad --</option>';
	for (var i = 0; i < ciudades.length; i++) {
		data += '<option value="' + ciudades[i].idCity + '">' + ciudades[i].name + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '<div class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button type="submit" class="btn btn-primary">Crear Dirección</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#addressCrudProvider').html(data);
};

function approvedCreateAddressProvider() {
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"address": $('#direccionCrearProvider').val(),
		"idCity": $('#ciudadesAddressListProvider').val(),
		"idProvider": $('#idProviderAddress').val()
	};
	var address = newDinamicOWS(false);
	if ($('#ciudadesAddressListProvider').val() == 0) {
		address.showMessage('msCRUDAddressProvider', 'nameEmployed', "Selecciona una ciudad.", 'warning', 'default', true);
		return;
	}
	if (notBlakSpaceValidation(dataAndAccount.address) == false) {
		address.showMessage('msCRUDAddressProvider', 'nameEmployed', "Ingresa una dirección.", 'warning', 'default', true);
		return;
	}
	var data = address.add(createAddressService, dataAndAccount, '');
	if (data.success == 'false') {
		address.showMessage('msCRUDAddressProvider', 'nameEmployed', 'No se pudo crear la dirección<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#direccionesModalProvider').modal('hide');
		loadProveedores();
		address.showMessage('msCRUDProvider', 'nameEmployed', 'La dirección se creo con éxito:', 'success', 'default', true);
	}
}

function approvedEditAddressProvider() {
	var addressUpDate = newDinamicOWS(false);
	var idAddress = $('#addressEditProvider').val();

	if (idAddress == 0) {
		addressUpDate.showMessage('msCRUDAddressProvider', 'nameEmployed', "Selecciona una dirección valida.", 'warning', 'default', true);
		return;
	}

	var proveedor = findElement(proveedores, 'idClient', $('#idClientAddress').val());
	var direccion = findElement(proveedor.direcciones, 'idAddress', idAddress);

	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idAddress": direccion.idAddress,
		"address": $('#direccionEditarProvider').val(),
		"idCity": $('#ciudadesAddressListEditProvider').val(),
		"idProvider": $('#idProviderAddress').val()
	};

	if (notBlakSpaceValidation(dataAndAccount.address) == false) {
		addressUpDate.showMessage('msCRUDAddress', 'nameEmployed', "Ingresa una dirección", 'warning', 'default', true);
		return;
	}

	var data = addressUpDate.set(editAddressService, dataAndAccount, '');
	if (data.success == 'false') {
		addressUpDate.showMessage('msCRUDAddressProvider', 'nameEmployed', 'No se pudo editar la dirección<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#direccionesModalProvider').modal('hide');
		loadProveedores();
		addressUpDate.showMessage('msCRUDProvider', 'nameEmployed', 'Se editó la dirección con éxito:', 'success', 'default', true);
	}

}

function approvedDeleteAddressProvider() {
	var addressDelete = newDinamicOWS(false);
	var idAddress = $('#addressDeleteListProvider').val();
	if (idAddress == 0) {
		addressDelete.showMessage('msCRUDAddressProvider', 'nameEmployed', 'Selecciona una dirección valida.', 'warning', 'default', true);
		return;
	}
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idAddress": idAddress
	};
	var data = addressDelete.remove(deleteAddressService, dataAndAccount, '');
	if (data.success == 'false') {
		addressDelete.showMessage('msCRUDAddressProvider', 'nameEmployed', 'No se pudo borrar la dirección<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#direccionesModalProvider').modal('hide');
		loadProveedores();
		addressDelete.showMessage('msCRUDProvider', 'nameEmployed', 'La dirección se ha borrado con éxito.', 'success', 'default', true);
	}
}

/**Funciones de contacto*/
function ContactProvider(id) {
	var proveedor = findElement(proveedores, 'idProvider', id);
	$('#idProviderContact').val(id);
	$('#titleModalContactProvider').html("Contactos de " + proveedor.name);
	crearContactoProvider();
	$('#contactosModalProvider').modal('show');
}

function crearContactoProvider() {
	$("#liCrearContactoProvider").addClass("active");
	$("#liEditarContactoProvider").removeClass("active");
	$("#liBorrarContactoProvider").removeClass("active");
	var data = "";
	data += '<form action="javascript:approvedCreateContactProvider()">';
	data += '<h3>Crear Contacto</h3>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Nombre</label>';
	data += '<input type="text" class="form-control" id="nombreContactoCrearProvider" placeholder="Nombre" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Correo Electronico</label>';
	data += '<input type="email" class="form-control" id="emailContactoCrearProvider" placeholder="Email" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Telefono</label>';
	data += '<input type="text" class="form-control" id="telefonoContactoCrearProvider" placeholder="Telefono" required>';
	data += '</div>';
	data += '<div class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button type="submit" class="btn btn-primary">Crear</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#contactCrudProvider').html(data);
};

function editarContactoProvider() {
	var proveedor = findElement(proveedores, 'idClient', $('#idClientContact').val());
	$("#liEditarContactoProvider").addClass("active");
	$("#liCrearContactoProvider").removeClass("active");
	$("#liBorrarContactoProvider").removeClass("active");
	var data = "";
	data += '<form action="javascript:approvedEditContactProvider()">';
	data += '<div class="form-group">';
	data += '<h3>Editar Contacto</h3>';
	data += '<p>Selecciona un contacto para editarlo.</p>';
	data += '<label>Contactos</label>';
	data += '<select class="form-control" id="contactEditProvider">';
	data += '<option value="0" onclick="loadUpdateContactProvider(0)">-- Seleccione el Contacto --</option>';
	for (var i = 0; i < proveedor.contacts.length; i++) {
		data += '<option value="' + proveedor.contacts[i].idContact + '" onclick="loadUpdateContactProvider(' + proveedor.contacts[i].idContact + ')">' + proveedor.contacts[i].name + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Nombre</label>';
	data += '<input type="text" class="form-control" id="nombreContactoEditarProvider" placeholder="Nombre" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Correo Electronico</label>';
	data += '<input type="email" class="form-control" id="emailContactoEditarProvider" placeholder="Email" required>';
	data += '</div>';
	data += '<div class="form-group">';
	data += '<label for="inputForm">Telefono</label>';
	data += '<input type="text" class="form-control" id="telefonoContactoEditarProvider" placeholder="Telefono" required>';
	data += '</div>';
	data += '<div class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button type="submit" class="btn btn-primary">Editar</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#contactCrudProvider').html(data);
}

function borrarContactoProvider() {
	$("#liBorrarContactoProvider").addClass("active");
	$("#liEditarContactoProvider").removeClass("active");
	$("#liCrearContactoProvider").removeClass("active");
	var proveedor = findElement(proveedores, 'idProvider', $('#idProviderContact').val());
	var data = "";
	data += '<form action="javascript:approvedDeleteContactProvider()">';
	data += '<div class="form-group">';
	data += '<h3>Borrar Contacto</h3>';
	data += '<p>Selecciona un contacto para borrarlo.</p>';
	data += '<label>Contactos</label>';
	data += '<select class="form-control" id="contactDeleteListProvider">';
	data += '<option value="0" onclick="showDeleteContactProvider(0)">-- Seleccione el Contacto --</option>';
	for (var i = 0; i < proveedor.contacts.length; i++) {
		data += '<option value="' + proveedor.contacts[i].idContact + '" onclick="showDeleteContactProvider(' + proveedor.contacts[i].idContact + ')">' + proveedor.contacts[i].name + '</option>';
	};
	data += '</select>';
	data += '</div>';
	data += '<div id="showDeleteContactView"></div>';
	data += '<div class="btn-group btn-group-justified" role="group" aria-label="...">';
	data += '<div class="btn-group" role="group">';
	data += '<button class="btn btn-primary" type="submit">Confirmar Borrardo</button>';
	data += '</div>';
	data += '</div>';
	data += '</form>';
	$('#contactCrudProvider').html(data);
}

function showDeleteContactProvider(idContact) {
	var data = "";
	if (idContact == 0) {
		data += '<p><strong>Nombre: </strong><span></span></p>';
		data += '<p><strong>Correo: </strong><span></span></p>';
		data += '<p><strong>Telefono: </strong><span></span></p>';
		$('#showDeleteContactView').html(data);
		return;
	}
	var proveedor = findElement(proveedores, 'idClient', $('#idClientContact').val());
	var contacto = findElement(proveedor.contacts, 'idContact', idContact);

	data += '<p><strong>Nombre: </strong><span>' + contacto.name + '</span></p>';
	data += '<p><strong>Correo: </strong><span>' + contacto.email + '</span></p>';
	data += '<p><strong>Telefono: </strong><span>' + contacto.phoneNumber + '</span></p>';
	$('#showDeleteContactView').html(data);
}

function approvedDeleteContactProvider() {
	var contactDelete = newDinamicOWS(false);
	var idContact = $('#contactDeleteListProvider').val();
	if (idContact == 0) {
		contactDelete.showMessage('msCRUDContactProvider', 'nameEmployed', 'Selecciona un contacto valido.', 'warning', 'default', true);
		return;
	}
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idContact": idContact
	};
	var data = contactDelete.remove(deleteContactService, dataAndAccount, '');
	if (data.success == 'false') {
		contactDelete.showMessage('msCRUDContactProvider', 'nameEmployed', 'No se pudo borrar el contacto<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#contactosModalProvider').modal('hide');
		loadProveedores();
		contactDelete.showMessage('msCRUDProvider', 'nameEmployed', 'El contacto se ha borrado con éxito.', 'success', 'default', true);
	}
}

function approvedEditContactProvider() {
	var contactUpDate = newDinamicOWS(false);
	var idContact = $('#contactEditProvider').val();

	if (idContact == 0) {
		contactUpDate.showMessage('msCRUDContactProvider', 'nameEmployed', "Selecciona un Contacto valido.", 'warning', 'default', true);
		return;
	}

	var proveedor = findElement(proveedores, 'idProvider', $('#idProviderContact').val());
	var contacto = findElement(proveedor.contacts, 'idContact', idContact);

	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idProvider": contacto.idProvider,
		"idContact": contacto.idContact,
		"name": $('#nombreContactoEditarProvider').val(),
		"email": $('#emailContactoEditarProvider').val(),
		"phoneNumber": $('#telefonoContactoEditarProvider').val()
	};

	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		contactUpDate.showMessage('msCRUDContactProvider', 'nameEmployed', "Ingresa un nombre", 'warning', 'default', true);
		return;
	}

	if (emailValidation(dataAndAccount.email) == false) {
		contactUpDate.showMessage('msCRUDContactProvider', 'nameEmployed', "Ingrese un correo valido", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.phoneNumber) == false) {
		contactUpDate.showMessage('msCRUDContactProvider', 'nameEmployed', "Ingrese un telefono valido.", 'warning', 'default', true);
		return;
	}

	var data = contactUpDate.set(editContactService, dataAndAccount, '');
	if (data.success == 'false') {
		contactUpDate.showMessage('msCRUDContactProvider', 'nameEmployed', 'No se pudo editar el contacto<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#contactosModalProvider').modal('hide');
		loadProveedores();
		contactUpDate.showMessage('msCRUDProvider', 'nameEmployed', 'Se editó el contacto con éxito:', 'success', 'default', true);
	}

}

function loadUpdateContactProvider(idContact) {
	if (idContact == 0) {
		$('#nombreContactoEditarProvider').val("");
		$('#emailContactoEditarProvider').val("");
		$('#telefonoContactoEditarProvider').val("");
		return;
	}
	var proveedor = findElement(proveedores, 'idProvider', $('#idProviderContact').val());
	var contacto = findElement(proveedor.contacts, 'idContact', idContact);
	$('#nombreContactoEditarProvider').val(contacto.name);
	$('#emailContactoEditarProvider').val(contacto.email);
	$('#telefonoContactoEditarProvider').val(contacto.phoneNumber);
}

function approvedCreateContactProvider() {
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idProvider": $('#idProviderContact').val(),
		"name": $('#nombreContactoCrearProvider').val(),
		"email": $('#emailContactoCrearProvider').val(),
		"phoneNumber": $('#telefonoContactoCrearProvider').val()
	};

	var provider = newDinamicOWS(false);

	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		provider.showMessage('msCRUDContactProvider', 'nameEmployed', "Ingresa un nombre.", 'warning', 'default', true);
		return;
	}

	if (emailValidation(dataAndAccount.email) == false) {
		provider.showMessage('msCRUDContactProvider', 'nameEmployed', "Ingrese un correo valido.", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.phoneNumber) == false) {
		provider.showMessage('msCRUDContactProvider', 'nameEmployed', "Ingrese un telefono.", 'warning', 'default', true);
		return;
	}

	var data = provider.add(createContactService, dataAndAccount, '');
	if (data.success == 'false') {
		provider.showMessage('msCRUDContactProvider', 'nameEmployed', 'No se pudo crear el contacto<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#contactosModalProvider').modal('hide');
		loadProveedores();
		provider.showMessage('msCRUDProvider', 'nameEmployed', 'El contacto se creo con éxito:', 'success', 'default', true);
	}
}

/*Client functions */
function createProvider() {
	$('#myModalCreate').modal('show');
}

function approvedCreateProvider() {
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"nit": $('#nitCreate').val(),
		"name": changeNameFirstUpperCase($('#nameCreate').val()),
		"description": $('#descriptionCreate').val(),
		"dv": $('#dvCreate').val()
	};

	var provider = newDinamicOWS(false);

	if (notBlakSpaceValidation(dataAndAccount.nit) == false) {
		provider.showMessage('msClientCreate', 'nameEmployed', "El NIT ingresado no es valido", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		provider.showMessage('msClientCreate', 'nameEmployed', "Ingrese un nombre", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.description) == false) {
		provider.showMessage('msClientCreate', 'nameEmployed', "Ingrese un nombre de usuario", 'warning', 'default', true);
		return;
	}

	if (dvValidation(dataAndAccount.dv) == false) {
		provider.showMessage('msClientCreate', 'nameEmployed', "El digito de verificacion es incorrecto.", 'warning', 'default', true);
		return;
	}

	var data = provider.add(createProviderService, dataAndAccount, '');
	if (data.success == 'false') {
		provider.showMessage('msProviderCreate', 'nameEmployed', 'No se pudo crear el Proveedor<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#myModalCreate').modal('hide');
		loadProveedores();
		provider.showMessage('msCRUDProvider', 'nameEmployed', 'El Proveedor se creo con exito:', 'success', 'default', true);
	}
}

function closeModalCreate() {
	$('#myModalCreate').modal('hide');
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++) { var element = obj[i]; if (idCompare == element[attrib]) return element; } return null;
}