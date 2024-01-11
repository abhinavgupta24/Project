package com.abhinav.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class RegisterAuth {
	
	public RegisterAuth() {
		super();
	}
		
	@Id
	@Column(name="userGmail" ,unique=true)
	private String userGmail;
	
	@Column(name="userName")
	private String userName;
	
	
	@Column(name="userPass")
	private String userPass;
	
	@Column(name="userPhone", unique=true, length=10)
	private long userPhone;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserGmail() {
		return userGmail;
	}
	public void setUserGmail(String userGmail) {
		this.userGmail = userGmail;
	}
	public String getUserPass() {
		return userPass;
	}

	public RegisterAuth(String userName, String userGmail, String userPass, long userPhone) {
		super();
//		this.userUID = userUID;
		this.userName = userName;
		this.userGmail = userGmail;
		this.userPass = userPass;
		this.userPhone = userPhone;
	}

	public void setUserPass(String userPass) {
		this.userPass = userPass;
	}
	public long getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(long userPhone) {
		this.userPhone = userPhone;
	}
}
