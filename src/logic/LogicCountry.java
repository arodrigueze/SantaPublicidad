package logic;

import java.util.List;

import org.json.JSONObject;

import dao.DAOAddress;
import dao.DAOCity;
import dao.DAOCountry;
import vo.Address;
import vo.City;
import vo.Country;


public class LogicCountry {
	
	private static List<Country> countries = DAOCountry.getCountry();
	private static List<Address> direcciones = DAOAddress.getAddress();
	private static List<City>    ciudades    = DAOCity.getCities();
	
	public static JSONObject getCountriesJSON() {
		if(countries == null){
			countries = DAOCountry.getCountry();
		}	
		JSONObject obj = new JSONObject();
		if (countries != null) {
			obj.putOnce("countries", countries);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar paises");
			return obj;
		}
	}
	
	public static JSONObject createCountry(Country country) {
		JSONObject obj = new JSONObject();
		if(countries == null){
			countries = DAOCountry.getCountry();
		}
		String a,b;
		for (int i = 0; i < countries.size(); i++) {
			a = TextValidation.convertirParaPruebas(countries.get(i).getName());
			b = TextValidation.convertirParaPruebas(country.getName());
			if(a.equals(b)){
				obj.put("validate", "true");
				obj.put("insert", "false");
				obj.put("status", "El pais se encontraba previamente en la base de datos.");
				obj.put("idCountry", countries.get(i).getIdCountry());
				obj.put("Nombre", countries.get(i).getName());
				return obj;
			}
		}
		if (DAOCountry.insertCountry(country)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			countries.clear();
			countries = DAOCountry.getCountry();
			for(int i = 0; i < countries.size(); i++) {
				if (countries.get(i).getName().equals(country.getName())) {
					obj.put("status", "Se ha insertado correctamente el pais.");
					obj.put("idCountry", countries.get(i).getIdCountry());
					obj.put("name", countries.get(i).getName());
					break;
				}
			}
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente el pais.");
			return obj;
		}
	}

	public static JSONObject deleteCountry(String idCountry) {
		JSONObject obj = new JSONObject();

		if(direcciones == null){
			direcciones = DAOAddress.getAddress();
		}
		if(ciudades == null){
			ciudades = DAOCity.getCities();
		}
		if(countries == null){
			countries = DAOCountry.getCountry();
		}
		
		if (direcciones!=null && ciudades != null && countries != null) {
			for (int i = 0; i < ciudades.size(); i++) {
				if (ciudades.get(i).getIdCountry()==Long.parseLong(idCountry)) {
					for (int j = 0; j < direcciones.size(); j++) {
						if (direcciones.get(j).getIdCity()==ciudades.get(i).getIdCity()) {
							obj.put("validate", "true");
							obj.put("delete", "false");
							obj.put("status", "No se puede borrar el pais. Hay direcciones asociadas.");
							return obj;
						}
					}
					obj.put("validate", "true");
					obj.put("delete", "false");
					obj.put("status", "No se puede borrar el pais. Hay ciudades asociadas.");
					return obj;
			
				}
			}
			if (DAOCountry.deleteCountry(Long.parseLong(idCountry))) {
				countries.clear();
				countries = DAOCountry.getCountry();
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Borrado de pais correcto");
				return obj;
			}else{
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "Error al borrar el pais.");
				return obj;
			}
		}else{
			obj.put("validate", "true");
			obj.put("delete", "false");
			obj.put("status", "Error al borrar pais.");
			return obj;
		}
	}

	public static JSONObject updateCountry(Country country) {
		JSONObject obj = new JSONObject();
		String a,b;
		for (int i = 0; i < countries.size(); i++) {
			a = TextValidation.convertirParaPruebas(countries.get(i).getName());
			b = TextValidation.convertirParaPruebas(country.getName());
			if(a.equals(b)&&country.getIdCountry()!=countries.get(i).getIdCountry()){
				obj.put("validate", "true");
				obj.put("insert", "false");
				obj.put("status", "El pais se encontraba previamente en la base de datos.");
				obj.put("idCountry", countries.get(i).getIdCountry());
				obj.put("Nombre", countries.get(i).getName());
				return obj;
			}
		}
		if (DAOCountry.updateCountry(country)) {
			obj.put("validate", "true");
			obj.put("update", "true");
			obj.put("status", "Pais actualizado correctamente");
			countries.clear();
			countries = DAOCountry.getCountry();
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "Error al actualizar pais.");
			return obj;
		}
	}
}
