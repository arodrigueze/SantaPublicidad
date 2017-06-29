$(document).ready(function(){
 	$(".signout").click(function(){singOut()});
});

validateAccount();
function validateAccount() {
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: validateLogin,
			type: 'GET',
			data: accountLogin,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				if(data.validate == "true"){
					sessionStorage.roll = data.roll;
					if(indexPage == window.location || indexPage == window.location+"index.html" || (window.location != (indexPage+'pages/') && validarPermisos(data.roll) == false)){
						window.location.assign(indexPage+'pages/');
					}
				}else{
					singOut();
					if(indexPage != window.location && indexPage != window.location+"index.html"){
						window.location.assign(indexPage);
					}
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	singOut();
	        	console.log("error",objXMLHttpRequest);
			}
		});
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}	
}

function validarPermisos(roll) {
	var link = window.location+"";	
	if(roll != rollAdmin){
		for (var i = 0; i < OperatorFoldersAllowed.length ; i++) {
			//console.log("1: "+OperatorFoldersAllowed[i].indexOf(link)+"\n\t"+OperatorFoldersAllowed[i]+"\n\t"+link);
			//console.log("2: "+link.indexOf(OperatorFoldersAllowed[i])+"\n\t"+OperatorFoldersAllowed[i]+"\n\t"+link);
			if(link.indexOf(OperatorFoldersAllowed[i]) != -1){
				return true;
			}
		}
		return false;
	}else{
		return true;
	}
}

function singOut() {
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		sessionStorage.removeItem("username");
		sessionStorage.removeItem("logincode");
		sessionStorage.removeItem("namel");
		sessionStorage.removeItem("roll");
		try {
	    	$.ajax({
				url: logoutService,
				type: 'GET',
				data: accountLogin,
				async : false,
				dataTipe:'JSON',
				success: function (data) {
					
		        },
		        error: function(objXMLHttpRequest) {
		        	console.log("error",objXMLHttpRequest);
				}
			});
		}catch(err) {
			console.log(err.message);
		}
		window.location.assign(indexPage);		
	}
}