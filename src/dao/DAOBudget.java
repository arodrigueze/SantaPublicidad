package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.Budget;

public class DAOBudget {
	
	public static List<Budget> getBudget(){
		initDriver();
		try {
			String query="select * from Budget";
			List<Budget> budget = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(Budget.class);
			return budget;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Budget getBudgetById(long idBudget) {
		initDriver();
		try {
			String query="select * from Budget where idBudget = :id";
			List<Budget> budget = ConexionSingleton.getInstance().createQuery(query)
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
		
		try {
			String query="insert into Budget(observations, date, commercialTerms, bruteTotal, IVA, months, activityTotal, idProject) values(:observations, :date, :commercialTerms, :bruteTotal, :IVA, :months, :activityTotal, :idProject)";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("observations",budget.getObservations())
					.addParameter("date", budget.getDate())
					.addParameter("commercialTerms", budget.getCommercialTerms())
					.addParameter("bruteTotal", budget.getBruteTotal())
					.addParameter("IVA", budget.getIVA())
					.addParameter("months", budget.getMonths())
					.addParameter("activityTotal", budget.getActivityTotal())
					.addParameter("idProject", budget.getIdProject())
					.executeUpdate();
			ConexionSingleton.getInstance().commit();
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
		try {
			String query="delete from Budget where Budget.idBudget = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idBudget)
					.executeUpdate();
			ConexionSingleton.getInstance().commit();
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
		try {
			String query="update Budget set observations = :observations, date = :date, commercialTerms = :commercialTerms, bruteTotal = :bruteTotal, IVA = :IVA, months = :months, activityTotal = :activityTotal, idProject = :idProject  where Budget.idBudget = :id";
			ConexionSingleton.getInstance().createQuery(query)
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
			ConexionSingleton.getInstance().commit();
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
