package com.project.chamong.member.mapper;

import com.project.chamong.member.dto.MemberDto;
import com.project.chamong.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-30T23:09:40+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberDto.Post postDto) {
        if ( postDto == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.email( postDto.getEmail() );
        member.password( postDto.getPassword() );
        member.nickname( postDto.getNickname() );
        List<String> list = postDto.getRoles();
        if ( list != null ) {
            member.roles( new ArrayList<String>( list ) );
        }

        member.about( "자기 소개를 작성 해보세요." );
        member.carName( "차량 정보를 입력 해보세요." );
        member.oilInfo( "휘발유" );
        member.profileImg( "img url" );

        return member.build();
    }

    @Override
    public Member memberPatchDtoToMember(MemberDto.Patch patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.nickname( patchDto.getNickname() );
        member.profileImg( patchDto.getProfileImg() );
        member.about( patchDto.getAbout() );
        member.carName( patchDto.getCarName() );
        member.oilInfo( patchDto.getOilInfo() );

        return member.build();
    }

    @Override
    public MemberDto.Response memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.Response response = new MemberDto.Response();

        response.setId( member.getId() );
        response.setEmail( member.getEmail() );
        response.setNickname( member.getNickname() );
        response.setProfileImg( member.getProfileImg() );
        response.setAbout( member.getAbout() );
        response.setCarName( member.getCarName() );
        response.setOilInfo( member.getOilInfo() );

        return response;
    }

    @Override
    public void memberToMember(Member sourceMember, Member targetMember) {
        if ( sourceMember == null ) {
            return;
        }
    }
}
