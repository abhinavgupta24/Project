package com.abhinav.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abhinav.model.RegisterAuth;
import com.abhinav.repository.RegisterAuthRepository;

@Service
public class RegisterAuthServiceImplementation implements RegisterAuthService{
	@Autowired
	private RegisterAuthRepository registerAuthRepository; 
	@Override
	public RegisterAuth newUser(RegisterAuth person) {
		RegisterAuth user=new RegisterAuth();
		user.setUserGmail(person.getUserGmail());
		user.setUserName(person.getUserName());
		user.setUserPass(person.getUserPass());
		user.setUserPhone(person.getUserPhone());
		return registerAuthRepository.save(user);
	}
	

	@Override
	public RegisterAuth findUser(String userGmail) throws Exception{
		Optional<RegisterAuth> opt= registerAuthRepository.findById(userGmail);
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new Exception("No such user with this " + userGmail);
	}

}
