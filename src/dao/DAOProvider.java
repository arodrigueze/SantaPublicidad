package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.Provider;

public class DAOProvider {

	public static List<Provider> getProvider(){
		initDriver();
		try {
			String query="select * from Provider where active = 1";
			List<Provider> provider = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(Provider.class);
			return provider;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Provider getProviderById(long idProvider) {
		initDriver();
		try {
			String query="select * from Provider where idProvider = :id";
			List<Provider> provider = ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idProvider)
			        .executeAndFetch(Provider.class);
			return provider.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The provider was not found");
			}else{
				System.out.println(" -> Error DAOProvider getProviderById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertProvider(Provider provider) {
		initDriver();
		
		try {
			String query="insert into Provider(NIT, name, description,DV, active) values(:nit, :name, :desc, :dv,:active)";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("nit",provider.getNIT())
					.addParameter("name", provider.getName())
					.addParameter("desc", provider.getDescription())
					.addParameter("dv", provider.getDV())
					.addParameter("active", provider.isActive())
					.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Provider");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteProvider(long idProvider) {
		initDriver();
		try {
			String query="delete from Provider where Provider.idProvider = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idProvider)
					.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete provider");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateProvider(Provider provider) {
		initDriver();
		try {
			String query="update Provider set NIT = :nit, name = :name, description = :desc, DV = :dv, active = :active where Provider.idProvider = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id",  provider.getIdProvider())
					.addParameter("nit", provider.getNIT())
					.addParameter("name", provider.getName())
					.addParameter("desc", provider.getDescription())
					.addParameter("dv", provider.getDV())
					.addParameter("active", provider.isActive())
					.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update provider");
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
