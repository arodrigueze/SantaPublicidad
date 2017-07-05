package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import conexion.ConnectionData;
import vo.City;

public class DAOCity {
	
	public static List<City> getCities(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from City";
			List<City> ciudades = connection.createQuery(query)
			        		 .executeAndFetch(City.class);
			return ciudades;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static City getCityById(long cname) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from City where idCity = :cname";
			List<City> city = connection.createQuery(query)
					.addParameter("cname", cname)
			        .executeAndFetch(City.class);
			return city.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The city was not found");
			}else{
				System.out.println(" -> Error DAOCity getCityByname");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertCity(City city) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="insert into City(name, idCountry) values(:name, :idc)";
			connection.createQuery(query)
					.addParameter("name",city.getName())
					.addParameter("idc", city.getIdCountry())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar City");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteCity(long idCity) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="delete from City where City.idCity = :id";
			connection.createQuery(query)
					.addParameter("id", idCity)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete city");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateCity(City city) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update City set name = :name, idCountry = :idc where City.idCity = :id";
			connection.createQuery(query)
					.addParameter("name",city.getName())
					.addParameter("idc", city.getIdCountry())
					.addParameter("id",  city.getIdCity())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error city updatedao");
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
