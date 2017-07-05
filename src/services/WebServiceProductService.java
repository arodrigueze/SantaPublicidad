package services;

import java.math.BigDecimal;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

import conexion.ConnectionData;
import logic.LogicProductService;
import logic.LogicLoginAuthent;
import vo.ProductService;

@Path("/AppProductServiceCRUD")

public class WebServiceProductService {
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listProductService(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR PRODUCTSERVICE");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject productservices = new JSONObject();
			productservices.put("username", username);
			productservices.put("logincode", logincode);	
			productservices = LogicLoginAuthent.valLogin(request.getRemoteAddr(), productservices);
			if (productservices.getString("validate").equals("true")) {
				productservices = LogicProductService.getProductServicesJSON();
				return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando productservices\n");
				return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject productservices = new JSONObject();
			productservices.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createProductService(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("name") String name,
	          @DefaultValue("null") @QueryParam("description") String description,
	          @DefaultValue("null") @QueryParam("price") String price,
	          @DefaultValue("null") @QueryParam("idProvider") String idProvider
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nCREAR PRODUCTOSERVICIO");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject productservices = new JSONObject();
			productservices.put("username", username);
			productservices.put("logincode", logincode);	
			productservices = LogicLoginAuthent.valLogin(request.getRemoteAddr(), productservices);
			if (productservices.getString("validate").equals("true")) {			
				ProductService productservice = new ProductService(0, name, description, new BigDecimal(price), Long.parseLong(idProvider));
				return Response.ok(LogicProductService.createProductService(productservice).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando productservices\n");
				return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject productservices = new JSONObject();
			productservices.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateProductService(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("idProductService") String idProductService,
	          @DefaultValue("null") @QueryParam("name") String name,
	          @DefaultValue("null") @QueryParam("description") String description,
	          @DefaultValue("null") @QueryParam("price") String price,
	          @DefaultValue("null") @QueryParam("idProvider") String idProvider
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nACTUALIZAR PRODUCTOSERVICIO");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject productservices = new JSONObject();
			productservices.put("username", username);
			productservices.put("logincode", logincode);	
			productservices = LogicLoginAuthent.valLogin(request.getRemoteAddr(), productservices);
			if (productservices.getString("validate").equals("true")) {			
				ProductService productservice = new ProductService(Long.parseLong(idProductService), name, description, new BigDecimal(price), Long.parseLong(idProvider));
				return Response.ok(LogicProductService.updateProductService(productservice).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando productservices\n");
				return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject productservices = new JSONObject();
			productservices.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteProductService(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("idProductService") String idProductService
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.print("\nBORRAR PRODUCTOSERVICIO");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject productservices = new JSONObject();
			productservices.put("username", username);
			productservices.put("logincode", logincode);	
			productservices = LogicLoginAuthent.valLogin(request.getRemoteAddr(), productservices);
			if (productservices.getString("validate").equals("true")) {			
				return Response.ok(LogicProductService.deleteProductService(Long.parseLong(idProductService)).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando productservices\n");
				return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject productservices = new JSONObject();
			productservices.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(productservices.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
}
