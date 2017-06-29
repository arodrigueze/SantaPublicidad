package logic;

import java.util.List;
import org.json.JSONObject;

import dao.DAOAddress;
import dao.DAOCity;
import vo.Address;
import vo.City;


public class LogicCity {

	public static JSONObject getCitiesJSON() {
			List<City> cities = DAOCity.getCities();
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
		List<City> cities = DAOCity.getCities();
		if (cities==null) {
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "error en base de datos.");
			return obj;
		}
		for (int i = 0; i < cities.size(); i++) {
			if(TextValidation.cambiarTildes(cities.get(i).getName()).equals(TextValidation.cambiarTildes(city.getName()))&&cities.get(i).getIdCountry()==city.getIdCountry()){
				obj.put("validate", "true");
				obj.put("insert", "false");
				obj.put("status", "La ciudad se encontraba previamente en la base de datos.");
				obj.put("idCity", cities.get(i).getIdCity());
				obj.put("Nombre", cities.get(i).getName());
				return obj;
			}
		}
		if (DAOCity.insertCity(city)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			cities = DAOCity.getCities();
			if (cities==null) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Error el obtener el id de ciudad.");
				return obj;
			}
			if (TextValidation.cambiarTildes(cities.get(cities.size()-1).getName()).equals(TextValidation.cambiarTildes(city.getName()))) {
				obj.put("status", "Se ha insertado correctamente la ciudad.");
				obj.put("idCity", cities.get(cities.size()-1).getIdCity());
				obj.put("name", cities.get(cities.size()-1).getName());
				obj.put("idPais", cities.get(cities.size()-1).getIdCountry());
			}
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
		List<Address> direcciones = DAOAddress.getAddress();
		List<City>    ciudades    = DAOCity.getCities();
		if (direcciones!=null && ciudades != null) {
			for (int i = 0; i < direcciones.size(); i++) {
				if (direcciones.get(i).getIdCity()==idcity) {
					obj.put("validate", "true");
					obj.put("delete", "false");
					obj.put("status", "Error al borrar la ciudad. Hay direcciones asociadas.");
					return obj;
				}
			}
			if (DAOCity.deleteCity(idcity)) {
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
