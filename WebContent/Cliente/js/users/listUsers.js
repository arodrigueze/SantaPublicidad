$(document).ready(function(){
	getUsers();
	listUsers();
	$(".filter").keyup(function(){listUsers()});
	$('.filter').focus();
});

var users = {};
function getUsers() {
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
				//console.log("GET USERS: "+JSON.stringify(data));
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
	//console.log("Users: "+JSON.stringify(users));
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Cedula</th><th>Nombre</th><th>Nombre de usuario</th><th>Correo electronico</th><th>Area</th><th>Roll</th></tr>';
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