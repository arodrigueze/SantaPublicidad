package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import conexion.ConnectionData;
import vo.Country;


public class DAOCountry {

	public static List<Country> getCountry(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Country";
			List<Country> paises = connection.createQuery(query)
			        		 .executeAndFetch(Country.class);
			return paises;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Country getCountryById(long cname) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Country where idCountry = :cname";
			List<Country> country = connection.createQuery(query)
					.addParameter("cname", cname)
			        .executeAndFetch(Country.class);
			return country.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The user was not found");
			}else{
				System.out.println(" -> Error DAOCountry getCountryByname");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertCountry(Country country) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="insert into Country(name) values(:name)";
			connection.createQuery(query)
					.addParameter("name", country.getName())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Country");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteCountry(long country) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="delete from Country where Country.idCountry = :id";
			connection.createQuery(query)
					.addParameter("id", country)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete country");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateCountry(Country country) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update Country set name = :name where Country.idCountry = :id";
			connection.createQuery(query)
					.addParameter("name", country.getName())
					.addParameter("id", country.getIdCountry())
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
