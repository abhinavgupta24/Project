package com.abhinav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

@Entity
public class ItemEntity {
  
  public ItemEntity() {
    super();
  }
  @Id
  @GeneratedValue(strategy= GenerationType.SEQUENCE)
  private int productId;

  @NotBlank(message = "Product name is mandatory")
  private String productName;

  @NotBlank(message = "Product description is mandatory")
  private String productDesc;

  @NotNull(message = "Product price cannot be null")
  @Positive(message = "Product price must be positive")
  private int productPrice;

  public ItemEntity(int productId, String productName, String productDesc, int productPrice) {
    super();
    this.productId = productId;
    this.productName = productName;
    this.productDesc = productDesc;
    this.productPrice = productPrice;
  }
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductDesc() {
		return productDesc;
	}
	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}
	public int getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}
	
	
}
