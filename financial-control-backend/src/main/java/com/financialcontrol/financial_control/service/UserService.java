package com.financialcontrol.financial_control.service;

import com.financialcontrol.financial_control.dto.UserDTO;
import com.financialcontrol.financial_control.exception.EmailInvalidException;
import com.financialcontrol.financial_control.model.User;
import com.financialcontrol.financial_control.repository.UserRepository;
import com.financialcontrol.financial_control.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public void registerUser(UserDTO userDTO) {
        String passwordHashed = passwordEncoder.encode(userDTO.getPassword());
        if (!emailHasAt(userDTO.getEmail())) {
            throw new EmailInvalidException("Email inválido");
        }
        if (isDuplicateEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        User user = new User(userDTO.getEmail(), passwordHashed, userDTO.getName());
        userRepository.save(user);
    }

    public String loginUser(UserDTO userDTO) {
        User user = userRepository.findByEmail(userDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        // Autenticar com o AuthenticationManager
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
        );

        // Gerar Token JWT
        UserDetails userDetails = userDetailsService.loadUserByUsername(userDTO.getEmail());
        return jwtUtil.generateToken(userDetails);
    }

    private boolean emailHasAt(String email) {
        return email.contains("@");
    }

    private boolean isDuplicateEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
