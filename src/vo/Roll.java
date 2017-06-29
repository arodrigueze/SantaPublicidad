package vo;

public class Roll {
	private long idRole;
	private String name;
	private String description;
	
	public Roll(long idRol, String name, String description) {
		this.idRole = idRol;
		this.name = name;
		this.description = description;
	}
	
	public long getIdRol() {
		return idRole;
	}
	
	public void setIdRol(long idRol) {
		this.idRole = idRol;
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
	
	@Override
	public String toString() {
		return "Rol [idRol=" + idRole + ", name=" + name + ", description=" + description + "]";
	}
}
