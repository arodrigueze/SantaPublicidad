$(document).ready(function(){
	loadCitys();
	$(".filter").keyup(function(){listCitys()});
	$('.filter').focus();
});

var countrys = newDinamicOWS(false);
var citys = {};
function loadCitys() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var city = newDinamicOWS(false);
	var data = city.get(citysListService ,dataAndAccount, 'name','cities');
	if(data.success == 'false'){
		city.showMessage('msCRUDCity', 'nameEmployed', 'No se pudo cargar las ciudades<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	}else{
		citys = city.dataArray;
		listCitys();	
	}
}

function loadCountrys() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var data = countrys.get(countryListService ,dataAndAccount, 'name','countries');
	if(data.success == 'false'){
		countrys.showMessage('msCRUDCity', 'nameEmployed', 'No se pudo cargar los paises<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	}else{
		listCountrys();	
	}	
}

function listCountrys(){
	var data = '<option value="0">-- Seleccione el Pais --</option>';
	for (var i = 0; i < countrys.dataArray.length; i++) {
		data += '<option value="'+countrys.dataArray[i].idCountry+'">'+countrys.dataArray[i].name+'</option>';
	};
	$('#countryList').html(data);
}

function listCitys() {
	loadCountrys();
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Ciudad</th><th>Pais</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < citys.length; i++) {
		var city = (citys[i].name).toUpperCase();
		if(find == "" || city.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+citys[i].name+'</td>';
			data+='<td>'+countrys.getById(citys[i].idCountry, 'idCountry', false, 'encontrado').name+'</td>';
			data+='<td onclick="editCity('+citys[i].idCity+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
			data+='<td onclick="deleteCity('+citys[i].idCity+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron ciudades");
	}else{ $('#msfind').html("");}
	content += data+'</table>';
	$('#lista').html(content);
}

function createCity(){
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "name": $('#cityCreate').val(), "idCountry": $('#countryList').val()};
	var city = newDinamicOWS(false);
	
	if(dataAndAccount.idCountry==0){
		city.showMessage('msCRUDCity', 'nameEmployed', 'Seleccione un pais', 'warning', 'default', true);
		return;
	}

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		city.showMessage('msCRUDCity', 'nameEmployed', 'Ingrese un nombre para la ciudad', 'warning', 'default', true);
		return;
	}

	var data = city.add(createCityService ,dataAndAccount, '');
	if(data.success == 'false'){
		city.showMessage('msCRUDCity', 'nameEmployed', 'No se pudo crear la ciudad<br><strong>Motivo: </strong>'+data.status, 'warning', 'default', true);	
	}else{
		city.showMessage('msCRUDCity', 'nameEmployed', 'Se creo la ciudad con exito!', 'success', 'default', true);
		$('#cityCreate').val("");
		$('#countryList').val(0);
		loadCitys();
	}
}

function editCity(idCity){
	var city = findElement(citys, 'idCity', idCity);
	data = '';
	data += '<form action="javascript:approvedEditCity()">';
	data += '<div class="modal-body">';
	data += '<div id="msModalEdit"></div>';
	data += '<input type="hidden" class="form-control" id="idCityEdit" placeholder="idCity" required>';

	data += '<div class="form-group"><label for="exampleInputPassword1">Pais</label>';
   	data += '<select id="countryListEdit" class="form-control"></select></div>';

	data += '<div class="form-group" id="inputCityEdit">';
	data += '<label for="inputForm">Area</label>';
	data += '<input type="text" class="form-control" id="cityEdit" placeholder="Area" required>';
	data += '</div>';
	data += '</div><div class="modal-footer">';
    data +=	'<button type="submit" class="btn btn-primary">Guardar</button>';
   	data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    data += '</div>';
	data += '</form>';
   	$('#bodyModalEdit').html(data);
   	$('#idCityEdit').val(city.idCity);
   	$('#cityEdit').val(city.name);

   	var data2 = '<option value="0">-- Seleccione el Pais --</option>';
	for (var i = 0; i < countrys.dataArray.length; i++) {
		data2 += '<option value="'+countrys.dataArray[i].idCountry+'">'+countrys.dataArray[i].name+'</option>';
	};
	$('#countryListEdit').html(data2);
	$('#countryListEdit').val(city.idCountry);

   	$('#myModalEdit').modal('show');
}

function approvedEditCity() {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idCity": $('#idCityEdit').val(), "name": $('#cityEdit').val(), "idCountry":$('#countryListEdit').val()};
	var city = newDinamicOWS(false);

	if(dataAndAccount.idCountry==0){
		city.showMessage('msModalEdit', 'msModalEdit', 'Seleccione un pais', 'warning', 'modal', true);
		return;
	}

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		city.showMessage('msModalEdit', 'msModalEdit', 'Ingrese un nombre para la ciudad', 'warning', 'modal', true);
		return;
	}

	var data = city.set(editCitysService ,dataAndAccount, '');
	if(data.success == 'false'){
		city.showMessage('msModalEdit', 'msModalEdit', 'No se pudo editar la ciudad<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		city.showMessage('msCRUDCity', 'nameEmployed', 'Se Editó la ciudad con exito!', 'success', 'default', true);
		$('#myModalEdit').modal('hide');
		loadCitys();
	}
}

function deleteCity(idCity) {
	var city = findElement(citys, 'idCity', idCity);
	//console.log("delete "+idCity+" - "+JSON.stringify(city));
	data = '';
	data += '<div class="modal-body">';
	data += '<div id="msDeleteCity"></div>';
	data += '<p>Está a punto de eliminar la ciudad con los siguientes datos: </p>';
	data += '<div class="panel panel-default"><div class="panel-heading">Ciudad</div>';
  	data += '<div class="panel-body">';
    data += '<strong>Ciudad: </strong>'+city.name+"<br>";
  	data += '<strong>Pais: </strong>'+countrys.getById(city.idCountry, 'idCountry', false, 'encontrado').name;
  	data += '</div></div>';
  	data += '<p>está accion es irreversible, ¿desea continuar?</p>';		     
	data += '</div><div class="modal-footer">';
	data +=	'<button type="button" class="btn btn-primary" onclick="approvedDeleteCity('+idCity+')">Continuar, Eliminar la ciudad</button>';
    data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
   	data += '</div>';
   	$('#bodyModalDelete').html(data);
   	$('#myModalDelete').modal('show');
}

function approvedDeleteCity(idCity) {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idCity": idCity};
	var city = newDinamicOWS(false);
	var data = city.remove(deleteCityService ,dataAndAccount, '');
	if(data.success == 'false'){
		city.showMessage('msDeleteCity', 'msDeleteCity', 'No se pudo eliminar la ciudad<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		city.showMessage('msCRUDCity', 'nameEmployed', 'Se elimino la ciudad con exito!', 'success', 'default', true);
		$('#myModalDelete').modal('hide');
		loadCitys();
	}
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}