$(document).ready(function () {
	console.log("Si se han cargado los usuarios.");
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

function editUser(idUser){
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

function loadUserInForm (user) {
	$('#idUserEdit').val(user.iduser);
	$('#documentEdit').val(user.document);
	$('#nameEdit').val(user.name);
	$('#usernameEdit').val(user.username);
	$('#passEdit').val("");
	$('#emailEdit').val(user.email);
	$('#areaEdit').val("");
}

function loadAreas() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var areas = newDinamicOWS(false);
	var data = areas.get(areaList ,dataAndAccount, 'name', 'areas');
	if(data.success == 'false'){
		areas.showMessage('msCRUDUsuarios', 'nameEmployed', data.status, 'danger', 'default', true);	
	} else{
		var data1 = '<option value="0">-- Seleccione la Area --</option>';
		var idArea = 0;
		for (var i = 0; i < areas.dataArray.length; i++) {
			data1 += '<option value="'+areas.dataArray[i].idArea+'">'+areas.dataArray[i].name+'</option>';
		}
		$('#areaListEdit').html(data1);
		$('#areaListEdit').val(idArea);	
	}
}

function loadRolles() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var rolles = newDinamicOWS(false);
	var data = rolles.get(rollList ,dataAndAccount, 'name', 'roles');
	if(data.success == 'false'){
		rolles.showMessage('msCRUDUsuarios', 'nameEmployed', data.status, 'danger', 'default', true);	
	} else{
		var data1 = '<option value="0">-- Seleccione el roll --</option>';
		var idRoll = 0;
		for (var i = 0; i < rolles.dataArray.length; i++) {
			data1 += '<option value="'+rolles.dataArray[i].idRol+'">'+rolles.dataArray[i].name+'</option>';
		};
		$('#rollListEdit').html(data1);
		$('#rollListEdit').val(idRoll);
	}
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++) { var element = obj[i]; if (idCompare == element[attrib]) return element; } return null;
}