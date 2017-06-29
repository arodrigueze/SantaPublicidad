$(document).ready(function(){
	getClients();
	listClients();
	$(".filter").keyup(function(){listClients()});
});

var clients = {};
function getClients() {
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
				console.log("GET CLIENTS: "+JSON.stringify(data));
				if(data.validate == "true"){
					clients = data.users;
				}else{
					console.log("No tiene permisos para listar clientes");
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


function listClients() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Cedula</th><th>Nombre</th><th>Nombre de usuario</th><th>Correo electronico</th><th>Area</th><th>Roll</th></tr>';
	var data = "";
	for (var i = 0; i < clients.length; i++) {
		var client = (clients[i].document+clients[i].name+clients[i].username+clients[i].email+clients[i].area+clients[i].roll).toUpperCase();
		if(find == "" || client.indexOf(find)!=-1){
			data+='<tr>';
			//content+='<td>'+clients[i].iduser+'</td>';
			data+='<td>'+clients[i].document+'</td>';
			data+='<td>'+clients[i].name+'</td>';
			data+='<td>'+clients[i].username+'</td>';
			data+='<td>'+clients[i].email+'</td>'; 
			data+='<td>'+clients[i].area+'</td>';
			data+='<td>'+clients[i].roll+'</td>';
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