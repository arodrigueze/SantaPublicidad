package vo;

import java.math.BigDecimal;

public class ProductService {

	private long idProductService;
	private String name;
	private String description;
	private BigDecimal price;
	private long idProvider;
	
	public ProductService(long idProductService, String name, String description, BigDecimal price, long idProvider) {
		this.idProductService = idProductService;
		this.name = name;
		this.description = description;
		this.price = price;
		this.idProvider = idProvider;
	}

	public long getIdProductService() {
		return idProductService;
	}

	public void setIdProductService(long idProductService) {
		this.idProductService = idProductService;
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public long getIdProvider() {
		return idProvider;
	}

	public void setIdProvider(long idProvider) {
		this.idProvider = idProvider;
	}

	@Override
	public String toString() {
		return "ProductService [idProductService=" + idProductService + ", name=" + name + ", description="
				+ description + ", price=" + price + ", idProvider=" + idProvider + "]";
	}
	
}
