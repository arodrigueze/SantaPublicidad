package vo;

public class Country {

	private long idCountry;
	private String name;
	
	public Country(long idCountry, String name) {
		super();
		this.idCountry = idCountry;
		this.name = name;
	}

	public long getIdCountry() {
		return idCountry;
	}

	public void setIdCountry(long idCountry) {
		this.idCountry = idCountry;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Country [idCountry=" + idCountry + ", name=" + name + "]";
	}
		
}
