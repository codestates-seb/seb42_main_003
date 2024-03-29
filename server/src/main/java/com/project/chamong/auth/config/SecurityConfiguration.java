package com.project.chamong.auth.config;

import com.project.chamong.auth.handler.MemberAccessDeniedHandler;
import com.project.chamong.auth.handler.MemberAuthenticationEntryPoint;
import com.project.chamong.auth.handler.Oauth2MemberSuccessHandler;
import com.project.chamong.auth.jwt.JwtProvider;
import com.project.chamong.auth.repository.TokenRedisRepository;
import com.project.chamong.auth.utils.CustomAuthorityUtils;
import com.project.chamong.member.repository.MemberRepository;
import com.project.chamong.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {
  private final JwtProvider jwtProvider;
  private final TokenRedisRepository redisRepository;
  private final MemberRepository memberRepository;
  private final S3Service s3Service;
  private final CustomAuthorityUtils customAuthorityUtils;
  
  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .httpBasic().disable()
      .formLogin().disable()
      .csrf().disable()
      .headers().frameOptions().sameOrigin()
      .and()
      .cors().and()
      .apply(new JwtFilterConfiguration(jwtProvider, redisRepository, memberRepository, customAuthorityUtils))
      .and()
      .exceptionHandling()
      .accessDeniedHandler(new MemberAccessDeniedHandler())
      .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
      .and()
      .authorizeHttpRequests(authorize -> { authorize
        .antMatchers(HttpMethod.PATCH,"/members").hasRole("USER")
        .antMatchers(HttpMethod.DELETE,"/members").hasRole("USER")
        .antMatchers(HttpMethod.GET,"/members/mypage").hasRole("USER")
        .antMatchers(HttpMethod.GET,"/members/logout").hasRole("USER")
        .antMatchers(HttpMethod.GET,"/members/token").hasRole("USER")
        .antMatchers(HttpMethod.POST,"/reviews/*").hasRole("USER")
        .antMatchers(HttpMethod.POST,"/articles").hasRole("USER")
        .antMatchers(HttpMethod.PATCH,"/articles/*").hasRole("USER")
        .antMatchers(HttpMethod.DELETE,"/articles/*").hasRole("USER")
        .antMatchers(HttpMethod.POST,"/articles/*/like").hasRole("USER")
        .antMatchers(HttpMethod.POST,"/articles/*/unlike").hasRole("USER")
        .antMatchers(HttpMethod.POST,"/comments").hasRole("USER")
        .antMatchers(HttpMethod.PATCH,"/comments/*").hasRole("USER")
        .antMatchers(HttpMethod.DELETE,"/comments/*").hasRole("USER")
        .antMatchers(HttpMethod.POST,"/bookmarks/*").hasRole("USER")
        .antMatchers(HttpMethod.DELETE,"/bookmarks/*").hasRole("USER")
        .antMatchers(HttpMethod.GET,"/pick-places").hasRole("USER")
        .antMatchers(HttpMethod.POST,"/pick-places").hasRole("USER")
        .antMatchers(HttpMethod.PATCH,"/pick-places").hasRole("USER")
        .antMatchers(HttpMethod.DELETE,"/pick-places").hasRole("USER")
        .antMatchers(HttpMethod.POST,"/visited-places/*").hasRole("USER")
        .antMatchers(HttpMethod.GET,"/visited-places").hasRole("USER")
        .antMatchers(HttpMethod.DELETE,"/visited-places/*").hasRole("USER")
        .antMatchers(HttpMethod.GET,"/articles/*").permitAll()
        .antMatchers(HttpMethod.GET,"/pick-places/shared").permitAll()
        .antMatchers(HttpMethod.GET,"/main/**").permitAll()
        .antMatchers(HttpMethod.POST,"/members").permitAll()
        .antMatchers(HttpMethod.POST,"/members/login").permitAll()
        .antMatchers(HttpMethod.OPTIONS,"/**").permitAll();
      })
      .oauth2Login()
      .authorizationEndpoint()
      .baseUri("/login/oauth2/authorization")
      .and()
      .successHandler(new Oauth2MemberSuccessHandler(jwtProvider, memberRepository, redisRepository, s3Service, customAuthorityUtils));
    
    return http.build();
  }
  
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();

    corsConfiguration.setAllowCredentials(true);
    corsConfiguration.setAllowedOrigins(Arrays.asList("http://chamongbucket.s3-website.ap-northeast-2.amazonaws.com/","http://localhost:3000/"));
    corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Refresh"));
    corsConfiguration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));
    corsConfiguration.setAllowedMethods(Arrays.asList(
      HttpMethod.POST.name(), HttpMethod.PATCH.name(), HttpMethod.GET.name(), HttpMethod.DELETE.name(), HttpMethod.OPTIONS.name()));
    corsConfiguration.setMaxAge(3600l);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
    
//    CorsConfiguration corsConfiguration = new CorsConfiguration();
//    corsConfiguration.setAllowCredentials(true);
//    corsConfiguration.addAllowedOriginPattern("*");
//    corsConfiguration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));
//    corsConfiguration.addAllowedHeader("*");
//    corsConfiguration.setAllowedMethods(
//      Arrays.asList(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.DELETE.name(), HttpMethod.PATCH.name(), HttpMethod.OPTIONS.name()));

//    corsConfiguration.setMaxAge(3600l);

//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    source.registerCorsConfiguration("/**", corsConfiguration);
//
//    return source;
  }
  
  @Bean
  PasswordEncoder passwordEncoder(){
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }
  
}
