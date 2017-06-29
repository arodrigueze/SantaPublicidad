$(document).ready(function () {
	$(".clsInfo").change(function () { cleanInfo("loginValidation") });
	$('#user').focus();
});

function cleanInfo(id) {
	$("#" + id).html("");
}

function login() {
	var account = {
		"user": $('#user').val(),
		"pass": calcMD5($('#pass').val())
	};
	$('#loginBtn').prop("disabled", true);
	$('#user').prop("disabled", true);
	$('#pass').prop("disabled", true);
	$.ajax({
		url: loginService,
		type: 'GET',
		data: account,
		async: true,
		dataTipe: 'JSON',
		success: function (data) {
			console.log(data);
			if (data.access == true) {
				cleanInfo("loginValidation");
				if (typeof (Storage) !== "undefined") {
					$('#pass').val("");
					sessionStorage.setItem("namel", data.namel);
					sessionStorage.setItem("username", data.username);
					sessionStorage.setItem("logincode", data.logincode);
					sessionStorage.setItem("roll", data.roll);
					window.location.assign('pages/');
				} else {
					$('#pass').val("");
					$('#loginValidation').html("Lo sentimos! tu buscador no soporta Web Storages");
				}
			} else {
				if (data.status.indexOf('Intentos') != -1) {
					$('#loginValidation').html("Usuario y/o contraseña incorrectos. " + data.status);
				} else {
					$('#loginValidation').html('<strong>Bloqueado! </strong>Supero los intentos de ingreso permitidos<br>Se le ha bloqueado el acceso temporalmente');
				}
				singOut();
				$('#pass').val("");

			}
			$('#loginBtn').prop("disabled", false);
			$('#user').prop("disabled", false);
			$('#pass').prop("disabled", false);
		},
		error: function (objXMLHttpRequest) {
			singOut();
			$('#pass').val("");
			$('#loginValidation').html("Error de conexión");
			console.log("error", objXMLHttpRequest);
			$('#loginBtn').prop("disabled", false);
			$('#user').prop("disabled", false);
			$('#pass').prop("disabled", false);
		}
	});
}
