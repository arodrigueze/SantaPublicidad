package logic;

import java.util.List;

import org.json.JSONObject;
import dao.DAOAddress;
import vo.Address;

public class LogicAddress {

	public static JSONObject getAddressesJSON() {
		JSONObject obj = new JSONObject();
		List<Address> addresses = DAOAddress.getAddress();
		if (addresses != null) {
			obj.putOnce("addresses", addresses);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar direcciones");
			return obj;
		}
	}

	public static JSONObject createAddress(Address address) {
		JSONObject obj = new JSONObject();
		List<Address> addresses;
		if (DAOAddress.insertAddress(address)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			addresses = DAOAddress.getAddress();
			if (addresses==null) {
				obj.put("status", "Error el obtener el id de la direccion.");
				return obj;
			}
			for(int i = 0; i < addresses.size(); i++) {
				if (addresses.get(i).getAddress().equals(address.getAddress())&&address.getIdCity()==addresses.get(i).getIdCity()) {
					obj.remove("idAddress");
					obj.put("idAddress", addresses.get(i).getIdAddress());
				}
			}
			obj.put("status", "Se ha insertado correctamente la direccion.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente la direccion.");
			return obj;
		}
	}

	public static JSONObject updateAddress(Address address) {
		JSONObject obj = new JSONObject();
		if (DAOAddress.updateAddress(address)) {
			obj.put("validate", "true");
			obj.put("update", "true");
			obj.put("status", "Se ha actualizado la dirección correctamente.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "Error en la actualización de la dirección");
			return obj;
		}
	}

	public static Object deleteAddress(long address) {
		JSONObject obj = new JSONObject();
		Address direccion = DAOAddress.getAddressById(address);
		if (direccion != null) {
			if (DAOAddress.deleteAddress(address)) {
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Se ha borrado la dirección correctamente.");
				return obj;
			}
		}
		obj.put("validate", "true");
		obj.put("delete", "false");
		obj.put("status", "Error de conexion con la base de datos.");
		return obj;
	}

}
