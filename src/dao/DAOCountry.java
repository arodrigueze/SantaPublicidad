package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.Country;


public class DAOCountry {

	public static List<Country> getCountry(){
		initDriver();
		try {
			String query="select * from Country";
			List<Country> paises = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(Country.class);
			return paises;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Country getCountryById(long cname) {
		initDriver();
		try {
			String query="select * from Country where idCountry = :cname";
			List<Country> country = ConexionSingleton.getInstance().createQuery(query)
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
		
		try {
			String query="insert into Country(name) values(:name)";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("name", country.getName())
					.executeUpdate();
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
		try {
			String query="delete from Country where Country.idCountry = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", country)
					.executeUpdate();
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
		try {
			String query="update Country set name = :name where Country.idCountry = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("name", country.getName())
					.addParameter("id", country.getIdCountry())
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
