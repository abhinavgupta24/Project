package com.abhinav.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.abhinav.model.RegisterAuth;

public interface RegisterAuthRepository extends JpaRepository<RegisterAuth, String > {


}
