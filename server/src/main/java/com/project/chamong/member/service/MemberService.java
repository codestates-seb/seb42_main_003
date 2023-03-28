package com.project.chamong.member.service;

import com.project.chamong.auth.dto.AuthorizedMemberDto;
import com.project.chamong.auth.repository.TokenRedisRepository;
import com.project.chamong.auth.utils.CustomAuthorityUtils;
import com.project.chamong.exception.BusinessLogicException;
import com.project.chamong.exception.ExceptionCode;
import com.project.chamong.member.entity.Member;
import com.project.chamong.member.mapper.MemberMapper;
import com.project.chamong.member.repository.MemberRepository;
import com.project.chamong.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;
  private final CustomBeanUtils customBeanUtils;
  private final PasswordEncoder passwordEncoder;
  private final TokenRedisRepository redisRepository;
  private final MemberMapper mapper;
  
  public Member saveMember(Member member){
    verifyExistEmail(member.getEmail());
    
    if(member.getPassword() != null){
      member.setPassword(passwordEncoder.encode(member.getPassword()));
    }

    member.setRoles(CustomAuthorityUtils.crateRoles(member.getEmail()));
    return memberRepository.save(member);
  }
  
  public Member findMyPage(AuthorizedMemberDto authorizedMemberDto){
    return findByEmail(authorizedMemberDto.getEmail());
  }
  @Transactional
  public Member updateMember(Member member, String email) {
    Member findMember = findByEmail(email);
//    customBeanUtils.copyNonNullProperties(member, findMember);
    mapper.memberToMember(member, findMember);
    return findMember;
  }
  @Transactional
  public void deleteMember(String email) {
    memberRepository.deleteByEmail(email);
    redisRepository.deleteBy(email);
  }
  
  public Member findByEmail(String email){
    Optional<Member> optionalMember = memberRepository.findByEmail(email);
    return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
  }
  
  public void verifyExistEmail(String email){
    Optional<Member> optionalMember = memberRepository.findByEmail(email);
    if (optionalMember.isPresent()){
      throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
  }
  
  public void logout(HttpServletRequest request, AuthorizedMemberDto authorizedMemberDto){
    String accessToken = request.getHeader("Authorization").substring(7);
    // 저장된 Refresh 토큰 삭제
    redisRepository.deleteBy(authorizedMemberDto.getEmail());
    
    // Access 토큰을 저장하여 블랙리스트로 등록하여 이후 해당 토큰으로 요청시 거절함
    redisRepository.setBlackList(accessToken);
  }
}
