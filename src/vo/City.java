package vo;

public class City {
	
	private long idCity;
	private String name;
	private long idCountry;
	
	public City(long idCity, String name, long idCountry) {
		this.idCity = idCity;
		this.name = name;
		this.idCountry = idCountry;
	}

	public long getIdCity() {
		return idCity;
	}

	public void setIdCity(long idCity) {
		this.idCity = idCity;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getIdCountry() {
		return idCountry;
	}

	public void setIdCountry(long idCountry) {
		this.idCountry = idCountry;
	}

	@Override
	public String toString() {
		return "City [idCity=" + idCity + ", name=" + name + ", idCountry=" + idCountry + "]";
	}	
}
