package logic;

import org.json.JSONObject;
import vo.Project;

public class LogicProject {

	public static JSONObject getProjectJSON() {
		
		/*
		 JSONObject			 obj	      = new JSONObject();
		//cargar los proyectos en los proyectosvista
		for (int i = 0; i < proyectos.size(); i++) {
			ProjectListJSON pro = new ProjectListJSON(proyectos.get(i).getIdProject(),proyectos.get(i).getName() , proyectos.get(i).getIdClient(), proyectos.get(i).getUser_idUser());
			proyectVista.add(pro);
		}
		//Cargar los proyectos con sus respectivos presupuestos
		for (int i = 0; i < proyectVista.size(); i++) {
			for (int j = 0; j < presupuestos.size(); j++) {
				if (proyectVista.get(i).getIdProject()==presupuestos.get(j).getIdProject()) {
					proyectVista.get(i).addPresupuestos(presupuestos.get(j));
					break;
				}
			}
		}
		
		
		//Cargar los proyectosvista a los clientesvista
			for (int i = 0; i < clienteVista.size(); i++) {
				for (int j = 0; j < proyectos.size(); j++) {
					if (clienteVista.get(i).getIdClient()==proyectos.get(j).getIdClient()) {
						clienteVista.get(i).addProyectos(proyectos.get(j));
						break;
					}
				}
			}
		
		
		*/
		return null;
	}

	public static Object insertProject(Project project) {
		// TODO Auto-generated method stub
		return null;
	}

	public static JSONObject deleteProject(String idProject) {
		// TODO Auto-generated method stub
		return null;
	}

	public static Object updateProject(Project project) {
		// TODO Auto-generated method stub
		return null;
	}

}
