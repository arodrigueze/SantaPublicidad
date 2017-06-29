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

import dao.ConnectionData;
import logic.LogicLoginAuthent;
import logic.LogicExpenses;
import vo.Expenses;

@Path("/AppExpensesCRUD")

public class WebServiceExpenses {
		
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listExpenses(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.println("\tEn listar expenses\nEN LISTAR GASTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				account = LogicExpenses.getExpensesJSON();
				account.put("validate", "true");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("validate", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createExpenses(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("document") String document, 
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("description") String description,
			  @DefaultValue("null") @QueryParam("value") String value, 
	          @DefaultValue("null") @QueryParam("idBudgetPS") String idBudgetPS,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn INSERTAR GASTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				Expenses expenses = new Expenses(0,name, description, new BigDecimal(value), Long.parseLong(idBudgetPS));
				return Response.ok(LogicExpenses.insertExpenses(expenses).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteExpenses(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idExpenses") String idExpenses, 
			  @DefaultValue("null") @QueryParam("username") String username,
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tBORRAR GASTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				account = LogicExpenses.deleteExpenses(idExpenses);
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateExpenses(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idExpenses") String idExpenses,
			  @DefaultValue("null") @QueryParam("document") String document, 
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("description") String description,
			  @DefaultValue("null") @QueryParam("value") String value, 
	          @DefaultValue("null") @QueryParam("idBudgetPS") String idBudgetPS,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn EDITAR GASTOS");
		int verifyAccess = ConnectionData.verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				Expenses expenses = new Expenses(Long.parseLong(idExpenses),name, description, new BigDecimal(value), Long.parseLong(idBudgetPS));
				return Response.ok(LogicExpenses.updateExpenses(expenses).toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", ConnectionData.getUrlAccess()[0]).build();
		}
    }	
}
