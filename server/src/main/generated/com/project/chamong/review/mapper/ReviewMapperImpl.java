package com.project.chamong.review.mapper;

import com.project.chamong.camping.entity.Content;
import com.project.chamong.member.dto.MemberDto;
import com.project.chamong.member.entity.Member;
import com.project.chamong.review.dto.ReviewDto;
import com.project.chamong.review.entity.Review;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-30T23:09:40+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public Review reviewPostDtoToReview(ReviewDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        String content = null;
        int rating = 0;

        content = requestBody.getContent();
        rating = requestBody.getRating();

        long reviewId = 0L;
        Member member = null;
        Content contents = null;

        Review review = new Review( reviewId, content, rating, member, contents );

        return review;
    }

    @Override
    public Review reviewPatchDtoToReview(ReviewDto.Patch patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        String content = null;
        int rating = 0;

        content = patchDto.getContent();
        rating = patchDto.getRating();

        long reviewId = 0L;
        Member member = null;
        Content contents = null;

        Review review = new Review( reviewId, content, rating, member, contents );

        return review;
    }

    @Override
    public ReviewDto.Response reviewResponse(Review review) {
        if ( review == null ) {
            return null;
        }

        long reviewId = 0L;
        int rating = 0;
        String content = null;
        MemberDto.Response member = null;

        reviewId = review.getReviewId();
        rating = review.getRating();
        content = review.getContent();
        member = memberToResponse( review.getMember() );

        ReviewDto.Response response = new ReviewDto.Response( reviewId, rating, content, member );

        return response;
    }

    protected MemberDto.Response memberToResponse(Member member) {
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
}
