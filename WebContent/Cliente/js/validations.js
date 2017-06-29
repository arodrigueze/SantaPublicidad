function numberValidation (number, natural, decimal) {
	if(isNaN(parseFloat(number))) return false;
	if(natural && (number < 0)) return false;
	if(decimal == false && ((number+"").indexOf(".")!=-1 || (number+"").indexOf(",")!=-1)) return false;
	return true;
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

function documentValidation(number) {
	if(notBlakSpaceValidation(number)==false) return false;
	if(numberValidation(number, true, false) == false) return false;
	return true;
}

function priceValidation(price) {
	if(notBlakSpaceValidation(price)==false) return false;
	if(numberValidation(price, true, true) == false) return false;
	return true;
}

function emailValidation(email) {
	if(email.indexOf('@', 0) == -1) return false;
   	if(email.substring(email.indexOf('@', 0)).indexOf('.', 0) <= 0) return false;
    return true;
}

function passwordValidation(password) {
	if(notBlakSpaceValidation(password)==false) return false;
	if(password.length < 8 || password.length > 20) return false;
	var upperCase = false;	var lowerCase = false; var charespecial = false; var number = false;
	for (var i = 0; i < password.length; i++) {
		var character = password.charCodeAt(i);
		if(character<= 57 && character >= 48) number = true;
		else if(character<= 90 && character >= 65) upperCase = true;
		else if(character<= 122 && character >= 97) lowerCase = true;
		else charespecial = true;
		if(upperCase && lowerCase && charespecial && number) return true;
	} return false;
}

function notBlakSpaceValidation(data) {
	try{
		if(data == null) return false;
		if(data.trim() == "") return false;
		if(data.length > 0) return true;
		return true;
	}catch (err){
		if(isBooleanValidation(data)) return true;
		if((data+"").length > 0) return true;
		return false;
	}
}

function isBooleanValidation(data) {
	if(data == true) return true;
	if(data == false) return true;
	return false;
}