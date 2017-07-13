package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.Area;

public class DAOArea {
	
	public static List<Area> getAreas(){
		initDriver();
		try {
			String query="select * from Area";
			List<Area> areas = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(Area.class);
			return areas;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Area getAreaByIdArea(long areaId) {
		initDriver();
		try {
			String query="select * from Area where idArea = :idArea";
			List<Area> area = ConexionSingleton.getInstance().createQuery(query)
					.addParameter("idArea", areaId)
			        .executeAndFetch(Area.class);
			return area.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The area was not found");
			}else{
				System.out.println(" -> Error");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertArea(String name) {
		initDriver();
		try {
			String query="insert into Area(name) values(:name)";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("name", name)
					.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteArea(long idArea) {
		initDriver();
		try {
			String query="delete from Area where Area.idArea = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idArea)
					.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete area");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateArea(Area area) {
		initDriver();
		try {
			String query="update Area set name = :name where Area.idArea = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id",  area.getIdArea())
					.addParameter("name",area.getName())
					.executeUpdate();
			return true;
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update area dao");
			System.out.println(e);
			return false;
		}
	}
	
	public static void initDriver(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println();
		} catch (ClassNotFoundException e) {
			System.out.println(e);
		}
	}

}
