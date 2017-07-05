package dao;

public class ConnectionData {

	private static String dataBase = "jdbc:mysql://localhost:3306/SPDB";
	//private static String dataBase = "jdbc:mysql://www.santapublicidad.com:3306/santa8zy_spdb";
	private static String dataBaseUser = "root";
	//private static String dataBaseUser = "santa8zy_appspdb";
	private static String dataBasePass = "";
	//private static String dataBasePass = "rC(RikRG#C$2";
	
	private static String[] urlAccess = {"http://localhost:8080","agenciasantaaplicacionempresa.herokuapp.com"};
	
	
	public static String[] getUrlAccess() {
		return urlAccess;
	}
	public static String getDataBase() {
		return dataBase;
	}
	public static String getDataBaseUser() {
		return dataBaseUser;
	}
	public static String getDataBasePass() {
		return dataBasePass;
	}
	public static int verifyAccess(String referer){
		if(referer != null) {
			for (int i = 0; i < urlAccess.length; i++) {
				if(referer.contains(urlAccess[i])){
					System.out.println("Acceso valido desde "+urlAccess[i]);
					return i;
				}
			}
		}
		return -1;
	}	
}
