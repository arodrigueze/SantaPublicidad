package vo.vista;

import java.util.ArrayList;
import java.util.List;
import vo.Contact;
import vo.Project;

public class ClientListJSON {
	
	private List<Contact> contactos;
	private List<AddressListJSON> direcciones;
	private List<Project> proyectos;
	private long idClient;
	private String NIT;
	private String name;
	private String description;
	private int DV;
	private boolean active;
	
	public ClientListJSON(long idClient, String nIT, String name, String description, int dV, boolean active) {
		this.idClient = idClient;
		NIT = nIT;
		this.name = name;
		this.description = description;
		DV = dV;
		this.active  = active;
		contactos    = new ArrayList<>();
		direcciones  = new ArrayList<>();
		proyectos    = new ArrayList<>();
	}

	public List<Contact> getContactos() {
		return contactos;
	}

	public void addContactos(Contact contacto) {
		this.contactos.add(contacto);
	}

	public List<AddressListJSON> getDirecciones() {
		return direcciones;
	}

	public void addDirecciones(AddressListJSON direccion) {
		this.direcciones.add(direccion);
	}

	public List<Project> getProyectos() {
		return proyectos;
	}

	public void addProyectos(Project proyecto) {
		this.proyectos.add(proyecto);
	}

	public long getIdClient() {
		return idClient;
	}

	public void setIdClient(long idClient) {
		this.idClient = idClient;
	}

	public String getNIT() {
		return NIT;
	}

	public void setNIT(String nIT) {
		NIT = nIT;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getDV() {
		return DV;
	}

	public void setDV(int dV) {
		DV = dV;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "ClientListJSON [contactos=" + contactos + ", direcciones=" + direcciones + ", proyectos=" + proyectos
				+ ", idClient=" + idClient + ", NIT=" + NIT + ", name=" + name + ", description=" + description
				+ ", DV=" + DV + ", active=" + active + "]";
	}
}
