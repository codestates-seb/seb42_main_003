package com.project.chamong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@SpringBootApplication
@EnableJpaAuditing
@EnableWebSecurity(debug = true)
public class ChamongApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChamongApplication.class, args);
    }
}
