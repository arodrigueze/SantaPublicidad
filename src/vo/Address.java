package vo;

public class Address {

	private long idAddress;
	private String address;
	private long idProvider;
	private long idCity;
	private long idClient;
	
	public Address(long idAddress, String address, long idProvider, long idCity, long idClient) {
		this.idAddress = idAddress;
		this.address = address;
		this.idProvider = idProvider;
		this.idCity = idCity;
		this.idClient = idClient;
	}

	public long getIdAddress() {
		return idAddress;
	}

	public void setIdAddress(long idAddress) {
		this.idAddress = idAddress;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public long getIdProvider() {
		return idProvider;
	}

	public void setIdProvider(long idProvider) {
		this.idProvider = idProvider;
	}

	public long getIdCity() {
		return idCity;
	}

	public void setIdCity(long idCity) {
		this.idCity = idCity;
	}

	public long getIdClient() {
		return idClient;
	}

	public void setIdClient(long idClient) {
		this.idClient = idClient;
	}

	@Override
	public String toString() {
		return "Address [idAddress=" + idAddress + ", address=" + address + ", idProvider=" + idProvider + ", idCity="
				+ idCity + ", idClient=" + idClient + "]";
	}
		
}
