$(document).ready(function(){
	if(sessionStorage.roll != rollAdmin){
		$('#usersOption').css("display","none");
		$('#clientsOption').css("display","none");
		$('#providersOption').css("display","none");
		$('#otherOption').css("display","none");
	}
});
