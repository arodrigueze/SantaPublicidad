package logic;

import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;
import dao.DAOAddress;
import dao.DAOBudgetPS;
import dao.DAOCity;
import dao.DAOContact;
import dao.DAOCountry;
import dao.DAOProductService;
import dao.DAOProvider;
import vo.Address;
import vo.BudgetPS;
import vo.City;
import vo.Contact;
import vo.Country;
import vo.ProductService;
import vo.Provider;
import vo.vista.AddressListJSON;
import vo.vista.ProviderListJSON;

public class LogicProvider {

	public static JSONObject getProvidersJSON() {
		JSONObject obj = new JSONObject();
		List<ProviderListJSON> listaJson          = new ArrayList<>();
		List<Provider>         proveedores        = DAOProvider.getProvider();
		List<ProductService>   productosServicios = DAOProductService.getProductService();
		List<Contact>          contactos          = DAOContact.getContact();
		List<Address>          direcciones        = DAOAddress.getAddress();
		List<City>             ciudades           = DAOCity.getCities();
		List<Country>          paises             = DAOCountry.getCountry();
		
		if (proveedores == null || contactos == null || direcciones==null || ciudades==null || paises==null || productosServicios==null) {
			obj.put("list", "false");
			obj.put("validate", "true");
			obj.put("status", "error al listar los proveedores. Error en base de datos");
			return obj;
		}else{
			obj.put("list", "true");
			obj.put("validate", "true");
			obj.put("status", "listado de proveedores correcto");
			for (int i = 0; i < proveedores.size(); i++) {
				ProviderListJSON providerJson = new ProviderListJSON(proveedores.get(i).getIdProvider(),proveedores.get(i).getNIT() , proveedores.get(i).getName(), proveedores.get(i).getDescription(), proveedores.get(i).getDV());
				listaJson.add(providerJson);
			}
			for (int i = 0; i < listaJson.size(); i++) {
				for (int j = 0; j < productosServicios.size(); j++) {
					if (productosServicios.get(j).getIdProvider()==listaJson.get(i).getIdProvider()) {
						listaJson.get(i).addProductService(productosServicios.get(j));
					}
				}
				for (int j = 0; j < contactos.size(); j++) {
					if (contactos.get(j).getIdProvider()==listaJson.get(i).getIdProvider()) {
						listaJson.get(i).addContact(contactos.get(j));;
					}
				}
				for (int j = 0; j < direcciones.size(); j++) {
					if (direcciones.get(j).getIdProvider()==listaJson.get(i).getIdProvider()) {
						for (int j2 = 0;j2< ciudades.size(); j2++) {
							if (direcciones.get(j).getIdCity()==ciudades.get(j2).getIdCity()) {
								for (int k = 0; k < paises.size(); k++) {
									if (ciudades.get(j2).getIdCountry()==paises.get(k).getIdCountry()) {
										listaJson.get(i).addAddress(new AddressListJSON(direcciones.get(j).getIdAddress()
																					, direcciones.get(j).getIdClient()
																					, direcciones.get(j).getAddress()
																					, ciudades.get(j2).getName()
																					, paises.get(k).getName()));
									}
								}
							}
						}						
					}
				}
			}
			obj.putOnce("providers", listaJson);
			return obj;
		}
	}

	public static JSONObject insertProvider(Provider provider) {
		JSONObject obj = new JSONObject();
		List<Provider> proveedores = DAOProvider.getProvider();
		if (proveedores==null) {
			obj.put("insert", "false");
			obj.put("validate", "true");
			obj.put("status", "Error en base de datos");
			return obj;
		}
		if (!proveedores.isEmpty()) {
			for (int i = 0; i < proveedores.size(); i++) {
				if(proveedores.get(i).getNIT().toLowerCase().equals(provider.getNIT().toLowerCase())){
					obj.put("insert", "false");
					obj.put("validate", "true");
					obj.put("status", "Ya existe un proveedor con el nit");
					return obj;
				}
			}	
		}
		if (DAOProvider.insertProvider(provider)) {
			proveedores = DAOProvider.getProvider();
			if (proveedores==null) {
				obj.put("insert", "false");
				obj.put("validate", "true");
				obj.put("status", "Error en base de datos");
				return obj;
			}
			for (int i = 0; i < proveedores.size(); i++) {
				if (proveedores.get(i).getNIT().toLowerCase().equals(provider.getNIT())) {
					obj.put("insert", "true");
					obj.put("validate", "true");
					obj.put("idProvider", proveedores.get(i).getIdProvider());
					obj.put("status", "proveedor insertado correctamente.");
					return obj;
				}
			}
			obj.put("insert", "true");
			obj.put("validate", "true");
			obj.put("status", "error al obtener el id del proveedor.");
			return obj;
		}
		else{
			obj.put("insert", "false");
			obj.put("validate", "true");
			obj.put("status", "Error al insertar proveedor en la base de datos");
			return obj;
		}
	}

	public static JSONObject updateProvider(Provider provider) {
		JSONObject obj = new JSONObject();
		List<Provider> proveedores = DAOProvider.getProvider();
		if (proveedores!=null) {
			for (int i = 0; i < proveedores.size(); i++) {
				if (provider.getIdProvider()!=proveedores.get(i).getIdProvider()) {
					if (proveedores.get(i).getNIT().toLowerCase().equals(provider.getNIT().toLowerCase()) ) {
						obj.put("validate", "true");
						obj.put("update", "false");
						obj.put("status", "NIT invalido");
						return obj;
					}
				}
			}
			if (DAOProvider.updateProvider(provider)) {
				obj.put("validate", "true");
				obj.put("update", "true");
				obj.put("status", "Proveedor actualizado correctamente");
				return obj;
			}else{
				obj.put("validate", "true");
				obj.put("update", "false");
				obj.put("status", "Error al acceder a la base de datos.");
				return obj;
			}
			
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "error al acceder a la base de datos.");
			return obj;
		}
	}

	public static JSONObject deleteProvider(String idProvider) {
		JSONObject obj = new JSONObject();
		Provider proveedor = DAOProvider.getProviderById(Long.parseLong(idProvider));
		List<BudgetPS> presupuestosPS = DAOBudgetPS.getBudgetPS();
		List<ProductService> productServices = DAOProductService.getProductService();
		List<Contact> contactos = DAOContact.getContact();
		List<Address> direcciones = DAOAddress.getAddress();
		
		if (presupuestosPS!=null && contactos!=null && direcciones!=null && productServices!=null && proveedor!=null) {
			for (int i = 0; i < presupuestosPS.size(); i++) {
				for (int j = 0; j < productServices.size(); j++) {
					if (Long.parseLong(idProvider)==productServices.get(i).getIdProvider()&&productServices.get(i).getIdProductService()==presupuestosPS.get(j).getIdProductService()) {
						proveedor.setActive(false);
						if (DAOProvider.updateProvider(proveedor)) {
							obj.put("validate", "true");
							obj.put("delete", "false");
							obj.put("status", "El proveedor tiene productos en Presupuestos existentes. Cambio a no activo.");
							return obj;
						}else{
							obj.put("validate", "true");
							obj.put("delete", "false");
							obj.put("status", "Error al acceder en la base de datos.");
							return obj;
						}
					}
				}
			}
			for (int i = 0; i < direcciones.size(); i++) {
				if (direcciones.get(i).getIdProvider()==proveedor.getIdProvider()) {
					if (!DAOAddress.deleteAddress(direcciones.get(i).getIdAddress())) {
						obj.put("validate", "true");
						obj.put("delete", "false");
						obj.put("status", "Error al acceder en la base de datos.");
						return obj;
					}
				}
			}
			for (int i = 0; i < contactos.size(); i++) {
				if (contactos.get(i).getIdProvider()==proveedor.getIdProvider()) {
					if (!DAOContact.deleteContact(contactos.get(i).getIdContact())) {
						obj.put("validate", "true");
						obj.put("delete", "false");
						obj.put("status", "Error al acceder en la base de datos.");
						return obj;
					}
				}			
			}
			for (int i = 0; i < productServices.size(); i++) {
				if (productServices.get(i).getIdProvider()==proveedor.getIdProvider()) {
					if (!DAOProductService.deleteProductService(productServices.get(i).getIdProductService())) {
						obj.put("validate", "true");
						obj.put("delete", "false");
						obj.put("status", "Error al acceder en la base de datos.");
						return obj;
					}
				}
			}
			if (DAOProvider.deleteProvider(proveedor.getIdProvider())) {
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Provedor borrado correctamente.");
				return obj;
			}
		}
		obj.put("validate", "true");
		obj.put("delete", "false");
		obj.put("status", "Error al acceder a la base de datos.");
		return obj;
	}

}
