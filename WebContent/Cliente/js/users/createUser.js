var areas = {};
var rolls = {};

$(document).ready(function(){
	getAreas();
	getRolls();
	showAreas();
	showRolls();
	areaButton();
	$('#areaButton').click(function(){areaButton()});
	$('#cancel').click(function(){cancel()});
	$('#infoPassword').css("display","none");
	$('#pass').focus(function(){hiddeInfoPassword()});
	$('#pass').blur(function(){hiddeInfoPassword()});
	$('#document').focus();
});

function getAreas() {
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
	var data = '<option value="0">-- Seleccione la Area --</option>';
	for (var i = 0; i < areas.length; i++) {
		data += '<option value="'+areas[i].idArea+'">'+areas[i].name+'</option>';
	};
	$('#areaList').html(data);
}

function showRolls () {
	var data = '<option value="0">-- Seleccione el roll --</option>';
	for (var i = 0; i < rolls.length; i++) {
		data += '<option value="'+rolls[i].idRol+'">'+rolls[i].name+'</option>';
	};
	$('#rollList').html(data);
}

function areaButton() {
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
    	//console.log("Pasword-> min 8: "+($('#pass').val().length>=8)+", Max 20: "+($('#pass').val().length<=20)+", validate password: "+validatePassword());
    	$('#msCreateUser').html('<div class="alert alert-warning" role="alert">La contraseña no cumple con los requisitos</div>');
		ScreenUp("msCreateUser");
    	return false;
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

function createUser() {
	validateAccount();
	var dataAndAccount = {
		"document":$('#document').val(),
		"name":changeNameFirstUpperCase($('#name').val()),
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
							$('#msModifyDelete').html("");
						}else{
							$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No se pudo crear la Area</div>');		
							ScreenUp();
							validation = false;
						}
					}else{
						$('#msCreateUser').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear areas</div>');
						ScreenUp();
						validation = false;
					}
			    },
			    error: function(objXMLHttpRequest) {
			       	$('#msCreateUser').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
			       	ScreenUp();
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

	//console.log("Crear: "+JSON.stringify(dataAndAccount));
	//console.log("Validation: "+validation);
	if(validation == true){
		$.ajax({
			url: createUserService,
			type: 'GET',
			data: dataAndAccount,
			async : true,
			dataTipe: 'JSON',
			success: function (data) {
				//console.log("WebService Crear: "+JSON.stringify(data));
				if(data.validate == "true"){
					if(data.create == "true"){
						limpiarForm();
						$('#msCreateUser').html('<div class="alert alert-success" role="alert">Se creo el usuario con exito</div>');	
						ScreenUp();
						$('#document').focus();
						setTimeout(function() {
							$('#msCreateUser').html("");
						},10000);
					}else{
						$('#msCreateUser').html('<div class="alert alert-warning" role="alert">No se pudo crear el usuario: '+data.status+'</div>');
						ScreenUp();
					}
				}else{
					$('#msCreateUser').html('<div class="alert alert-warning" role="alert">No tiene permisos para crear usuarios</div>');
					ScreenUp();
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	$('#msCreateUser').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	        	ScreenUp();
	        	console.log("error",objXMLHttpRequest);
			}
		});
	}else{
		$('#msCreateUser').html('<div class="alert alert-warning" role="alert">Hace falta seleccionar el area o el roll</div>');
		ScreenUp();
	}
}

function changeNameFirstUpperCase(name) {
	var str = name.split(" ");
	var n = '';
	for (var i = 0; i < str.length; i++) {
		n += str[i].charAt(0).toUpperCase()+str[i].substring(1).toLowerCase();
		if(i < str.length-1) n+= ' ';	
	}
	return n;
}

function ScreenUp () {
	$('html,body').animate({
	    scrollTop: $("#nameEmployed").offset().top
	}, 500);
}

function cancel() {
	limpiarForm();
	window.location.assign('../../');
}

function limpiarForm() {
	$('#document').val("");
	$('#name').val("");
	$('#username').val("");
	$('#pass').val("");
	$('#email').val("");
	$('#areaList').val(0);
	if($("#areaButton").prop("checked")){
		$("#areaButton").click();	
	}
	$('#area').val("");
	$('#rollList').val(0);
}
