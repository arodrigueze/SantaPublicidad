$(document).ready(function(){
	loadCountrys();
	$(".filter").keyup(function(){listCountrys()});
	$('.filter').focus();
});

var countrys = {};
function loadCountrys() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var countrysObj = newDinamicOWS(false);
	var data = countrysObj.get(countryListService ,dataAndAccount, 'name','countries');
	if(data.success == 'false'){
		countrysObj.showMessage('msCRUDCountry', 'nameEmployed', 'No se pudo cargar los paises<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	}else{
		countrys = countrysObj.dataArray;
		listCountrys();	
	}
}

function listCountrys() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Pais</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < countrys.length; i++) {
		var pais = (countrys[i].name).toUpperCase();
		if(find == "" || pais.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+countrys[i].name+'</td>';
			data+='<td onclick="editCountry('+countrys[i].idCountry+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
			data+='<td onclick="deleteCountry('+countrys[i].idCountry+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron areas");
	}else{ $('#msfind').html("");}
	content += data+'</table>';
	$('#lista').html(content);
}

function createCountry(){
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "cname": $('#country').val()};
	var country = newDinamicOWS(false);
	if(notBlakSpaceValidation(dataAndAccount.cname)==false){
		country.showMessage('msCRUDCountry', 'nameEmployed', 'Ingrese un nombre para el pais', 'warning', 'modal', true);
		return;
	}
	var data = country.add(createCountryService ,dataAndAccount, '');
	if(data.success == 'false'){
		country.showMessage('msCRUDCountry', 'nameEmployed', 'No se pudo crear el pais<br><strong>Motivo: </strong>'+data.status, 'warning', 'default', true);	
	}else{
		country.showMessage('msCRUDCountry', 'nameEmployed', 'Se creo el pais con exito!', 'success', 'default', true);
		$('#country').val("");
		loadCountrys();
	}
}

function editCountry(idCountry){
	var country = findElement(countrys, 'idCountry', idCountry);
	//console.log("Edit "+idCountry+" - "+JSON.stringify(country));
	data = '';
	data += '<form action="javascript:approvedEditCountry()">';
	data += '<div class="modal-body">';
	data += '<div id="msModalEdit"></div>';
	data += '<input type="hidden" class="form-control" id="idCountryEdit" placeholder="idCountry" required>';
	data += '<div class="form-group" id="inputCountryEdit">';
	data += '<label for="inputForm">Pais</label>';
	data += '<input type="text" class="form-control" id="countryEdit" placeholder="Pais" required>';
	data += '</div>';
	data += '</div><div class="modal-footer">';
    data +=	'<button type="submit" class="btn btn-primary">Guardar</button>';
   	data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    data += '</div>';
	data += '</form>';
   	$('#bodyModalEdit').html(data);
   	$('#idCountryEdit').val(country.idCountry);
   	$('#countryEdit').val(country.name);
   	$('#myModalEdit').modal('show');
}

function approvedEditCountry() {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idCountry": $('#idCountryEdit').val(), "name": $('#countryEdit').val()};
	var country = newDinamicOWS(false);
	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		country.showMessage('msModalEdit', 'msModalEdit', 'Ingrese un nombre para el pais', 'warning', 'modal', true);
		return;
	}
	var data = country.set(editCountryService ,dataAndAccount, '');
	if(data.success == 'false'){
		country.showMessage('msModalEdit', 'msModalEdit', 'No se pudo editar el pais<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		country.showMessage('msCRUDCountry', 'nameEmployed', 'Se Editó el pais con exito!', 'success', 'default', true);
		$('#myModalEdit').modal('hide');
		loadCountrys();
	}
}

function deleteCountry(idCountry) {
	var country = findElement(countrys, 'idCountry', idCountry);
	//console.log("delete "+idCountry+" - "+JSON.stringify(country));
	data = '';
	data += '<div class="modal-body">';
	data += '<div id="msDeleteCountry"></div>';
	data += '<p>Está a punto de eliminar el pais con los siguientes datos: </p>';
	data += '<div class="panel panel-default"><div class="panel-heading">Pais</div>';
  	data += '<div class="panel-body">';
    data += '<strong>Nombre del pais: </strong>'+country.name;
  	data += '</div></div>';
  	data += '<p>está accion es irreversible, ¿desea continuar?</p>';		     
	data += '</div><div class="modal-footer">';
	data +=	'<button type="button" class="btn btn-primary" onclick="approvedDeleteCountry('+idCountry+')">Continuar, Eliminar el pais</button>';
    data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
   	data += '</div>';
   	$('#bodyModalDelete').html(data);
   	$('#myModalDelete').modal('show');
}

function approvedDeleteCountry(idCountry) {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idCountry": idCountry};
	var country = newDinamicOWS(false);
	var data = country.remove(deleteCountryService ,dataAndAccount, '');
	if(data.success == 'false'){
		country.showMessage('msDeleteCountry', 'msDeleteCountry', 'No se pudo eliminar el pais<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		country.showMessage('msCRUDCountry', 'nameEmployed', 'Se elimino el pais con exito!', 'success', 'default', true);
		$('#myModalDelete').modal('hide');
		loadCountrys();
	}
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}