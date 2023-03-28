package com.project.chamong.member.mapper;

import com.project.chamong.article.entity.Article;
import com.project.chamong.article.entity.ArticleLike;
import com.project.chamong.article.entity.Comment;
import com.project.chamong.member.dto.MemberDto;
import com.project.chamong.member.entity.Member;
import com.project.chamong.place.entity.MyPlace;
import com.project.chamong.place.entity.VisitedPlace;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-28T09:40:41+0900",
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

        targetMember.setPassword( sourceMember.getPassword() );
        targetMember.setNickname( sourceMember.getNickname() );
        targetMember.setProfileImg( sourceMember.getProfileImg() );
        targetMember.setAbout( sourceMember.getAbout() );
        targetMember.setCarName( sourceMember.getCarName() );
        targetMember.setOilInfo( sourceMember.getOilInfo() );
        if ( targetMember.getRoles() != null ) {
            List<String> list = sourceMember.getRoles();
            if ( list != null ) {
                targetMember.getRoles().clear();
                targetMember.getRoles().addAll( list );
            }
            else {
                targetMember.setRoles( null );
            }
        }
        else {
            List<String> list = sourceMember.getRoles();
            if ( list != null ) {
                targetMember.setRoles( new ArrayList<String>( list ) );
            }
        }
        if ( targetMember.getArticles() != null ) {
            List<Article> list1 = sourceMember.getArticles();
            if ( list1 != null ) {
                targetMember.getArticles().clear();
                targetMember.getArticles().addAll( list1 );
            }
            else {
                targetMember.setArticles( null );
            }
        }
        else {
            List<Article> list1 = sourceMember.getArticles();
            if ( list1 != null ) {
                targetMember.setArticles( new ArrayList<Article>( list1 ) );
            }
        }
        if ( targetMember.getVisitedPlaces() != null ) {
            List<VisitedPlace> list2 = sourceMember.getVisitedPlaces();
            if ( list2 != null ) {
                targetMember.getVisitedPlaces().clear();
                targetMember.getVisitedPlaces().addAll( list2 );
            }
            else {
                targetMember.setVisitedPlaces( null );
            }
        }
        else {
            List<VisitedPlace> list2 = sourceMember.getVisitedPlaces();
            if ( list2 != null ) {
                targetMember.setVisitedPlaces( new ArrayList<VisitedPlace>( list2 ) );
            }
        }
        if ( targetMember.getMyPlaces() != null ) {
            List<MyPlace> list3 = sourceMember.getMyPlaces();
            if ( list3 != null ) {
                targetMember.getMyPlaces().clear();
                targetMember.getMyPlaces().addAll( list3 );
            }
            else {
                targetMember.setMyPlaces( null );
            }
        }
        else {
            List<MyPlace> list3 = sourceMember.getMyPlaces();
            if ( list3 != null ) {
                targetMember.setMyPlaces( new ArrayList<MyPlace>( list3 ) );
            }
        }
        if ( targetMember.getComments() != null ) {
            List<Comment> list4 = sourceMember.getComments();
            if ( list4 != null ) {
                targetMember.getComments().clear();
                targetMember.getComments().addAll( list4 );
            }
            else {
                targetMember.setComments( null );
            }
        }
        else {
            List<Comment> list4 = sourceMember.getComments();
            if ( list4 != null ) {
                targetMember.setComments( new ArrayList<Comment>( list4 ) );
            }
        }
        if ( targetMember.getArticleLikes() != null ) {
            List<ArticleLike> list5 = sourceMember.getArticleLikes();
            if ( list5 != null ) {
                targetMember.getArticleLikes().clear();
                targetMember.getArticleLikes().addAll( list5 );
            }
            else {
                targetMember.setArticleLikes( null );
            }
        }
        else {
            List<ArticleLike> list5 = sourceMember.getArticleLikes();
            if ( list5 != null ) {
                targetMember.setArticleLikes( new ArrayList<ArticleLike>( list5 ) );
            }
        }
    }
}
