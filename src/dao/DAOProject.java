package dao;

import java.util.List;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.Project;


public class DAOProject {

	public static List<Project> getProjects(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Project where active = 1";
			List<Project> projects = connection.createQuery(query)
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
