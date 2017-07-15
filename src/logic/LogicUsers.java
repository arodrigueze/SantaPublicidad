package logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import dao.DAOArea;
import dao.DAOProject;
import dao.DAORoll;
import dao.DAOUser;
import dao.DAOUserRoll;
import vo.Project;
import vo.User;
import vo.UserRoll;
import vo.vista.UserListJSON;

public class LogicUsers {

	public static JSONObject getUsersJSON(String username) {
		List<User> usuarios = DAOUser.getUsers();
		JSONObject obj = new JSONObject();
		List<UserListJSON> listaUsuarios = new ArrayList<>();
		UserListJSON usuario = new UserListJSON();
		String rollUsername = DAOUser.getRollByUsername(username); 
		
		if (rollUsername!=null) {
			if (!rollUsername.equals("Gerencia")) {
				User usua = DAOUser.getUserByUsername(username);
				if (usua!=null) {
					obj.put("list", "true");
					obj.put("validate", "true");
					obj.putOnce("usuario", usua);
					return obj;
				}else{
					obj.put("list", "false");
					obj.put("validate", "true");
					obj.put("status", "Error al listar el usuario.");
					return obj;
				}
			}
		}else{
			obj.put("list", "false");
			obj.put("validate", "true");
			obj.put("status", "Error al validar el roll del usuario.");
			return obj;
		}
		
		if (usuarios == null) {
			obj.put("list", "false");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("list", "true");
			obj.put("validate", "true");
			for (int i = 0; i < usuarios.size(); i++) {
				usuario = new UserListJSON();
				usuario.setIduser(usuarios.get(i).getIdUser());
				usuario.setDocument(usuarios.get(i).getDocument());
				usuario.setName(usuarios.get(i).getName());
				usuario.setUsername(usuarios.get(i).getUserName());
				String roll1 = DAORoll.getRoleByIdUser(usuarios.get(i).getIdUser()).getName();
				usuario.setRoll(roll1);
				String area1 = DAOArea.getAreaByIdArea(usuarios.get(i).getIdArea()).getName();
				usuario.setArea(area1);
				usuario.setEmail(usuarios.get(i).getEmail());
				if (usuarios.get(i).isActive()) {
					listaUsuarios.add(usuario);
				}
			}
			obj.putOnce("users", listaUsuarios);
			return obj;
		}
	}

	public static JSONObject insertUser(User usuario, long rol, String username) {
		JSONObject obj = new JSONObject();
		List<User> usuarios = DAOUser.getUsers();
		String rollUsername = DAOUser.getRollByUsername(username); 
		obj.put("insert", "false");
		obj.put("validate", "true");
		if (rollUsername!=null) {
			if (!rollUsername.equals("Gerencia")) {
				obj.put("insert", "false");
				obj.put("validate", "true");
				obj.put("status", "roll del usuario invalido");
				return obj;
			}
		}else{
			obj.put("insert", "false");
			obj.put("validate", "true");
			obj.put("status", "Error al validar el roll del usuario.");
			return obj;
		}
		
		if (usuarios==null) {
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "Error conexion base de datos");
			return obj;
		}
		
		if (usuario.getPassword()==null || usuario.getPassword().equals("d41d8cd98f00b204e9800998ecf8427e")) {
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "Password Invalido");
			return obj;
		}
		
		for (int i = 0; i < usuarios.size(); i++) {
			if (usuario.getUserName().toLowerCase().equals(usuarios.get(i).getUserName().toLowerCase()) || usuario.getDocument().toLowerCase().equals(usuarios.get(i).getDocument().toLowerCase())) {
				obj.put("validate", "true");
				obj.put("insert", "false");
				obj.put("status", "Nombre de Usuario o documento Invalido");
				return obj;
			} 
		}
		if (DAOUser.insertUser(usuario)) {
			if (DAOUserRoll.insert(DAOUser.getUserByUsernameAndPassword(usuario.getUserName(), usuario.getPassword()).getIdUser(),rol)) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Usuario Insertado correctamente");
			}else{
				obj.put("validate", "true");
				obj.put("insert", "false");
				obj.put("status", "Error en insertar el user_rol del usuario");
			}
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "Error en insertar los datos del usuario");
		}
		return obj;
	}

	public static JSONObject deleteUser(String idUser, String username) {
		JSONObject obj = new JSONObject();
		List<Project> proyectos = DAOProject.getProjects();
		User usuario = DAOUser.getUserById(idUser);
		String rollUsername = DAOUser.getRollByUsername(username); 
		if (rollUsername!=null) {
			if (!rollUsername.equals("Gerencia")) {
				obj.put("delete", "false");
				obj.put("validate", "true");
				obj.put("status", "roll del usuario invalido");
				return obj;
			}
		}else{
			obj.put("delete", "false");
			obj.put("validate", "true");
			obj.put("status", "Error al validar el roll del usuario.");
			return obj;
		}
				
		obj.put("validate", "true");
		obj.put("delete", "false");
		obj.put("status", "Error en conexión a base de datos.");
		if (proyectos!=null && usuario != null) {
			if (username.toLowerCase().equals(usuario.getUserName().toLowerCase())) {
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "No se puede eliminar a si mismo.");
				return obj;
			}
			for (int i = 0; i < proyectos.size(); i++) {
				if (proyectos.get(i).getUser_idUser()==Long.parseLong(idUser)) {					
					if (DAOUser.updateUserActive(idUser)) {
						obj.put("validate", "true");
						obj.put("delete", "true");
						obj.put("usernameDeleted", usuario.getUserName());
						obj.put("status", "El usuario tiene asociado proyectos. No se puede borrar. Active = 0");
						return obj;
					}else{
						obj.put("validate", "true");
						obj.put("delete", "false");
						obj.put("status", "Error de conexion");
						return obj;
					}
				}
			}
			if (DAOUserRoll.deleteUserRoll(Long.parseLong(idUser))&&usuario!=null) {
				if (DAOUser.deleteUser(Long.parseLong(idUser))) {
					obj.put("validate", "true");
					obj.put("delete", "true");
					obj.put("usernameDeleted", usuario.getUserName());
					obj.put("status", "Usuario Borrado correctamente");
				}else{
					obj.put("validate", "true");
					obj.put("delete", "false");
					obj.put("status", "Error en el borrado del roll del usuario");
				}
			}else{
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "Error en el borrado del usuario");
			}
		}else{
			if (DAOUserRoll.deleteUserRoll(Long.parseLong(idUser))&&usuario!=null) {
				if (DAOUser.deleteUser(Long.parseLong(idUser))) {
					obj.put("validate", "true");
					obj.put("delete", "true");
					obj.put("usernameDeleted", usuario.getUserName());
					obj.put("status", "Usuario Borrado correctamente");
				}else{
					obj.put("validate", "true");
					obj.put("delete", "false");
					obj.put("status", "Error en el borrado del roll del usuario");
				}
			}else{
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "Error en el borrado del usuario");
			}
		}
		return obj;
	}

	public static Object updateUser(User usuario, long roll, String username) {
		JSONObject obj = new JSONObject();
		List<User> usuarios = DAOUser.getUsers();
				
		String rollUsername = DAOUser.getRollByUsername(username); 
		if (rollUsername!=null) {
			if (!rollUsername.equals("Gerencia")) {
				if (DAOUser.updateUserNoGerencia(usuario)) {
					obj.put("update", "true");
					obj.put("validate", "true");
					obj.put("status", "Usuario actualizado a campos limitados por rol");
					return obj;
				}else{
					obj.put("update", "false");
					obj.put("validate", "true");
					obj.put("status", "Error al actualizar el usuario");
					return obj;
				}
			}
		}else{
			obj.put("update", "false");
			obj.put("validate", "true");
			obj.put("status", "Error al validar el roll del usuario.");
			return obj;
		}
		
		for (int i = 0; i < usuarios.size(); i++) {
			if (usuarios.get(i).getIdUser()!=usuario.getIdUser()) {
				if (usuario.getUserName().toLowerCase().equals(usuarios.get(i).getUserName().toLowerCase()) || usuario.getDocument().toLowerCase().equals(usuarios.get(i).getDocument())) {
					obj.put("validate", "true");
					obj.put("update", "false");
					obj.put("status", "Nombre de Usuario o documento Invalido");
					return obj;
				}
			}
		}
		
		if (usuario.getPassword()==null || usuario.getPassword().equals("d41d8cd98f00b204e9800998ecf8427e")) {
			for (int i = 0; i < usuarios.size(); i++) {
				if (usuarios.get(i).getIdUser()==usuario.getIdUser()) {
					usuario.setPassword(usuarios.get(i).getPassword());
				}
			}
		}
		
		if (DAOUserRoll.updateUserRoll(new UserRoll(0, usuario.getIdUser(), roll))) {
			if (DAOUser.updateUser(usuario)) {
				obj.put("validate", "true");
				obj.put("update", "true");
				obj.put("status", "Usuario Actualizado correctamente");
			}else{
				obj.put("validate", "true");
				obj.put("update", "false");
				obj.put("status", "Error en la actualizacion del roll del usuario");
			}
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "Error en la actualizacion del usuario");
		}
		return obj;
		
	}
}
