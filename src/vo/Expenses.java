package vo;

import java.math.BigDecimal;

public class Expenses {
	
	private long idExpenses;
	private String name;
	private String description;
	private BigDecimal value;
	private long idBudgetPS;
	
	public Expenses(long idExpenses, String name, String description, BigDecimal value, long idBudgetPS) {
		this.idExpenses = idExpenses;
		this.name = name;
		this.description = description;
		this.value = value;
		this.idBudgetPS = idBudgetPS;
	}

	public long getIdExpenses() {
		return idExpenses;
	}

	public void setIdExpenses(long idExpenses) {
		this.idExpenses = idExpenses;
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

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	public long getIdBudgetPS() {
		return idBudgetPS;
	}

	public void setIdBudgetPS(long idBudgetPS) {
		this.idBudgetPS = idBudgetPS;
	}

	@Override
	public String toString() {
		return "Expenses [idExpenses=" + idExpenses + ", name=" + name + ", description=" + description + ", value="
				+ value + ", idBudgetPS=" + idBudgetPS + "]";
	}

}
