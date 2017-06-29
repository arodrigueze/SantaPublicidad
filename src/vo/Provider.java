package vo;

public class Provider {
	
	private long idProvider;
	private String NIT;
	private String name;
	private String description;
	private int DV;
	private boolean active;
		
	public Provider(long idProvider, String nIT, String name, String description, int dV, boolean active) {
		super();
		this.idProvider = idProvider;
		NIT = nIT;
		this.name = name;
		this.description = description;
		DV = dV;
		this.active = active;
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

	public long getIdProvider() {
		return idProvider;
	}

	public void setIdProvider(long idProvider) {
		this.idProvider = idProvider;
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

	@Override
	public String toString() {
		return "Provider [idProvider=" + idProvider + ", NIT=" + NIT + ", name=" + name + ", description=" + description
				+ ", DV=" + DV + ", active=" + active + "]";
	}

	
}
