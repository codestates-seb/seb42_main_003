package com.project.chamong.place.mapper;

import com.project.chamong.camping.entity.Content;
import com.project.chamong.member.entity.Member;
import com.project.chamong.place.dto.VisitedPlaceDto;
import com.project.chamong.place.entity.VisitedPlace;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-28T17:27:30+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class VisitedPlaceMapperImpl implements VisitedPlaceMapper {

    @Override
    public VisitedPlaceDto.Response visitedPlaceToResponseDto(VisitedPlace visitedPlace) {
        if ( visitedPlace == null ) {
            return null;
        }

        VisitedPlaceDto.Response.ResponseBuilder response = VisitedPlaceDto.Response.builder();

        response.facltNm( visitedPlaceContentFacltNm( visitedPlace ) );
        response.lineIntro( visitedPlaceContentLineIntro( visitedPlace ) );
        response.addr1( visitedPlaceContentAddr1( visitedPlace ) );
        response.firstImageUrl( visitedPlaceContentFirstImageUrl( visitedPlace ) );
        response.mapX( visitedPlaceContentMapX( visitedPlace ) );
        response.mapY( visitedPlaceContentMapY( visitedPlace ) );
        response.memberId( visitedPlaceMemberId( visitedPlace ) );
        response.id( visitedPlace.getId() );
        response.createdAt( visitedPlace.getCreatedAt() );
        response.updatedAt( visitedPlace.getUpdatedAt() );

        return response.build();
    }

    private String visitedPlaceContentFacltNm(VisitedPlace visitedPlace) {
        if ( visitedPlace == null ) {
            return null;
        }
        Content content = visitedPlace.getContent();
        if ( content == null ) {
            return null;
        }
        String facltNm = content.getFacltNm();
        if ( facltNm == null ) {
            return null;
        }
        return facltNm;
    }

    private String visitedPlaceContentLineIntro(VisitedPlace visitedPlace) {
        if ( visitedPlace == null ) {
            return null;
        }
        Content content = visitedPlace.getContent();
        if ( content == null ) {
            return null;
        }
        String lineIntro = content.getLineIntro();
        if ( lineIntro == null ) {
            return null;
        }
        return lineIntro;
    }

    private String visitedPlaceContentAddr1(VisitedPlace visitedPlace) {
        if ( visitedPlace == null ) {
            return null;
        }
        Content content = visitedPlace.getContent();
        if ( content == null ) {
            return null;
        }
        String addr1 = content.getAddr1();
        if ( addr1 == null ) {
            return null;
        }
        return addr1;
    }

    private String visitedPlaceContentFirstImageUrl(VisitedPlace visitedPlace) {
        if ( visitedPlace == null ) {
            return null;
        }
        Content content = visitedPlace.getContent();
        if ( content == null ) {
            return null;
        }
        String firstImageUrl = content.getFirstImageUrl();
        if ( firstImageUrl == null ) {
            return null;
        }
        return firstImageUrl;
    }

    private double visitedPlaceContentMapX(VisitedPlace visitedPlace) {
        if ( visitedPlace == null ) {
            return 0.0d;
        }
        Content content = visitedPlace.getContent();
        if ( content == null ) {
            return 0.0d;
        }
        double mapX = content.getMapX();
        return mapX;
    }

    private double visitedPlaceContentMapY(VisitedPlace visitedPlace) {
        if ( visitedPlace == null ) {
            return 0.0d;
        }
        Content content = visitedPlace.getContent();
        if ( content == null ) {
            return 0.0d;
        }
        double mapY = content.getMapY();
        return mapY;
    }

    private Long visitedPlaceMemberId(VisitedPlace visitedPlace) {
        if ( visitedPlace == null ) {
            return null;
        }
        Member member = visitedPlace.getMember();
        if ( member == null ) {
            return null;
        }
        Long id = member.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
