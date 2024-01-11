package com.abhinav.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.abhinav.model.RegisterAuth;
import com.abhinav.repository.RegisterAuthRepository;

class RegisterAuthServiceImplementationTest {

    @Mock
    private RegisterAuthRepository registerAuthRepository;

    @InjectMocks
    private RegisterAuthServiceImplementation registerAuthService;

    @SuppressWarnings("deprecation")
	@BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testNewUser() {
        RegisterAuth inputUser = new RegisterAuth("testName", "testGmail", "testPass", 98745612);

        when(registerAuthRepository.save(any(RegisterAuth.class))).thenReturn(inputUser);

        RegisterAuth savedUser = registerAuthService.newUser(inputUser);

        assertNotNull(savedUser);
        assertEquals("testGmail", savedUser.getUserGmail());
        assertEquals("testName", savedUser.getUserName());
        assertEquals("testPass", savedUser.getUserPass());
        assertEquals(98745612, savedUser.getUserPhone());

        verify(registerAuthRepository, times(1)).save(any(RegisterAuth.class));
        verifyNoMoreInteractions(registerAuthRepository);
    }

    @Test
    void testFindUser() throws Exception {
        RegisterAuth foundUser = new RegisterAuth("foundName", "foundGmail", "foundPass", 98745612);
        Optional<RegisterAuth> optionalUser = Optional.of(foundUser);

        when(registerAuthRepository.findById("foundGmail")).thenReturn(optionalUser);

        RegisterAuth resultUser = registerAuthService.findUser("foundGmail");

        assertNotNull(resultUser);
        assertEquals("foundGmail", resultUser.getUserGmail());
        assertEquals("foundName", resultUser.getUserName());
        assertEquals("foundPass", resultUser.getUserPass());
        assertEquals(98745612, resultUser.getUserPhone());

        verify(registerAuthRepository, times(1)).findById("foundGmail");
        verifyNoMoreInteractions(registerAuthRepository);
    }

    @Test
    void testFindUserNotFound() {
        Optional<RegisterAuth> optionalUser = Optional.empty();

        when(registerAuthRepository.findById("nonExistentGmail")).thenReturn(optionalUser);

        assertThrows(Exception.class, () -> registerAuthService.findUser("nonExistentGmail"));

        verify(registerAuthRepository, times(1)).findById("nonExistentGmail");
        verifyNoMoreInteractions(registerAuthRepository);
    }
}
