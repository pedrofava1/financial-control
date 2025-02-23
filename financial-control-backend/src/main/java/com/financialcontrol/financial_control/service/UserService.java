package com.financialcontrol.financial_control.service;

import com.financialcontrol.financial_control.exception.EmailInvalidException;
import com.financialcontrol.financial_control.model.User;
import com.financialcontrol.financial_control.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public void registerUser(String email, String password, String name) {
        String passwordHashed = passwordEncoder.encode(password);
        if (!isValidEmail(email)) {
            throw new EmailInvalidException("Email inválido");
        }
        User user = new User(email,passwordHashed, name);
        userRepository.save(user);
    }

    public void loginUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }
    }

    private boolean isValidEmail(String email) {
        return email.contains("@");
    }
}
