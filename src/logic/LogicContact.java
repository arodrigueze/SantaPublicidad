package logic;

import java.util.List;

import org.json.JSONObject;
import dao.DAOContact;
import vo.Contact;

public class LogicContact {

	public static JSONObject getContactsJSON() {
		JSONObject obj = new JSONObject();
		List<Contact> contacts = DAOContact.getContact();
		if (contacts != null) {
			obj.putOnce("contacts", contacts);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar contactos");
			return obj;
		}
	}

	public static JSONObject createContact(Contact contact) {
		JSONObject obj = new JSONObject();
		List<Contact> contacts = DAOContact.getContact();
				
		if (DAOContact.insertContact(contact)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			contacts = DAOContact.getContact();
			if (contacts==null) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Error el obtener el id del contacto.");
				return obj;
			}
			for(int i = 0; i < contacts.size(); i++) {
				if (contacts.get(i).getName().toLowerCase().equals(contact.getName().toLowerCase())) {
					obj.remove("idcontact");
					obj.put("idContact", contacts.get(i).getIdContact());
				}
			}
			obj.put("status", "Se ha insertado correctamente el contacto.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente el contacto.");
			return obj;
		}
	}

	public static JSONObject updateContact(Contact contact) {
		JSONObject obj = new JSONObject();
		if (DAOContact.updateContact(contact)) {
			obj.put("validate", "true");
			obj.put("update", "true");
			obj.put("status", "Se ha actualizado el contacto correctamente.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "Error de actualizacion del contacto.");
			return obj;
		}
	}

	public static Object deleteContact(long contact) {
		JSONObject obj = new JSONObject();
		Contact contacto = DAOContact.getContactById(contact);
		List<Contact> contactos = DAOContact.getContact();
		if (contacto != null && contactos != null) {
			int cantidad = 0;
			for (int i = 0; i < contactos.size(); i++) {
				if (contactos.get(i).getIdProvider()==contacto.getIdProvider()) {
					cantidad++;
				}
			}
			if (cantidad<2) {
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "El proveedor debe tener minimo 1 Contacto. No se puede borrar.");
				return obj;
			}
			if (DAOContact.deleteContact(contact)) {
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Se ha borrado el contacto correctamente.");
				return obj;
			}
		}
		obj.put("validate", "true");
		obj.put("delete", "false");
		obj.put("status", "Error de conexion con la base de datos.");
		return obj;
	}



}
