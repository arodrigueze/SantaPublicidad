package conexion;

import java.net.URI;
import java.net.URISyntaxException;

public class ConnectionData {
/*
	private static String dataBase = "jdbc:mysql://localhost:3306/SPDB";
	private static String dataBaseUser = "root";
	private static String dataBasePass = "";
*/

	private static String dataBase = "";
	private static String dataBaseUser = "";
	private static String dataBasePass = "";
	
	private static String[] urlAccess = {"http://localhost:8080","agenciasantaaplicacionempresa.herokuapp.com"};
	
	
	public static String[] getUrlAccess() {
		return urlAccess;
	}
	public static String getDataBase() throws URISyntaxException {
		URI dbUri = new URI(System.getenv("CLEARDB_DATABASE_URL"));
		dataBase = "jdbc:mysql://" + dbUri.getHost() + dbUri.getPath();
		return dataBase;
	}
	public static String getDataBaseUser() throws URISyntaxException {
		URI dbUri = new URI(System.getenv("CLEARDB_DATABASE_URL"));
		dataBaseUser = dbUri.getUserInfo().split(":")[0];
		return dataBaseUser;
	}
	public static String getDataBasePass() throws URISyntaxException {
		URI dbUri = new URI(System.getenv("CLEARDB_DATABASE_URL"));
		dataBasePass = dbUri.getUserInfo().split(":")[1];
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
