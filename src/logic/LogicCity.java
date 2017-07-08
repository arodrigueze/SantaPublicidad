package logic;

import java.util.List;
import org.json.JSONObject;
import dao.DAOAddress;
import dao.DAOCity;
import vo.Address;
import vo.City;


public class LogicCity {

	private static List<City> cities = DAOCity.getCities();
	private static List<Address> direcciones = DAOAddress.getAddress();
	
	public static JSONObject getCitiesJSON() {
			if(cities == null){
				cities = DAOCity.getCities();
			}	
			JSONObject obj = new JSONObject();
			if (cities != null) {
				obj.putOnce("cities", cities);
				obj.put("list", "true");
				obj.put("validate", "true");
				return obj;
			}else{
				obj.put("validate", "true");
				obj.put("list", "false");
				obj.put("status", "Error en listar ciudades");
				return obj;
			}
	}

	public static JSONObject createCity(City city) {
		JSONObject obj = new JSONObject();
		if(cities == null){
			cities = DAOCity.getCities();
		}
		if (cities==null) {
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "error en base de datos.");
			return obj;
		}
		String a,b;
		for (int i = 0; i < cities.size(); i++) {
			a = TextValidation.convertirParaPruebas(cities.get(i).getName());
			b = TextValidation.convertirParaPruebas(city.getName());
			if(a.equals(b)&&cities.get(i).getIdCountry()==city.getIdCountry()){
				obj.put("validate", "true");
				obj.put("insert", "false");
				obj.put("status", "La ciudad se encontraba previamente en la base de datos.");
				obj.put("idCity", cities.get(i).getIdCity());
				obj.put("Nombre", cities.get(i).getName());
				return obj;
			}
		}
		if (DAOCity.insertCity(city)) {
			cities.clear();
			cities = DAOCity.getCities();
			obj.put("validate", "true");
			obj.put("insert", "true");
			if (cities==null) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Error el obtener el id de ciudad.");
				return obj;
			}
			for (int i = 0; i < cities.size(); i++) {
				a = TextValidation.convertirParaPruebas(cities.get(i).getName());
				b = TextValidation.convertirParaPruebas(city.getName());
				if(a.equals(b)&&cities.get(i).getIdCountry()==city.getIdCountry()){
					obj.put("status", "Se ha insertado correctamente la ciudad.");
					obj.put("idCity", cities.get(i).getIdCity());
					obj.put("name", cities.get(i).getName());
					obj.put("idPais", cities.get(i).getIdCountry());
					return obj;
				}
			}
			obj.put("validate", "true");
			obj.put("insert", "true");
			obj.put("status", "Error el obtener el id de ciudad.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente la ciudad.");
			return obj;
		}
	}

	public static JSONObject deleteCity(String idCity) {
		Long idcity = Long.parseLong(idCity);
		JSONObject obj = new JSONObject();
		if(cities == null){
			cities = DAOCity.getCities();
		}
		if(direcciones == null){
			direcciones = DAOAddress.getAddress();
		}
		
		if (direcciones!=null && cities != null) {
			for (int i = 0; i < direcciones.size(); i++) {
				if (direcciones.get(i).getIdCity()==idcity) {
					obj.put("validate", "true");
					obj.put("delete", "false");
					obj.put("status", "Error al borrar la ciudad. Hay direcciones asociadas.");
					return obj;
				}
			}
			if (DAOCity.deleteCity(idcity)) {
				cities.clear();
				cities = DAOCity.getCities();
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Borrado de ciudad correcto.");
				return obj;
			}else{
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "Error al borrar la ciudad.");
				return obj;
			}
		}else{
			obj.put("validate", "true");
			obj.put("delete", "false");
			obj.put("status", "Error al borrar la ciudad.");
			return obj;

		}
	}

	public static JSONObject updateCity(City city) {
		JSONObject obj = new JSONObject();
		if (DAOCity.updateCity(city)) {
			cities.clear();
			cities = DAOCity.getCities();
			obj.put("validate", "true");
			obj.put("update", "true");
			obj.put("status", "Actualización de la ciudad correcta.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "Error en la actualización de la ciudad.");
			return obj;
		}
	}

}
