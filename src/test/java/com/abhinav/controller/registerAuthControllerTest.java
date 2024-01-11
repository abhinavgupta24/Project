package com.abhinav.controller;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.ArgumentMatchers.any;

import com.abhinav.model.RegisterAuth;
import com.abhinav.repository.RegisterAuthRepository;

class registerAuthControllerTest<RegisterAuthController> {

    private MockMvc mockMvc;

    @Mock
    private RegisterAuthRepository registerAuthRepo;

    @Mock
    private RegisterAuthController registerAuthController;

	@BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(registerAuthController).build();
    }

    @Test
    void testAddUser() throws Exception {
        RegisterAuth user = new RegisterAuth();
        user.setUserGmail("test@gmail.com");
        user.setUserName("test");
        user.setUserPass("test");
        user.setUserPhone(987456321);

        when(registerAuthRepo.save(any(RegisterAuth.class))).thenReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userGmail\":\"test@gmail.com\",\"userName\":\"test\",\"userPass\":\"test\",\"userPhone\":98745632}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userGmail",is("test@gmail.com")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName", is("test")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userPass", is("test")))
        		.andExpect(MockMvcResultMatchers.jsonPath("$.userPhone", is(98745632)));

        verify(registerAuthRepo, times(1)).save(any(RegisterAuth.class));
        verifyNoMoreInteractions(registerAuthRepo);
    }

    @Test
    void testGetAllUsers() throws Exception {
        List<RegisterAuth> userList = new ArrayList<>();
        userList.add(new RegisterAuth("user1@gmail.com","name1", "pass1",987456321));
        userList.add(new RegisterAuth("user2@gmail.com","name2", "pass2",78945612));

        when(registerAuthRepo.findAll()).thenReturn(userList);

        mockMvc.perform(MockMvcRequestBuilders.get("/login"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].username", is("user1")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].username", is("user2")));

        verify(registerAuthRepo, times(1)).findAll();
        verifyNoMoreInteractions(registerAuthRepo);
    }
}
