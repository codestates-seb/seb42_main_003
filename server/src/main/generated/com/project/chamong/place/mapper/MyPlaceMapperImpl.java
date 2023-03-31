package com.project.chamong.place.mapper;

import com.project.chamong.member.entity.Member;
import com.project.chamong.place.dto.MyPlaceDto;
import com.project.chamong.place.entity.MyPlace;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-28T17:27:30+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class MyPlaceMapperImpl implements MyPlaceMapper {

    @Override
    public MyPlace postDtoToMyPlace(MyPlaceDto.Post postDto) {
        if ( postDto == null ) {
            return null;
        }

        MyPlace myPlace = new MyPlace();

        myPlace.setMemo( postDto.getMemo() );
        List<String> list = postDto.getKeywords();
        if ( list != null ) {
            myPlace.setKeywords( new ArrayList<String>( list ) );
        }
        myPlace.setMapX( postDto.getMapX() );
        myPlace.setMapY( postDto.getMapY() );

        return myPlace;
    }

    @Override
    public MyPlace patchDtoToMyPlace(MyPlaceDto.Patch patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        MyPlace myPlace = new MyPlace();

        myPlace.setMemo( patchDto.getMemo() );
        List<String> list = patchDto.getKeywords();
        if ( list != null ) {
            myPlace.setKeywords( new ArrayList<String>( list ) );
        }
        myPlace.setIsShared( patchDto.getIsShared() );

        return myPlace;
    }

    @Override
    public MyPlaceDto.Response myPlaceToResponse(MyPlace myPlace) {
        if ( myPlace == null ) {
            return null;
        }

        MyPlaceDto.Response.ResponseBuilder response = MyPlaceDto.Response.builder();

        response.memberId( myPlaceMemberId( myPlace ) );
        response.id( myPlace.getId() );
        response.memo( myPlace.getMemo() );
        List<String> list = myPlace.getKeywords();
        if ( list != null ) {
            response.keywords( new ArrayList<String>( list ) );
        }
        response.mapX( myPlace.getMapX() );
        response.mapY( myPlace.getMapY() );
        response.createdAt( myPlace.getCreatedAt() );
        response.updatedAt( myPlace.getUpdatedAt() );
        response.placeImg( myPlace.getPlaceImg() );
        response.isShared( myPlace.getIsShared() );

        return response.build();
    }

    @Override
    public void myPlaceToMyPlace(MyPlace sourceMyplace, MyPlace targetMyplace) {
        if ( sourceMyplace == null ) {
            return;
        }

        targetMyplace.setMember( sourceMyplace.getMember() );
        targetMyplace.setMemo( sourceMyplace.getMemo() );
        targetMyplace.setPlaceImg( sourceMyplace.getPlaceImg() );
        if ( targetMyplace.getKeywords() != null ) {
            List<String> list = sourceMyplace.getKeywords();
            if ( list != null ) {
                targetMyplace.getKeywords().clear();
                targetMyplace.getKeywords().addAll( list );
            }
            else {
                targetMyplace.setKeywords( null );
            }
        }
        else {
            List<String> list = sourceMyplace.getKeywords();
            if ( list != null ) {
                targetMyplace.setKeywords( new ArrayList<String>( list ) );
            }
        }
        targetMyplace.setMapX( sourceMyplace.getMapX() );
        targetMyplace.setMapY( sourceMyplace.getMapY() );
        targetMyplace.setIsShared( sourceMyplace.getIsShared() );
    }

    private Long myPlaceMemberId(MyPlace myPlace) {
        if ( myPlace == null ) {
            return null;
        }
        Member member = myPlace.getMember();
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
