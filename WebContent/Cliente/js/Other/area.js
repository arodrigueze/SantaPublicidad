$(document).ready(function(){
	loadAreas();
	$(".filter").keyup(function(){listAreas()});
	$('.filter').focus();
});

var areas = {};
function loadAreas() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var areasObj = newDinamicOWS(false);
	var data = areasObj.get(areaList ,dataAndAccount, 'name','areas');
	if(data.success == 'false'){
		areasObj.showMessage('msCRUDArea', 'nameEmployed', 'No se pudo cargar las areas<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	}else{
		areas = areasObj.dataArray;
		listAreas();	
	}
}

function listAreas() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Area</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < areas.length; i++) {
		var area = (areas[i].name).toUpperCase();
		if(find == "" || area.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+areas[i].name+'</td>';
			data+='<td onclick="editArea('+areas[i].idArea+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
			data+='<td onclick="deleteArea('+areas[i].idArea+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron areas");
	}else{ $('#msfind').html("");}
	content += data+'</table>';
	$('#lista').html(content);
}

function createArea(){
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "nombreArea": $('#area').val()};
	var area = newDinamicOWS(false);
	if(notBlakSpaceValidation(dataAndAccount.nombreArea)==false){
		area.showMessage('msCRUDArea', 'nameEmployed', 'Ingrese un nombre para el area', 'warning', 'modal', true);
		return;
	}
	var data = area.add(createAreaService ,dataAndAccount, '');
	if(data.success == 'false'){
		area.showMessage('msCRUDArea', 'nameEmployed', 'No se pudo crear el area<br><strong>Motivo: </strong>'+data.status, 'warning', 'default', true);	
	}else{
		area.showMessage('msCRUDArea', 'nameEmployed', 'Se creo el area con exito!', 'success', 'default', true);
		$('#area').val("");
		loadAreas();
	}
}

function editArea(idArea){
	var area = findElement(areas, 'idArea', idArea);
	//console.log("Edit "+idArea+" - "+JSON.stringify(area));
	data = '';
	data += '<form action="javascript:approvedEditArea()">';
	data += '<div class="modal-body">';
	data += '<div id="msModalEdit"></div>';
	data += '<input type="hidden" class="form-control" id="idAdreaEdit" placeholder="idArea" required>';
	data += '<div class="form-group" id="inputAreaEdit">';
	data += '<label for="inputForm">Area</label>';
	data += '<input type="text" class="form-control" id="areaEdit" placeholder="Area" required>';
	data += '</div>';
	data += '</div><div class="modal-footer">';
    data +=	'<button type="submit" class="btn btn-primary">Guardar</button>';
   	data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    data += '</div>';
	data += '</form>';
   	$('#bodyModalEdit').html(data);
   	$('#idAdreaEdit').val(area.idArea);
   	$('#areaEdit').val(area.name);
   	$('#myModalEdit').modal('show');
}

function approvedEditArea() {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idArea": $('#idAdreaEdit').val(), "name": $('#areaEdit').val()};
	var area = newDinamicOWS(false);

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		area.showMessage('msModalEdit', 'msModalEdit', 'Ingrese un nombre para el area', 'warning', 'modal', true);
		return;
	}

	var data = area.set(editAreaService ,dataAndAccount, '');
	if(data.success == 'false'){
		area.showMessage('msModalEdit', 'msModalEdit', 'No se pudo editar el area<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		area.showMessage('msCRUDArea', 'nameEmployed', 'Se Editó el area con exito!', 'success', 'default', true);
		$('#myModalEdit').modal('hide');
		loadAreas();
	}
}

function deleteArea(idArea) {
	var area = findElement(areas, 'idArea', idArea);
	//console.log("delete "+idArea+" - "+JSON.stringify(area));
	data = '';
	data += '<div class="modal-body">';
	data += '<div id="msDeleteArea"></div>';
	data += '<p>Está a punto de eliminar el area con los siguientes datos: </p>';
	data += '<div class="panel panel-default"><div class="panel-heading">Area</div>';
  	data += '<div class="panel-body">';
    data += '<strong>Nombre de la area: </strong>'+area.name;
  	data += '</div></div>';
  	data += '<p>está accion es irreversible, ¿desea continuar?</p>';		     
	data += '</div><div class="modal-footer">';
	data +=	'<button type="button" class="btn btn-primary" onclick="approvedDeleteArea('+idArea+')">Continuar, Eliminar la area</button>';
    data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
   	data += '</div>';
   	$('#bodyModalDelete').html(data);
   	$('#myModalDelete').modal('show');
}

function approvedDeleteArea(idArea) {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idArea": idArea};
	var area = newDinamicOWS(false);
	var data = area.remove(deleteAreaService ,dataAndAccount, '');
	if(data.success == 'false'){
		area.showMessage('msDeleteArea', 'msDeleteArea', 'No se pudo eliminar el area<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		area.showMessage('msCRUDArea', 'nameEmployed', 'Se elimino el area con exito!', 'success', 'default', true);
		$('#myModalDelete').modal('hide');
		loadAreas();
	}
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}