package xwmtp.bingoleaderboard.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.cors();

        http.authorizeRequests()
                .anyRequest().permitAll();

        http.headers()
                .frameOptions().disable()
                .addHeaderWriter(
                        new StaticHeadersWriter("X-FRAME-OPTIONS", "ALLOW-FROM xwmtp.github.io")
                );
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000", "https://bingo-tournament.scaramangado.de", "https://xwmtp.github.io"));
        corsConfiguration.setAllowedMethods(List.of("GET"));
        corsConfiguration.setAllowedHeaders(List.of("content-type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", corsConfiguration);
        return source;
    }

}