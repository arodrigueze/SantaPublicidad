package dao;

import java.util.List;
import conexion.ConexionSingleton;
import vo.Contact;

public class DAOContact {

	public static List<Contact> getContact(){
		initDriver();
		try {
			String query="select * from Contact";
			List<Contact> contact = ConexionSingleton.getInstance().createQuery(query)
			        		 .executeAndFetch(Contact.class);
			return contact;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Contact getContactById(long idContact) {
		initDriver();
		try {
			String query="select * from Contact where idContact = :id";
			List<Contact> contact = ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idContact)
			        .executeAndFetch(Contact.class);
			return contact.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The contact was not found");
			}else{
				System.out.println(" -> Error DAOContact getContactById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertContact(Contact contact) {
		initDriver();
		
		try {
			if (contact.getIdProvider()==0) {
				String query="insert into Contact(name,email,phoneNumber,idClient) values(:name, :email, :phonenumber, :idclient)";
				ConexionSingleton.getInstance().createQuery(query)
						.addParameter("name",contact.getName())
						.addParameter("email", contact.getEmail())
						.addParameter("phonenumber", contact.getPhoneNumber())
						.addParameter("idclient", contact.getIdClient())
						.executeUpdate();
				ConexionSingleton.getInstance().commit();
				return true;
			}else if (contact.getIdClient()==0) {
				String query="insert into Contact(name,email,phoneNumber,idProvider) values(:name, :email, :phonenumber, :idprovider)";
				ConexionSingleton.getInstance().createQuery(query)
						.addParameter("name",contact.getName())
						.addParameter("email", contact.getEmail())
						.addParameter("phonenumber", contact.getPhoneNumber())
						.addParameter("idprovider", contact.getIdProvider())
						.executeUpdate();
				ConexionSingleton.getInstance().commit();
				return true;
			}else{
				return false;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Contact");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteContact(long idContact) {
		initDriver();
		try {
			String query="delete from Contact where Contact.idContact = :id";
			ConexionSingleton.getInstance().createQuery(query)
					.addParameter("id", idContact)
					.executeUpdate();
			ConexionSingleton.getInstance().commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete contact");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateContact(Contact contact) {
		initDriver();
		try {
			if (contact.getIdClient()==0) {
				String query="update Contact set name = :name, email = :email, phoneNumber = :phonenumber, idProvider = :idprovider where Contact.idContact = :id";
				ConexionSingleton.getInstance().createQuery(query)
						.addParameter("id",  contact.getIdContact())
						.addParameter("name",contact.getName())
						.addParameter("email", contact.getEmail())
						.addParameter("phonenumber", contact.getPhoneNumber())
						.addParameter("idprovider", contact.getIdProvider())
						.executeUpdate();
				ConexionSingleton.getInstance().commit();
				return true;
			}else if (contact.getIdProvider()==0) {
				String query="update Contact set name = :name, email = :email, phoneNumber = :phonenumber, idClient = :idclient where Contact.idContact = :id";
				ConexionSingleton.getInstance().createQuery(query)
						.addParameter("id",  contact.getIdContact())
						.addParameter("name",contact.getName())
						.addParameter("email", contact.getEmail())
						.addParameter("phonenumber", contact.getPhoneNumber())
						.addParameter("idclient", contact.getIdClient())
						.executeUpdate();
				ConexionSingleton.getInstance().commit();
				return true;
			}else{
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update contact");
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
