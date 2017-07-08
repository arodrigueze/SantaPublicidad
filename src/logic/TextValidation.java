package logic;

public class TextValidation {
	
	public static String cambiarTildes(String palabra){
		palabra = palabra.toLowerCase();
		palabra = palabra.replace("á", "a");
		palabra = palabra.replace("é", "e");
		palabra = palabra.replace("í", "i");
		palabra = palabra.replace("ó", "o");
		palabra = palabra.replace("ú", "u");
		return palabra;
	}
	
	public static String convertirParaPruebas(String palabra){		
		palabra = palabra.trim();
		palabra = cambiarTildes(palabra);
		palabra.toLowerCase();
		palabra = palabra.replaceAll("\\s+","");
		return palabra;
	}

}
