package com.project.chamong.auth.handler;

import com.project.chamong.auth.jwt.JwtProvider;
import com.project.chamong.auth.repository.TokenRedisRepository;
import com.project.chamong.auth.utils.CustomAuthorityUtils;
import com.project.chamong.auth.utils.Responder;
import com.project.chamong.exception.BusinessLogicException;
import com.project.chamong.exception.ExceptionCode;
import com.project.chamong.member.dto.MemberDto;
import com.project.chamong.member.entity.Member;
import com.project.chamong.member.repository.MemberRepository;
import com.project.chamong.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
public class Oauth2MemberSuccessHandler implements AuthenticationSuccessHandler {
  
  private final JwtProvider jwtProvider;
  private final MemberRepository memberRepository;
  private final TokenRedisRepository redisRepository;
  private final S3Service s3Service;
  private final CustomAuthorityUtils customAuthorityUtils;
  
  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
    Member member = findMemberOrCreate(oAuth2User);
  
    String accessToken = jwtProvider.generateAccessToken(member);
    String refreshToken = jwtProvider.generateRefreshToken(member);
  
    redisRepository.save(member.getEmail(), refreshToken);
  
    response.setHeader("Authorization", "Bearer " + accessToken);
    response.setHeader("Refresh", refreshToken);
  
    Responder.sendSuccessResponse(response);
  }
  private Member findMemberOrCreate(OAuth2User oAuth2User){
    Map<String, Object> attributes = oAuth2User.getAttributes();
    String email = String.valueOf(attributes.get("email"));
    
    try {
      return memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    } catch (BusinessLogicException exception){
      MemberDto.Post postDto = MemberDto.Post.builder()
        .email(email)
        .nickname(String.valueOf(attributes.get("name")))
        .roles(customAuthorityUtils.crateRoles(email))
        .profileImg(s3Service.getDefaultProfileImg())
        .build();
  
      Member member = Member.createMember(postDto);
  
      return memberRepository.save(member);
    }
  }
  
}
