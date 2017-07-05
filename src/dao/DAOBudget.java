package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import conexion.ConnectionData;
import vo.Budget;

public class DAOBudget {
	
	public static List<Budget> getBudget(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Budget";
			List<Budget> budget = connection.createQuery(query)
			        		 .executeAndFetch(Budget.class);
			return budget;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Budget getBudgetById(long idBudget) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Budget where idBudget = :id";
			List<Budget> budget = connection.createQuery(query)
					.addParameter("id", idBudget)
			        .executeAndFetch(Budget.class);
			return budget.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The budget was not found");
			}else{
				System.out.println(" -> Error DAOBudget getBudgetById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertBudget(Budget budget) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="insert into Budget(observations, date, commercialTerms, bruteTotal, IVA, months, activityTotal, idProject) values(:observations, :date, :commercialTerms, :bruteTotal, :IVA, :months, :activityTotal, :idProject)";
			connection.createQuery(query)
					.addParameter("observations",budget.getObservations())
					.addParameter("date", budget.getDate())
					.addParameter("commercialTerms", budget.getCommercialTerms())
					.addParameter("bruteTotal", budget.getBruteTotal())
					.addParameter("IVA", budget.getIVA())
					.addParameter("months", budget.getMonths())
					.addParameter("activityTotal", budget.getActivityTotal())
					.addParameter("idProject", budget.getIdProject())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Budget");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteBudget(long idBudget) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="delete from Budget where Budget.idBudget = :id";
			connection.createQuery(query)
					.addParameter("id", idBudget)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete budget");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateBudget(Budget budget) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update Budget set observations = :observations, date = :date, commercialTerms = :commercialTerms, bruteTotal = :bruteTotal, IVA = :IVA, months = :months, activityTotal = :activityTotal, idProject = :idProject  where Budget.idBudget = :id";
			connection.createQuery(query)
					.addParameter("id",  budget.getIdBudget())
					.addParameter("observations",budget.getObservations())
					.addParameter("date", budget.getDate())
					.addParameter("commercialTerms", budget.getCommercialTerms())
					.addParameter("bruteTotal", budget.getBruteTotal())
					.addParameter("IVA", budget.getIVA())
					.addParameter("months", budget.getMonths())
					.addParameter("activityTotal", budget.getActivityTotal())
					.addParameter("idProject", budget.getIdProject())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update budget");
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
