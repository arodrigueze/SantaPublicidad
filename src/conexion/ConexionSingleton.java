package conexion;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

public class ConexionSingleton {

	private static Connection _instance;

	private ConexionSingleton() {
		try {
			_instance = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open();
		} catch (Exception e) {
			System.out.println("Error en la conexion con la base de datos.");
			System.out.println(""+e.getMessage());
		}
	}

	public static synchronized Connection getInstance() {
		if (_instance == null) {
			_instance = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open();
		}
		return _instance;
	}
}
