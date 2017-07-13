package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.Value;

public class DAOValue {
	
	public static List<Value> getCities(){
		initDriver();
		try {
			String query="select * from Value";
			List<Value> ciudades = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(Value.class);
			return ciudades;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Value getValueById(long cname) {
		initDriver();
		try {
			String query="select * from Value where idValue = :cname";
			List<Value> valueV = ConexionSingleton.getInstance().createQuery(query)
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
		
		try {
			String query="insert into Value(name, value) values(:name, :value)";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("name",valueV.getName())
					.addParameter("value", valueV.getValue())
					.executeUpdate();
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
		try {
			String query="delete from Value where Value.idValue = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idValue)
					.executeUpdate();
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
		try {
			String query="update Value set name = :name, value = :value where Value.idValue = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id",  valueV.getIdValue())
					.addParameter("name",valueV.getName())
					.addParameter("value", valueV.getValue())
					.executeUpdate();
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
