var myUser = [];

$(document).ready(function(){
	$('#myUserEdit').css('display','none');
	$('#editDataButton').click(function(){ activeEdit(); });
	$('#cancel').click(function(){ activeSee(); });
	loadUser();
	activeButton('areaButton', 'areaList', 'area');
	$('#areaButton').click(function(){activeButton('areaButton', 'areaList', 'area')});
	$('#infoPassword').css("display","none");
	$('#pass').focus(function(){hiddeInfoPassword()});
	$('#pass').blur(function(){hiddeInfoPassword()});
});

function hiddeInfoPassword() {
	if($('#infoPassword').css("display") == "none"){
		$('#infoPassword').css("display","block");
	}else{
		$('#infoPassword').css("display","none");
	}
}

function loadUser() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var users = newDinamicOWS(false);
	var data = users.get(userList ,dataAndAccount, 'name','users');
	if(data.success == 'false'){
		users.showMessage('msMyUser', 'nameEmployed', 'No se pudo encontrar el usuario<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	} else{
		for (var i = 0; i < users.dataArray.length; i++) {
			if(sessionStorage.username == users.dataArray[i].username) {
				myUser = users.dataArray[i]; 
				$('#nameSeeUser').html(myUser.name);
				$('#documentSee').html(myUser.document);
				$('#nameSee').html(myUser.name);
				$('#emailSee').html(myUser.email);
				$('#usernameSee').html(myUser.username);
				$('#areaSee').html(myUser.area);
				$('#rollSee').html(myUser.roll);
				return;
			}
		}
		users.showMessage('msMyUser', 'nameEmployed', 'No se encontró el usuario', 'warning', 'default', true);
	}
}

function loadUserInForm () {
	$('#idUser').val(myUser.iduser);
	$('#document').val(myUser.document);
	$('#name').val(myUser.name);
	$('#username').val(myUser.username);
	$('#pass').val("");
	$('#email').val(myUser.email);
	$('#area').val("");
	if(myUser.roll != rollAdmin){
		$('#document').prop('disabled', true);
		$('#name').prop('disabled', true);
		$('#username').prop('disabled', true);
		$('#areaList').prop('disabled', true);
		$('#areaButton').prop('disabled', true);
		$('#area').prop('disabled', true);
		$('#rollList').prop('disabled', true);
		
		$('#inputName').css('display',"none");
		$('#inputUsername').css('display',"none");
		$('#inputArea').css('display',"none");
		$('#inputDocument').css('display',"none");
		$('#inputroll').css('display',"none");
		$('#area').css('display',"none");
		$('#buttonAreaComplete').css('display',"none");
	}
}

function activeSee() {
	$('#myUserSee').css('display',''); 
	$('#myUserEdit').css('display','none');
	clearForm();
}

function activeEdit() {
	$('#myUserEdit').css('display',''); 
	$('#myUserSee').css('display','none');
	loadAreas();
	loadRolles();
	loadUserInForm();
}

function loadAreas() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var areas = newDinamicOWS(false);
	var data = areas.get(areaList ,dataAndAccount, 'name', 'areas');
	if(data.success == 'false'){
		areas.showMessage('msMyUser', 'nameEmployed', data.status, 'danger', 'default', true);	
	} else{
		var data1 = '<option value="0">-- Seleccione la Area --</option>';
		var idArea = 0;
		for (var i = 0; i < areas.dataArray.length; i++) {
			data1 += '<option value="'+areas.dataArray[i].idArea+'">'+areas.dataArray[i].name+'</option>';
			if(areas.dataArray[i].name == myUser.area){ idArea = areas.dataArray[i].idArea; }
		}
		$('#areaList').html(data1);
		$('#areaList').val(idArea);	
	}
}

function loadRolles() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var rolles = newDinamicOWS(false);
	var data = rolles.get(rollList ,dataAndAccount, 'name', 'roles');
	if(data.success == 'false'){
		rolles.showMessage('msMyUser', 'nameEmployed', data.status, 'danger', 'default', true);	
	} else{
		var data1 = '<option value="0">-- Seleccione el roll --</option>';
		var idRoll = 0;
		for (var i = 0; i < rolles.dataArray.length; i++) {
			data1 += '<option value="'+rolles.dataArray[i].idRol+'">'+rolles.dataArray[i].name+'</option>';
			if(rolles.dataArray[i].name == myUser.roll){ idRoll = rolles.dataArray[i].idRol;}
		};
		$('#rollList').html(data1);
		$('#rollList').val(idRoll);
	}
}

function activeButton(idButton, idlist, idInput) {
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

function approvedEditMyUser() {
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode,
		"idUser":$('#idUser').val(),
		"document":$('#document').val(),
		"name":changeNameFirstUpperCase($('#name').val()),
		"usernameObj":$('#username').val(),
		"password":calcMD5($('#pass').val()),
		"idarea":$('#areaList').val(),
		"email":$('#email').val(),
		"idRol":$('#rollList').val()
	};

	var area = $('#area').val();
	var password = $('#pass').val()
	var user = newDinamicOWS(false);
	
	if(notBlakSpaceValidation(dataAndAccount.idUser) == false){
		user.showMessage('msMyUser', 'nameEmployed', "Error en el id de usuario", 'warning', 'default', true);
		return;
	}
	
	if(documentValidation(dataAndAccount.document) == false){
		user.showMessage('msMyUser', 'nameEmployed', "El documento ingresado no es valido", 'warning', 'default', true);
		return;
	}
	
	if(notBlakSpaceValidation(dataAndAccount.name) == false){
		user.showMessage('msMyUser', 'nameEmployed', "Ingrese un nombre", 'warning', 'default', true);
		return;
	}

	if(notBlakSpaceValidation(dataAndAccount.usernameObj) == false){
		user.showMessage('msMyUser', 'nameEmployed', "Ingrese un nombre de usuario", 'warning', 'default', true);
		return;
	}

	if(emailValidation(dataAndAccount.email) == false){
		user.showMessage('msMyUser', 'nameEmployed', "El correo electronico ingresado no es valido", 'warning', 'default', true);
		return;
	}

	if(notBlakSpaceValidation(password)){
		if(passwordValidation(password) == false){
			user.showMessage('msMyUser', 'nameEmployed', "La contraseña no cumple con los requisitos", 'warning', 'default', true);
			return;
		}	
	}
	
	if(notBlakSpaceValidation(area) && dataAndAccount.idarea == 0){
		var idArea = createArea(area);
		if(numberValidation(idArea, true, false) == false){
			user.showMessage('msMyUser', 'nameEmployed', "Error creando area", 'danger', 'default', true);
			return;
		}else{
			dataAndAccount.idarea = idArea;
		}
	}

	if(dataAndAccount.idarea == 0){
		user.showMessage('msMyUser', 'nameEmployed', "Seleccione una area", 'warning', 'default', true);
		return;
	}

	if(dataAndAccount.idRol == 0){
		user.showMessage('msMyUser', 'nameEmployed', "Seleccione un roll", 'warning', 'default', true);
		return;
	}

	var data = user.set(editUserService ,dataAndAccount, '');
	if(data.success == 'false'){
		user.showMessage('msMyUser', 'nameEmployed', 'No se pudo editar el usuario<br><strong>Motivo: </strong>'+data.status, 'warning', 'default', true);	
	} else{
		activeSee();
		clearForm();
		loadUser();
		user.showMessage('msSeeMyUser', 'nameEmployed', 'El usuario se edito con exito:', 'success', 'default', true);
	}
}

function createArea(nameArea) {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "nombreArea": nameArea};
	var area = newDinamicOWS(false);
	var data = area.add(createAreaService ,dataAndAccount, '');
	if(data.success == 'false'){
		area.showMessage('msMyUser', 'nameEmployed', 'No se pudo crear el area<br><strong>Motivo: </strong>'+data.status, 'warning', 'default', true);	
		return undefined;
	} else{
		return data.data.idArea;
	}	
}

function clearForm (){
	$('#document').val("");
	$('#name').val("");
	$('#username').val("");
	$('#pass').val("");
	$('#areaList').val(0);
	$('#email').val("");
	$('#rollList').val(0);
	$('#area').val("");
	$('#areaButton').prop('checked',true);
	$('#areaButton').click();
}