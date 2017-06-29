package logic;

import java.util.List;
import org.json.JSONObject;

import dao.DAOBudgetPS;
import dao.DAOProductService;
import vo.BudgetPS;
import vo.ProductService;

public class LogicProductService {

	public static JSONObject getProductServicesJSON() {
		JSONObject obj = new JSONObject();
		List<ProductService> productservices = DAOProductService.getProductService();
		if (productservices != null) {
			obj.putOnce("productservices", productservices);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar Productos y Servicios");
			return obj;
		}
	}

	public static JSONObject createProductService(ProductService productservice) {
		JSONObject obj = new JSONObject();
		List<ProductService> productservices = DAOProductService.getProductService();
				
		if (DAOProductService.insertProductService(productservice)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			productservices = DAOProductService.getProductService();
			if (productservices==null) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Error el obtener el id del Producto o servicio.");
				return obj;
			}
			for(int i = 0; i < productservices.size(); i++) {
				if (productservices.get(i).getName().toLowerCase().equals(productservice.getName().toLowerCase())) {
					obj.remove("idProductService");
					obj.put("idProductService", productservices.get(i).getIdProductService());
				}
			}
			obj.put("status", "Se ha insertado correctamente el producto o servicio.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente el producto o servicio.");
			return obj;
		}
	}

	public static Object updateProductService(ProductService productservice) {
		JSONObject obj = new JSONObject();
		if (DAOProductService.updateProductService(productservice)) {
			obj.put("validate", "true");
			obj.put("update", "true");
			obj.put("status", "Actualización del producto o servicio correctamente.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "No se ha actualizado el producto o servicio.");
			return obj;
		}
	}

	public static JSONObject deleteProductService(long idPS) {
		JSONObject obj = new JSONObject();
		List<BudgetPS> presupuestoPS = DAOBudgetPS.getBudgetPS();
		List<ProductService> productService = DAOProductService.getProductService();
		ProductService ps = DAOProductService.getProductServiceById(idPS);
		obj.put("validate", "true");
		obj.put("delete", "false");
		obj.put("status", "Error de conexion con la base de datos.");
		if (presupuestoPS != null && productService!=null) {
			for (int i = 0; i < presupuestoPS.size(); i++) {
				if (presupuestoPS.get(i).getIdProductService()==idPS) {
					obj.put("validate", "true");
					obj.put("delete", "false");
					obj.put("status", "El producto/servicio esta en un presupuesto. No se puede borrar.");
					return obj;
				}
			}
			int cantidad=0;
			for (int i = 0; i < productService.size(); i++) {
				if (productService.get(i).getIdProvider()==ps.getIdProvider()) {
					cantidad++;
				}
			}
			if (cantidad<2) {
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "El proveedor debe tener minimo 1 Producto o servicio. No se puede borrar.");
				return obj;
			}
			if (DAOProductService.deleteProductService(idPS)) {
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Se ha borrado correctamente el Producto o servicio.");
				return obj;
			}
		}
		return obj;
	}
}
