package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import conexion.ConnectionData;
import vo.Roll;
import vo.UserRoll;

public class DAORoll {
		
	public static List<Roll> getRoll(){
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			String query="select * from Role";
			List<Roll> role = connection.createQuery(query)
			        		 .executeAndFetch(Roll.class);
			return role;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Roll getRoleByIdUser(long iduser) {
		initDriver();
		try (Connection connection = new Sql2o(ConnectionData.getDataBase(),ConnectionData.getDataBaseUser(),ConnectionData.getDataBasePass()).open()){
			long idrole=-1;
			List<UserRoll> userroles = DAOUserRoll.getUserRoll();
			for (int i = 0; i < userroles.size(); i++) {
				if(iduser==userroles.get(i).getIdUser()){
					idrole=userroles.get(i).getIdRole();
					break;
				}
			}
			if (idrole<1) {
				throw new IllegalArgumentException("Roll Incorrecto");
			}
			
			String query="select * from Role where idRole = :idroll";
			List<Roll> role = connection.createQuery(query)
					.addParameter("idroll", idrole)
			        .executeAndFetch(Roll.class);
			return role.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The area was not founds");
			}else{
				System.out.println(" -> Error");
				System.out.println(e);
			}
			return null;
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
