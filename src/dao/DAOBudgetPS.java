package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.BudgetPS;

public class DAOBudgetPS {
	
	public static List<BudgetPS> getBudgetPS(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from BudgetPS";
			List<BudgetPS> budgetPS = connection.createQuery(query)
			        		 .executeAndFetch(BudgetPS.class);
			return budgetPS;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static BudgetPS getBudgetPSById(long idBudgetPS) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from BudgetPS where idBudgetPS = :id";
			List<BudgetPS> budgetPS = connection.createQuery(query)
					.addParameter("id", idBudgetPS)
			        .executeAndFetch(BudgetPS.class);
			return budgetPS.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The budgetPS was not found");
			}else{
				System.out.println(" -> Error DAOBudgetPS getBudgetPSById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertBudgetPS(BudgetPS budgetPS) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="insert into BudgetPS(margin, amount, days, unitValue, idProductService, idBudget) values(:margin, :amount, :days, :unitValue, :idProductService, :idBudget)";
			connection.createQuery(query)
					.addParameter("margin",budgetPS.getMargin())
					.addParameter("amount", budgetPS.getAmount())
					.addParameter("days", budgetPS.getDays())
					.addParameter("unitValue", budgetPS.getUnitValue())
					.addParameter("idProductService", budgetPS.getIdProductService())
					.addParameter("idBudget", budgetPS.getIdBudget())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar BudgetPS");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteBudgetPS(long idBudgetPS) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="delete from BudgetPS where BudgetPS.idBudgetPS = :id";
			connection.createQuery(query)
					.addParameter("id", idBudgetPS)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete budgetPS");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateBudgetPS(BudgetPS budgetPS) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update BudgetPS set margin = :margin, amount = :amount, days = :days, unitValue = :unitValue, idProductService = :idProductService, idBudget = :idBudget  where BudgetPS.idBudgetPS = :id";
			connection.createQuery(query)
					.addParameter("id",  budgetPS.getIdBudgetPS())
					.addParameter("margin",budgetPS.getMargin())
					.addParameter("amount", budgetPS.getAmount())
					.addParameter("days", budgetPS.getDays())
					.addParameter("unitValue", budgetPS.getUnitValue())
					.addParameter("idProductService", budgetPS.getIdProductService())
					.addParameter("idBudget", budgetPS.getIdBudget())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update budgetPS");
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
