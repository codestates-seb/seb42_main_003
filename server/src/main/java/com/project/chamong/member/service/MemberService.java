package com.project.chamong.member.service;

import com.project.chamong.auth.repository.TokenRedisRepository;
import com.project.chamong.exception.BusinessLogicException;
import com.project.chamong.exception.ExceptionCode;
import com.project.chamong.member.entity.Member;
import com.project.chamong.member.repository.MemberRepository;
import com.project.chamong.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;
  private final CustomBeanUtils customBeanUtils;
  private final PasswordEncoder passwordEncoder;
  private final TokenRedisRepository redisRepository;
  
  public Member saveMember(Member member){
    verifyExistEmail(member.getEmail());
    return memberRepository.save(member);
  }
  
  public Member getMyPage(){
    return null;
  }
  @Transactional
  public Member updateMember(Member member, String email){
    Member findMember = findByEmail(email);
    customBeanUtils.copyNonNullProperties(member, findMember);
    findMember.setPassword(passwordEncoder.encode(member.getPassword()));
    return findMember;
  }
  @Transactional
  public void deleteMember(String email){
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
}