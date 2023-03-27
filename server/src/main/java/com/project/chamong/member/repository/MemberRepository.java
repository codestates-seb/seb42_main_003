package com.project.chamong.member.repository;

import com.project.chamong.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MemberRepository extends JpaRepository<Member, Long> {
  
  public Optional<Member> findByEmail(String email);
  
  public void deleteByEmail(String email);
  List<Member> findByIdIn(List<Long> memberIds);

}
