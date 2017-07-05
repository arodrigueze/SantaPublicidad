package dao;

import java.util.List;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

import conexion.ConnectionData;
import vo.Roll;
import vo.User;
import vo.UserRoll;

public class DAOUser {
		
	public static List<User> getUsers(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from User where active = 1";
			List<User> users = connection.createQuery(query)
			        		 .executeAndFetch(User.class);
			connection.close();
			return users;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static User getUserByUsernameAndPassword(String username, String password) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from User where userName = :username and password = :password";
			List<User> users = connection.createQuery(query)
					.addParameter("username", username)
					.addParameter("password", password)
			        .executeAndFetch(User.class);
			connection.close();
			return users.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The user was not found");
			}else{
				System.out.println(" -> Error DAOUser getuserbynameandpass");
				System.out.println(e.getMessage());
			}
			return null;
		}
	}
	
	public static String getRollByUsername(String username) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from User where userName = :username";
			
			List<User> users = connection.createQuery(query)
					.addParameter("username", username)
			        .executeAndFetch(User.class);
			 
			 long iduser = users.get(0).getIdUser();
			 
			 String query2="select * from User_Role where idUser = :iduser";
			 List<UserRoll> userRoll = connection.createQuery(query2)
					.addParameter("iduser", iduser)
			        .executeAndFetch(UserRoll.class);
			
			 long idRoll = userRoll.get(0).getIdRole();
			
			 String query3="select * from Role where idRole = :id";
			 List<Roll> roll = connection.createQuery(query3)
					.addParameter("id", idRoll)
			        .executeAndFetch(Roll.class);
			 connection.close();
			 return roll.get(0).getName();
			 
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The user was not found");
			}else{
				System.out.println(" -> Error DAOUser getuserbynameandpass");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static User getUserById(String id) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from User where idUser = :id";
			List<User> users = connection.createQuery(query)
					.addParameter("id", id)
			        .executeAndFetch(User.class);
			connection.close();
			return users.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The user was not found");
			}else{
				System.out.println(" -> Error DAOUser getuserbynameandpass");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static User getUserByUsername(String username) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from User where userName = :username";
			List<User> users = connection.createQuery(query)
					.addParameter("username", username)
			        .executeAndFetch(User.class);
			connection.close();
			return users.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The user was not found");
			}else{
				System.out.println(" -> Error DAOUser getuserbynameandpass");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertUser(User usuario) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="insert into User(document, name, userName, password, idArea, email, active) values(:document, :name, :username, :password, :idArea, :email, :active)";
			connection.createQuery(query)
					.addParameter("document",usuario.getDocument())
					.addParameter("name", usuario.getName())
					.addParameter("username", usuario.getUserName() )
					.addParameter("password", usuario.getPassword())
					.addParameter("idArea", usuario.getIdArea())
					.addParameter("email",usuario.getEmail())
					.addParameter("active",usuario.isActive())
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
	
	public static boolean deleteUser(long idUsuario) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="delete from User where User.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("idUser", idUsuario)
					.executeUpdate();
			connection.commit();
			connection.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateUser(User usuario) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update User set document = :document, name = :name, userName = :username, password = :password, idArea = :idArea, email = :email, active = :active where User.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("document",usuario.getDocument())
					.addParameter("name", usuario.getName())
					.addParameter("username", usuario.getUserName() )
					.addParameter("password", usuario.getPassword())
					.addParameter("idArea", usuario.getIdArea())
					.addParameter("email",usuario.getEmail())
					.addParameter("idUser",usuario.getIdUser())
					.addParameter("active",true)
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
	
	public static boolean updateUserNoGerencia(User usuario) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update User set password = :password, email = :email where User.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("password", usuario.getPassword())
					.addParameter("email",usuario.getEmail())
					.addParameter("idUser",usuario.getIdUser())
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
	
	public static boolean updateUserActive(String id) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update User set  active = :active where User.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("idUser",id)
					.addParameter("active",false)
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
	public static void initDriver(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println(e);
		}
	}
}
