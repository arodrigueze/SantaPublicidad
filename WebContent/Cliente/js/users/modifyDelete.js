$(document).ready(function(){
	getUsers();
	listUsers();
	getAreas();
	getRolls();
	showAreas();
	showRolls();
	areaButton();
	$('#areaButton').click(function(){areaButton()});
	$('#cancel').click(function(){cancel()});
	$(".filter").keyup(function(){listUsers()});
	$('#continueDelete').click(function(){deleteUserAjax(idUserDelete)});
	$('#infoPassword').css("display","none");
	$('#pass').focus(function(){hiddeInfoPassword()});
	$('#pass').blur(function(){hiddeInfoPassword()});
	$('.filter').focus();
});

var areas = {};
var rolls = {};
var users = {};
function getUsers() {
	//console.log("GET USERS:");
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLog = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: userList,
			type: 'GET',
			data: accountLog,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				//console.log("Crear: "+JSON.stringify(data));
				if(data.validate == "true"){
					users = sortByKey(data.users, 'name');
				}else{
					console.log("No tiene permisos para listar usuarios");
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

function listUsers() {
	//console.log("LIST USERS...");
	//console.log("Users: "+JSON.stringify(users));
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Cedula</th><th>Nombre</th><th>Nombre de usuario</th><th>Correo electronico</th><th>Area</th><th>Roll</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < users.length; i++) {
		var user = (users[i].document+users[i].name+users[i].username+users[i].email+users[i].area+users[i].roll).toUpperCase();
		if(find == "" || user.indexOf(find)!=-1){
			data+='<tr>';
			//content+='<td>'+users[i].iduser+'</td>';
			data+='<td>'+users[i].document+'</td>';
			data+='<td>'+users[i].name+'</td>';
			data+='<td>'+users[i].username+'</td>';
			data+='<td>'+users[i].email+'</td>'; 
			data+='<td>'+users[i].area+'</td>';
			data+='<td>'+users[i].roll+'</td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit" onclick="editUser('+users[i].iduser+')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDelete" onclick="deleteUser('+users[i].iduser+')"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){
		$('#msfind').html("No se encontraron usuarios");
	}else{
		$('#msfind').html("");
	}
	content += data+'</table>';
	$('#lista').html(content);
}

var idUserDelete = -1;
function deleteUser(iduser) {
	idUserDelete = iduser
	//console.log("DELETE USER: "+iduser);
	var user;
	for (var i = 0; i < users.length; i++) {
		if(users[i].iduser == iduser){
			user = users[i];
			break;
		}
	};
	//console.log(JSON.stringify(user));
	var data = '<p>Está a punto de eliminar el usuario con los siguientes datos: </p>';
	data += '<div class="panel panel-info"><div class="panel-heading">Usuario</div><div class="panel-body">';
	data += '<strong>Cedula: </strong>'+user.document+"<br>";
	data += '<strong>Nombre: </strong>'+user.name+"<br>";
	data += '<strong>Nombre de usuario: </strong>'+user.username+"<br>";
	data += '<strong>Correo Electronico: </strong>'+user.email+"<br>";
	data += '<strong>Area: </strong>'+user.area+"<br>";
	data += '<strong>Roll: </strong>'+user.roll+"<br>";
	data += '</div></div>';
	data += '<p>está accion es irreversible, ¿desea continuar?</p>';
	$('#bodyModalDelete').html(data);
}

function deleteUserAjax(iduser) {
	//console.log("DELETE USER AJAX: "+iduser);
	validateAccount();
	if(sessionStorage.username && sessionStorage.logincode){
		var accountAndData = {
			"idUser":iduser,
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: deleteUserService,
			type: 'GET',
			data: accountAndData ,
			async : true,
			dataTipe: 'JSON',
			success: function (data) {
				//console.log("Delete user webservice: "+JSON.stringify(data));
				if(data.validate == "true"){
					if(data.delete == "true"){
						idUserDelete = -1;
						getUsers();
						listUsers();
						$('#msModifyDelete').html('<div class="alert alert-success" role="alert">Se elimino el usuario con exito</div>');
						ScreenUp("nameEmployed");
						$('#cancelDelete').click();
						setTimeout(function() {
							$('#msModifyDelete').html("");
						},10000);
					}else{
						$('#msModifyDelete').html('<div class="alert alert-warning" role="alert">No se pudo eliminar el usuario: '+data.status+'</div>');
						ScreenUp("nameEmployed");
						$('#cancelDelete').click();
						setTimeout(function() {
							$('#msModifyDelete').html("");
						},10000);
					}
				}else{
					$('#msModifyDelete').html('<div class="alert alert-danger" role="alert">No tiene permisos de eliminar usuarios</div>');
					ScreenUp("nameEmployed");
					$('#cancelDelete').click();
					setTimeout(function() {
						$('#msModifyDelete').html("");
					},10000);
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	console.log("error",objXMLHttpRequest);
	        	$('#msModifyDelete').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
				ScreenUp("nameEmployed");
				$('#cancelDelete').click();
				setTimeout(function() {
					$('#msModifyDelete').html("");
				},10000);
			}
		});
	validateAccount();
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}	
}

function editUser(iduser) {
	//console.log("EDIT USER: "+iduser);
	var user;
	for (var i = 0; i < users.length; i++) {
		if(users[i].iduser == iduser){
			user = users[i];
			break;
		}
	};
	//console.log(JSON.stringify(user));	
	$('#idUser').val(user.iduser);
	$('#document').val(user.document);
	$('#name').val(user.name);
	$('#username').val(user.username);
	$('#pass').val("");
	$('#email').val(user.email);
	for (var i = 0; i <areas.length; i++) {
		if(areas[i].name == user.area){
			$('#areaList').val(areas[i].idArea);
			break;		
		}
	};
	$('#area').val("");
	for (var i = 0; i <rolls.length; i++) {
		if(rolls[i].name == user.roll){
			$('#rollList').val(rolls[i].idRol);
			break;		
		}
	};
	//console.log("idUser: "+$('#idUser').val());
}

function getAreas() {
	//console.log("GET AREAS:");
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: areaList,
			type: 'GET',
			data: accountLogin,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				//console.log("Areas: "+JSON.stringify(data));
				if(data.list == "true"){
					areas = data.areas;
				}else{
					console.log("No tiene permisos para listar usuarios");
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

function getRolls () {
	//console.log("GET ROLLS:");
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: rollList,
			type: 'GET',
			data: accountLogin,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				//console.log("Rolls: "+JSON.stringify(data));
				if(data.accionListar == "true"){
					rolls = data.roles;
				}else{
					console.log("No tiene permisos para listar usuarios");
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

function showAreas () {
	//console.log("SHOW AREAS...");
	var data = '<option value="0">-- Seleccione la Area --</option>';
	for (var i = 0; i < areas.length; i++) {
		data += '<option value="'+areas[i].idArea+'">'+areas[i].name+'</option>';
	};
	$('#areaList').html(data);
}

function showRolls () {
	//console.log("SHOW ROLLS...");
	var data = '<option value="0">-- Seleccione el roll --</option>';
	for (var i = 0; i < rolls.length; i++) {
		data += '<option value="'+rolls[i].idRol+'">'+rolls[i].name+'</option>';
	};
	$('#rollList').html(data);
}

function areaButton() {
	//console.log("AREA BUTTON...");
	var value = $('#areaButton').prop('checked');
	if(value){
		$('#areaList').val(0);
		$('#areaList').prop('disabled', true);
		$('#area').prop('disabled', false);
	}else{
		$('#areaList').prop('disabled', false);
		$('#area').prop('disabled', true);
		$('#area').val("");
	}
}

function limpiarForm() {
	//console.log("LIMPIAR FORM...");
	$('#idUser').val("");
	$('#document').val("");
	$('#name').val("");
	$('#username').val("");
	$('#pass').val("");
	$('#email').val("");
	$('#areaList').val(0);
	//console.log("Button: "+$("#areaButton").prop("checked"));
	if($("#areaButton").prop("checked")){
		$("#areaButton").click();	
	}
	$('#area').val("");
	$('#rollList').val(0);
	$('#msCreateUser').html("");
}

function ScreenUp (id) {
	//console.log("SCREEN UP");
	if(id == "msCreateUser"){
		$('#modalEdit').scrollTop(0);
	}else{
		$('html,body').animate({
		    scrollTop: $("#"+id).offset().top
		}, 500);
	}
}

function cancel(){
	//console.log("CANCEL");
	limpiarForm();
}

function validations() {
	//console.log("VALIDATIONS");
	if($('#document').val().indexOf("e")!=-1){
    	$('#msCreateUser').html('<div class="alert alert-warning" role="alert">La cedula introducida es incorrecta</div>');
		ScreenUp("msCreateUser");
        return false;
    }
    var valEmail = true;
	if($('#email').val().indexOf('@', 0) == -1) {
		valEmail = false;
    }else {
    	if($('#email').val().substring($('#email').val().indexOf('@', 0)).indexOf('.', 0) == -1){
    		valEmail = false;
    	}
    }
    if(valEmail == false){
    	$('#msCreateUser').html('<div class="alert alert-warning" role="alert">El correo electrónico introducido no es correcto.</div>');
		ScreenUp("msCreateUser");
        return false;
    }
    if($('#pass').val().length<8 || $('#pass').val().length>20 || validatePassword() == false){
    	if($('#pass').val().length != 0){
	    	console.log("Pasword-> min 8: "+($('#pass').val().length>=8)+", Max 20: "+($('#pass').val().length<=20)+", validate password: "+validatePassword());
	    	$('#msCreateUser').html('<div class="alert alert-warning" role="alert">La contraseña no cumple con los requisitos</div>');
			ScreenUp("msCreateUser");
	    	return false;
    	}
    }
    return true;
}

function validatePassword() {
	var password = $('#pass').val();
	var upperCase = false;
	var lowerCase = false;
	var charespecial = false;
	var number = false;

	for (var i = 0; i < password.length; i++) {
		var character = password.charCodeAt(i);
		if(character<= 57 && character >= 48){
			number = true;
		}else if(character<= 90 && character >= 65){
			upperCase = true;
		}else if(character<= 122 && character >= 97){
			lowerCase = true;
		}else{
			charespecial = true;
		}
		if(upperCase && lowerCase && charespecial && number){
			return true;
		}
	}
	//console.log("upperCase: "+upperCase+", lowerCase: "+lowerCase+", charespecial: "+charespecial+", number: "+number);
	return false;
}

function hiddeInfoPassword() {
	//console.log("HIDDEN PASSWORD INFO: "+$('#infoPassword').css("display"));
	if($('#infoPassword').css("display") == "none"){
		$('#infoPassword').css("display","block");
	}else{
		$('#infoPassword').css("display","none");
	}
}

function editUserAjax() {
	//console.log("EDIT USER AJAX:");
	validateAccount();
	var dataAndAccount = {
		"idUser":$('#idUser').val(),
		"document":$('#document').val(),
		"name":$('#name').val(),
		"usernameObj":$('#username').val(),
		"password":calcMD5($('#pass').val()),
		"email":$('#email').val(),
		"idarea":$( "#areaList option:selected" ).val(),
		"idRol":$( "#rollList option:selected" ).val(),
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode
	};

	var validationFields = validations();
	//console.log("Validation Fields: "+validationFields);
	if(validationFields == false){
		return false;
	}
    
	var validation = true;
	if(dataAndAccount.idarea == "0"){
		if($('#area').val() != ""){
			console.log("CREATE AREA:");
			var dataAndAccountArea = {
				"username":sessionStorage.username,
				"logincode":sessionStorage.logincode,
				"nombreArea":$( "#area").val()
			};
			//console.log("Crear Area: "+JSON.stringify(dataAndAccountArea));
			$.ajax({
				url: createAreaService,
				type: 'GET',
				data: dataAndAccountArea,
				async : false,
				dataTipe: 'JSON',
				success: function (data) {
					//console.log("WebService Crear Area: "+JSON.stringify(data));
					if(data.validate == "true"){
						if(data.insert=="true"){
							dataAndAccount.idarea = data.idArea;
							getAreas();
							showAreas();
						}else{
							$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No se pudo crear la Area</div>');		
							ScreenUp("msCreateUser");
							validation = false;
						}
					}else{
						$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear areas</div>');
						ScreenUp("msCreateUser");
						validation = false;
					}
			    },
			    error: function(objXMLHttpRequest) {
			       	$('#msCreateUser').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
			       	ScreenUp("msCreateUser");
			       	validation = false;
			       	console.log("error",objXMLHttpRequest);
				}
			});
		}else{
			validation = false;
		}
	}

	if(dataAndAccount.idRol == "0"){
		validation = false;
	}

	//console.log("Editar: "+JSON.stringify(dataAndAccount));
	//console.log("Validation: "+validation);
	if(validation == true){
		$.ajax({
			url: editUserService,
			type: 'GET',
			data: dataAndAccount,
			async : true,
			dataTipe: 'JSON',
			success: function (data) {
				//console.log("WebService Editar: "+JSON.stringify(data));
				if(data.validate == "true"){
					if(data.update == "true"){
						limpiarForm();
						getUsers();
						listUsers();
						$('#msModifyDelete').html('<div class="alert alert-success" role="alert">Se Modifico el usuario con exito</div>');
						ScreenUp("nameEmployed");
						$('#cancel').click();
						setTimeout(function() {
							$('#msModifyDelete').html("");
						},10000);
						validateAccount();
					}else{
						$('#msCreateUser').html('<div class="alert alert-warning" role="alert">No se pudo crear el usuario: '+data.status+'</div>');
						ScreenUp("msCreateUser");
					}
				}else{
					$('#msCreateUser').html('<div class="alert alert-warning" role="alert">No tiene permisos para crear usuarios</div>');
					ScreenUp("msCreateUser");
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	$('#msCreateUser').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	        	ScreenUp("msCreateUser");
	        	console.log("error",objXMLHttpRequest);
			}
		});
	}else{
		$('#msCreateUser').html('<div class="alert alert-warning" role="alert">Hace falta seleccionar el area o el roll</div>');
		ScreenUp("msCreateUser");
	}
	validateAccount();
}