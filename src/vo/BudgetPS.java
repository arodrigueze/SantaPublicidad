package vo;

import java.math.BigDecimal;

public class BudgetPS {
	
	private long idBudgetPS;
	private BigDecimal margin;
	private long amount;
	private int days;
	private BigDecimal unitValue;
	private long idProductService;
	private long idBudget;
	
	public BudgetPS(long idBudgetPS, BigDecimal margin, long amount, int days, BigDecimal unitValue,
			long idProductService, long idBudget) {
		this.idBudgetPS = idBudgetPS;
		this.margin = margin;
		this.amount = amount;
		this.days = days;
		this.unitValue = unitValue;
		this.idProductService = idProductService;
		this.idBudget = idBudget;
	}

	public long getIdBudgetPS() {
		return idBudgetPS;
	}

	public void setIdBudgetPS(long idBudgetPS) {
		this.idBudgetPS = idBudgetPS;
	}

	public BigDecimal getMargin() {
		return margin;
	}

	public void setMargin(BigDecimal margin) {
		this.margin = margin;
	}

	public long getAmount() {
		return amount;
	}

	public void setAmount(long amount) {
		this.amount = amount;
	}

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}

	public BigDecimal getUnitValue() {
		return unitValue;
	}

	public void setUnitValue(BigDecimal unitValue) {
		this.unitValue = unitValue;
	}

	public long getIdProductService() {
		return idProductService;
	}

	public void setIdProductService(long idProductService) {
		this.idProductService = idProductService;
	}

	public long getIdBudget() {
		return idBudget;
	}

	public void setIdBudget(long idBudget) {
		this.idBudget = idBudget;
	}

	@Override
	public String toString() {
		return "BudgetPS [idBudgetPS=" + idBudgetPS + ", margin=" + margin + ", amount=" + amount + ", days=" + days
				+ ", unitValue=" + unitValue + ", idProductService=" + idProductService + ", idBudget=" + idBudget
				+ "]";
	}
}
