package conexion;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

public class ConexionSingleton {

	private static Connection _instance;

	private ConexionSingleton() {
		try {
			_instance = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	public static synchronized Connection getInstance() {
		if (_instance == null) {
			_instance = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open();
		}
		return _instance;
	}
}
