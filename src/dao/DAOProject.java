package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.Project;


public class DAOProject {

	public static List<Project> getProjects(){
		initDriver();
		try {
			String query="select * from Project where active = 1";
			List<Project> projects = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(Project.class);
			return projects;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
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
