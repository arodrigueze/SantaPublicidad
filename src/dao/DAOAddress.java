package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.Address;

public class DAOAddress {

	public static List<Address> getAddress(){
		initDriver();
		try {
			String query="select * from Address";
			List<Address> address = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(Address.class);
			return address;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Address getAddressById(long idAddress) {
		initDriver();
		try {
			String query="select * from Address where idAddress = :id";
			List<Address> address = ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idAddress)
			        .executeAndFetch(Address.class);
			return address.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The address was not found");
			}else{
				System.out.println(" -> Error DAOAddress getAddressById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertAddress(Address address) {
		initDriver();
		try {
			if (address.getIdProvider()==0) {
				String query="insert into Address(address, idCity, idClient) values(:address, :idcy, :idct)";
				ConexionSingleton.getInstance().createQuery(query)
						.addParameter("address",address.getAddress())
						.addParameter("idcy", address.getIdCity())
						.addParameter("idct", address.getIdClient())
						.executeUpdate();
				ConexionSingleton.getInstance().commit();
				return true;
			}else if(address.getIdClient()==0){
				String query="insert into Address(address, idProvider, idCity) values(:address, :idP, :idcy)";
				ConexionSingleton.getInstance().createQuery(query)
						.addParameter("address",address.getAddress())
						.addParameter("idP", address.getIdProvider())
						.addParameter("idcy", address.getIdCity())
						.executeUpdate();
				ConexionSingleton.getInstance().commit();
				return true;
			}else{
				System.out.println("Error debido a que los id de provedor o cliente son erroneos");
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Address");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteAddress(long idAddress) {
		initDriver();
		try {
			String query="delete from Address where Address.idAddress = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idAddress)
					.executeUpdate();
			ConexionSingleton.getInstance().commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete address");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateAddress(Address address) {
		initDriver();
		try {
			if (address.getIdProvider()==0){
				String query="update Address set address = :address, idCity = :idcy, idClient = :idc where Address.idAddress = :id";
				ConexionSingleton.getInstance().createQuery(query)
						.addParameter("id",  address.getIdAddress())
						.addParameter("address",address.getAddress())
						.addParameter("idcy", address.getIdCity())
						.addParameter("idc", address.getIdClient())
						.executeUpdate();
				ConexionSingleton.getInstance().commit();
				return true;
			}else  if(address.getIdClient()==0){
				String query="update Address set address = :address, idProvider = :idp, idCity = :idcy where Address.idAddress = :id";
				ConexionSingleton.getInstance().createQuery(query)
						.addParameter("id",  address.getIdAddress())
						.addParameter("address",address.getAddress())
						.addParameter("idp", address.getIdProvider())
						.addParameter("idcy", address.getIdCity())
						.executeUpdate();
				ConexionSingleton.getInstance().commit();
				return true;
			}else{
				return false;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update address dao");
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
