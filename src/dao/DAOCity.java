package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.City;

public class DAOCity {
	
	public static List<City> getCities(){
		initDriver();
		try {
			String query="select * from City";
			List<City> ciudades = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(City.class);
			return ciudades;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static City getCityById(long cname) {
		initDriver();
		try {
			String query="select * from City where idCity = :cname";
			List<City> city = ConexionSingleton.getInstance().createQuery(query)
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
		
		try {
			String query="insert into City(name, idCountry) values(:name, :idc)";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("name",city.getName())
					.addParameter("idc", city.getIdCountry())
					.executeUpdate();
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
		try {
			String query="delete from City where City.idCity = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idCity)
					.executeUpdate();
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
		try {
			String query="update City set name = :name, idCountry = :idc where City.idCity = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("name",city.getName())
					.addParameter("idc", city.getIdCountry())
					.addParameter("id",  city.getIdCity())
					.executeUpdate();
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
