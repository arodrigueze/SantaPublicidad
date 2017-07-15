$(document).ready(function () {
	loadUsuarios();
	loadAreas();
	loadRolles();
	$(".filter").keyup(function () { listUsers() });
	$('.filter').focus();
});

var usuarios = {};

function loadUsuarios() {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode };
	var users = newDinamicOWS(false);
	var data = users.get(userList, dataAndAccount, 'name', 'users');
	if (data.success == 'false') {
		users.showMessage('msCRUDUsuarios', 'nameEmployed', 'No se pudo cargar los Usuarios<br><strong>Motivo: </strong>' + data.status, 'danger', 'default', true);
	} else {
		usuarios = users.dataArray;
		listUsers();
	}
}

function listUsers() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content += '<tr><th>Usuario</th><th>Nombre</th><th>Editar</th><th>Borrar</th><th>Ver</th></tr>';
	var data = "";
	for (var i = 0; i < usuarios.length; i++) {
		var usuario = (usuarios[i].name).toUpperCase();
		if (find == "" || usuario.indexOf(find) != -1) {
			data += '<tr>';
			data += '<td>' + usuarios[i].name + '</td>';
			data += '<td>' + usuarios[i].username + '</td>';
			data += '<td onclick="editUser(' + usuarios[i].iduser + ')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
			data += '<td onclick="deleteUser(' + usuarios[i].iduser + ')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
			data += '<td onclick="verUser(' + usuarios[i].iduser + ')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></button></td>';
			data += '</tr>';
		}
	};
	if (data == "") {
		$('#msfind').html("No se encontraron Usuarios");
	} else { $('#msfind').html(""); }
	content += data + '</table>';
	$('#lista').html(content);
}

function createUser() {
	$('#myModalCreate').modal('show');
}

function editUser(idUser) {
	var user = findElement(usuarios, 'iduser', idUser);
	loadUserInForm(user);
	$('#myModalEdit').modal('show');
}

function deleteUser(idUser) {
	var user = findElement(usuarios, 'iduser', idUser);
	data = '';
	data += '<div class="modal-body">';
	data += '<div id="msDeleteUser"></div>';
	data += '<p>Está a punto de eliminar el Usuario con los siguientes datos: </p>';
	data += '<div class="panel panel-default"><div class="panel-heading">Usuario</div>';
	data += '<div class="panel-body">';
	data += '<p><strong>Cedula: </strong><span>' + user.document + '</span></p>';
	data += '<p><strong>Nombre: </strong><span>' + user.name + '</span></p>';
	data += '<p><strong>Coreo electrónico: </strong><span>' + user.email + '</span></p>';
	data += '<p><strong>Nombre de usuario: </strong><span>' + user.username + '</span></p>';
	data += '<p><strong>Area: </strong><span>' + user.area + '</span></p>';
	data += '<p><strong>Roll: </strong><span>' + user.roll + '</span></p>';
	data += '</div></div>';
	data += '<p>está accion es irreversible, ¿desea continuar?</p>';
	data += '</div><div class="modal-footer">';
	data += '<button type="button" class="btn btn-primary" onclick="approvedDeleteUser(' + idUser + ')">Continuar, Eliminar el Usuario</button>';
	data += '<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
	data += '</div>';
	$('#bodyModalDelete').html(data);
	$('#myModalDelete').modal('show');
}

function verUser(idUser) {
	var user = findElement(usuarios, 'iduser', idUser);
	$('#documentSee').html(user.document);
	$('#nameSee').html(user.name);
	$('#emailSee').html(user.email);
	$('#usernameSee').html(user.username);
	$('#areaSee').html(user.area);
	$('#rollSee').html(user.roll);
}

function approvedDeleteUser(idUser) {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode, "idUser": idUser };
	var user = newDinamicOWS(false);
	var data = user.remove(deleteUserService, dataAndAccount, '');
	if (data.success == 'false') {
		$('#myModalDelete').modal('hide');
		user.showMessage('msCRUDUsuarios', 'msCRUDUsuarios', 'No se pudo eliminar el usuario<br><strong>Motivo: </strong>' + data.status, 'warning', 'modal', true);
	} else {
		$('#myModalDelete').modal('hide');
		user.showMessage('msCRUDUsuarios', 'nameEmployed', 'Se eliminó el usuario con éxito!', 'success', 'default', true);
		loadUsuarios();
	}
}

function loadUserInForm(user) {
	$('#idUserEdit').val(user.iduser);
	$('#documentEdit').val(user.document);
	$('#nameEdit').val(user.name);
	$('#usernameEdit').val(user.username);
	$('#passEdit').val("");
	$('#emailEdit').val(user.email);
	$("#areaListEdit option").filter(function () { return $(this).text() == '' + user.area + ''; }).prop("selected", true);
	$("#rollListEdit option").filter(function () { return $(this).text() == '' + user.roll + ''; }).prop("selected", true);
}



function loadAreas() {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode };
	var areas = newDinamicOWS(false);
	var data = areas.get(areaList, dataAndAccount, 'name', 'areas');
	if (data.success == 'false') {
		areas.showMessage('msCRUDUsuarios', 'nameEmployed', data.status, 'danger', 'default', true);
	} else {
		var data1 = '<option value="0">-- Seleccione la Area --</option>';
		var idArea = 0;
		for (var i = 0; i < areas.dataArray.length; i++) {
			data1 += '<option value="' + areas.dataArray[i].idArea + '">' + areas.dataArray[i].name + '</option>';
		}
		$('#areaListEdit').html(data1);
		$('#areaListEdit').val(idArea);
		$('#areaListCreate').html(data1);
		$('#areaListCreate').val(idArea);
	}
}

function loadRolles() {
	var dataAndAccount = { "username": sessionStorage.username, "logincode": sessionStorage.logincode };
	var rolles = newDinamicOWS(false);
	var data = rolles.get(rollList, dataAndAccount, 'name', 'roles');
	if (data.success == 'false') {
		rolles.showMessage('msCRUDUsuarios', 'nameEmployed', data.status, 'danger', 'default', true);
	} else {
		var data1 = '<option value="0">-- Seleccione el roll --</option>';
		var idRoll = 0;
		for (var i = 0; i < rolles.dataArray.length; i++) {
			data1 += '<option value="' + rolles.dataArray[i].idRol + '">' + rolles.dataArray[i].name + '</option>';
		};
		$('#rollListEdit').html(data1);
		$('#rollListEdit').val(idRoll);
		$('#rollListCreate').html(data1);
		$('#rollListCreate').val(idRoll);
	}
}

function approvedEditMyUser() {
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"idUser": $('#idUserEdit').val(),
		"document": $('#documentEdit').val(),
		"name": changeNameFirstUpperCase($('#nameEdit').val()),
		"usernameObj": $('#usernameEdit').val(),
		"password": calcMD5($('#passEdit').val()),
		"idarea": $('#areaListEdit').val(),
		"email": $('#emailEdit').val(),
		"idRol": $('#rollListEdit').val()
	};

	var area = $('#areaListEdit').val();
	var password = $('#passEdit').val()
	var user = newDinamicOWS(false);

	if (notBlakSpaceValidation(dataAndAccount.idUser) == false) {
		user.showMessage('msMyUser', 'nameEmployed', "Error en el id de usuario", 'warning', 'default', true);
		return;
	}

	if (documentValidation(dataAndAccount.document) == false) {
		user.showMessage('msMyUser', 'nameEmployed', "El documento ingresado no es valido", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		user.showMessage('msMyUser', 'nameEmployed', "Ingrese un nombre", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.usernameObj) == false) {
		user.showMessage('msMyUser', 'nameEmployed', "Ingrese un nombre de usuario", 'warning', 'default', true);
		return;
	}

	if (emailValidation(dataAndAccount.email) == false) {
		user.showMessage('msMyUser', 'nameEmployed', "El correo electronico ingresado no es valido", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(password)) {
		if (passwordValidation(password) == false) {
			user.showMessage('msMyUser', 'nameEmployed', "La contraseña debe tener minimo 8 caracteres y maximo 20, ademas debe tener almenos una letra mayuscula, una minuscula,un numero y un caracter especial (ejemplo: Santa12*)", 'warning', 'default', true);
			return;
		}
	}

	if (dataAndAccount.idarea == 0) {
		user.showMessage('msMyUser', 'nameEmployed', "Seleccione una Area", 'warning', 'default', true);
		return;
	}

	if (dataAndAccount.idRol == 0) {
		user.showMessage('msMyUser', 'nameEmployed', "Seleccione un Roll", 'warning', 'default', true);
		return;
	}

	var data = user.set(editUserService, dataAndAccount, '');
	if (data.success == 'false') {
		user.showMessage('msMyUser', 'nameEmployed', 'No se pudo editar el usuario<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#myModalEdit').modal('hide');
		loadUsuarios();
		user.showMessage('msCRUDUsuarios', 'nameEmployed', 'El usuario se edito con exito:', 'success', 'default', true);
	}
}

function approvedCreateUser() {
	var dataAndAccount = {
		"username": sessionStorage.username,
		"logincode": sessionStorage.logincode,
		"document": $('#documentCreate').val(),
		"name": changeNameFirstUpperCase($('#nameCreate').val()),
		"usernameObj": $('#usernameCreate').val(),
		"password": calcMD5($('#passCreate').val()),
		"idarea": $('#areaListCreate').val(),
		"email": $('#emailCreate').val(),
		"idRol": $('#rollListCreate').val()
	};

	var password = $('#passCreate').val()
	var user = newDinamicOWS(false);

	if (documentValidation(dataAndAccount.document) == false) {
		user.showMessage('msMyUserCreate', 'nameEmployed', "El documento ingresado no es valido", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.name) == false) {
		user.showMessage('msMyUserCreate', 'nameEmployed', "Ingrese un nombre", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(dataAndAccount.usernameObj) == false) {
		user.showMessage('msMyUserCreate', 'nameEmployed', "Ingrese un nombre de usuario", 'warning', 'default', true);
		return;
	}

	if (emailValidation(dataAndAccount.email) == false) {
		user.showMessage('msMyUserCreate', 'nameEmployed', "El correo electronico ingresado no es valido", 'warning', 'default', true);
		return;
	}

	if (notBlakSpaceValidation(password) == false) {
		user.showMessage('msMyUserCreate', 'nameEmployed', "La contraseña no puede estar vacia.", 'warning', 'default', true);
		return;
	}

	if (passwordValidation(password) == false) {
		user.showMessage('msMyUserCreate', 'nameEmployed', "La contraseña debe tener minimo 8 caracteres y maximo 20, ademas debe tener almenos una letra mayuscula, una minuscula,un numero y un caracter especial (ejemplo: Santa12*)", 'warning', 'default', true);
		return;
	}

	if (dataAndAccount.idarea == 0) {
		user.showMessage('msMyUserCreate', 'nameEmployed', "Seleccione una Area", 'warning', 'default', true);
		return;
	}

	if (dataAndAccount.idRol == 0) {
		user.showMessage('msMyUserCreate', 'nameEmployed', "Seleccione un Roll", 'warning', 'default', true);
		return;
	}

	var data = user.add(createUserService, dataAndAccount, '');
	if (data.success == 'false') {
		user.showMessage('msMyUserCreate', 'nameEmployed', 'No se pudo crear el usuario<br><strong>Motivo: </strong>' + data.status, 'warning', 'default', true);
	} else {
		$('#myModalCreate').modal('hide');
		loadUsuarios();
		user.showMessage('msCRUDUsuarios', 'nameEmployed', 'El usuario se Creo con exito:', 'success', 'default', true);
	}
}

function closeModal() {
	$('#myModalEdit').modal('hide');
}

function closeModalCreate() {
	$('#myModalCreate').modal('hide');
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++) { var element = obj[i]; if (idCompare == element[attrib]) return element; } return null;
}