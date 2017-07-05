package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import conexion.ConnectionData;
import vo.UserRoll;

public class DAOUserRoll {
	
	public static List<UserRoll> getUserRoll(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from User_Role";
			List<UserRoll> usersrolls = connection.createQuery(query)
			        		 .executeAndFetch(UserRoll.class);
			connection.close();
			return usersrolls;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static boolean insert(long idUser, long rol) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="insert into User_Role(idUser, idRole) values(:idUser, :idRol)";
			connection.createQuery(query)
					.addParameter("idUser",idUser)
					.addParameter("idRol", rol)
					.executeUpdate();
			connection.commit();
			connection.close();
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
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="delete from User_Role where User_Role.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("idUser", idUsuario)
					.executeUpdate();
			connection.commit();
			connection.close();
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
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update User_Role set idRole = :idRol where User_Role.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("idRol", userrol.getIdRole())
					.addParameter("idUser", userrol.getIdUser())
					.executeUpdate();
			connection.commit();
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
