package com.abhinav.service;

import com.abhinav.model.RegisterAuth;

public interface RegisterAuthService {
	public RegisterAuth newUser(RegisterAuth person);
	public RegisterAuth findUser(String userGmail) throws Exception;

}
