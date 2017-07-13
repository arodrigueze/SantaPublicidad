package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.UserRoll;

public class DAOUserRoll {
	
	public static List<UserRoll> getUserRoll(){
		initDriver();
		try {
			String query="select * from User_Role";
			List<UserRoll> usersrolls = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(UserRoll.class);
			return usersrolls;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static boolean insert(long idUser, long rol) {
		initDriver();
		
		try {
			String query="insert into User_Role(idUser, idRole) values(:idUser, :idRol)";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("idUser",idUser)
					.addParameter("idRol", rol)
					.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteUserRoll(long idUsuario) {
		initDriver();
		try {
			String query="delete from User_Role where User_Role.idUser = :idUser";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("idUser", idUsuario)
					.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean updateUserRoll(UserRoll userrol) {
		initDriver();
		try {
			String query="update User_Role set idRole = :idRol where User_Role.idUser = :idUser";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("idRol", userrol.getIdRole())
					.addParameter("idUser", userrol.getIdUser())
					.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error");
			System.out.println(e);
			return false;
		}
	}
	
	public static void initDriver(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println(e);
		}
	}

}
