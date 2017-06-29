package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.Value;

public class DAOValue {
	
	public static List<Value> getCities(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Value";
			List<Value> ciudades = connection.createQuery(query)
			        		 .executeAndFetch(Value.class);
			return ciudades;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Value getValueById(long cname) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Value where idValue = :cname";
			List<Value> valueV = connection.createQuery(query)
					.addParameter("cname", cname)
			        .executeAndFetch(Value.class);
			return valueV.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The valueV was not found");
			}else{
				System.out.println(" -> Error DAOValue getValueById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertValue(Value valueV) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="insert into Value(name, value) values(:name, :value)";
			connection.createQuery(query)
					.addParameter("name",valueV.getName())
					.addParameter("value", valueV.getValue())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Value");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteValue(long idValue) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="delete from Value where Value.idValue = :id";
			connection.createQuery(query)
					.addParameter("id", idValue)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete value");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateValue(Value valueV) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update Value set name = :name, value = :value where Value.idValue = :id";
			connection.createQuery(query)
					.addParameter("id",  valueV.getIdValue())
					.addParameter("name",valueV.getName())
					.addParameter("value", valueV.getValue())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error valueV updatedao");
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
