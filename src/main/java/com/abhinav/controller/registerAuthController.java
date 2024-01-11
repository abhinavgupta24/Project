package com.abhinav.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhinav.model.RegisterAuth;
import com.abhinav.repository.RegisterAuthRepository;

@RestController
@RequestMapping
public class registerAuthController {
	@Autowired
	private RegisterAuthRepository registerAuthRepo;
	
	@PostMapping("/register")
	public RegisterAuth addUser(@RequestBody RegisterAuth user) throws Exception{
		RegisterAuth newUser=registerAuthRepo.save(user);
		return newUser;
	}
	
	@GetMapping("/login")
    public List<RegisterAuth> getAllUsers() {
        return registerAuthRepo.findAll();
    }
}
	
