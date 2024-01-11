package com.abhinav.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class greetingApi {
	
	
	@GetMapping("/greet")
	public String greeting() {
		return "Hello, Welcome to our spring app";
	}
	
}
