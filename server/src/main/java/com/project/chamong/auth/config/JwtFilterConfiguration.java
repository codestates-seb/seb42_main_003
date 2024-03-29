package com.project.chamong.auth.config;


import com.project.chamong.auth.filter.JwtAuthenticationFilter;
import com.project.chamong.auth.filter.JwtVerificationFilter;
import com.project.chamong.auth.handler.MemberAuthenticationFailureHandler;
import com.project.chamong.auth.handler.MemberAuthenticationSuccessHandler;
import com.project.chamong.auth.jwt.JwtProvider;
import com.project.chamong.auth.repository.TokenRedisRepository;
import com.project.chamong.auth.utils.CustomAuthorityUtils;
import com.project.chamong.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;

@RequiredArgsConstructor
public class JwtFilterConfiguration extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
  private final JwtProvider jwtProvider;
  private final TokenRedisRepository redisRepository;
  private final MemberRepository memberRepository;
  private final CustomAuthorityUtils customAuthorityUtils;
  @Override
  public void configure(HttpSecurity builder) throws Exception {
    JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtProvider, redisRepository);
    JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtProvider, redisRepository, memberRepository, customAuthorityUtils);
    
    AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
    
    jwtAuthenticationFilter.setAuthenticationManager(authenticationManager);
    jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
    jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
    jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
    
    builder.addFilter(jwtAuthenticationFilter);
    builder.addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
  }
}
