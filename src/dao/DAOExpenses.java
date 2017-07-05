package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import conexion.ConnectionData;
import vo.Expenses;

public class DAOExpenses {
	
	public static List<Expenses> getExpenses(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Expenses";
			List<Expenses> expenses = connection.createQuery(query)
			        		 .executeAndFetch(Expenses.class);
			return expenses;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Expenses getExpensesById(long idExpenses) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Expenses where idExpenses = :id";
			List<Expenses> expenses = connection.createQuery(query)
					.addParameter("id", idExpenses)
			        .executeAndFetch(Expenses.class);
			return expenses.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The expenses was not found");
			}else{
				System.out.println(" -> Error DAOExpenses getExpensesById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertExpenses(Expenses expenses) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="insert into Expenses(name, description,value,idBudgetPS) values(:name, :desc, :value, :idBudgetPS)";
			connection.createQuery(query)
					.addParameter("name",expenses.getName())
					.addParameter("desc", expenses.getDescription())
					.addParameter("value", expenses.getValue())
					.addParameter("idBudgetPS", expenses.getIdBudgetPS())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Expenses");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteExpenses(long idExpenses) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="delete from Expenses where Expenses.idExpenses = :id";
			connection.createQuery(query)
					.addParameter("id", idExpenses)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete expenses");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateExpenses(Expenses expenses) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).beginTransaction()){
			String query="update Expenses set name = :name, description = :desc, value = :value, idBudgetPS = :idBudgetPS  where Expenses.idExpenses = :id";
			connection.createQuery(query)
					.addParameter("id",  expenses.getIdExpenses())
					.addParameter("name",expenses.getName())
					.addParameter("desc", expenses.getDescription())
					.addParameter("value", expenses.getValue())
					.addParameter("idBudgetPS", expenses.getIdBudgetPS())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update expenses");
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
