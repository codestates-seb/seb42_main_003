package com.project.chamong.place.controller;

import com.project.chamong.auth.dto.AuthorizedMemberDto;
import com.project.chamong.place.dto.VisitedPlaceDto;
import com.project.chamong.place.entity.VisitedPlace;
import com.project.chamong.place.mapper.VisitedPlaceMapper;
import com.project.chamong.place.service.VisitedPlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/visited-places")
@Validated
public class VisitedPlaceController {
    private final VisitedPlaceService visitedPlaceService;
    private final VisitedPlaceMapper mapper;
    
    @GetMapping
    public ResponseEntity<?> getVisitedPlaces(){
        List<VisitedPlace> visitedPlaces = visitedPlaceService.findVisitedPlaces();
        List<VisitedPlaceDto.Response> response = mapper.visitedPlacesToResponseDtos(visitedPlaces);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PostMapping("/{contentId}")
    public ResponseEntity<?> postVisitedPlace(@AuthenticationPrincipal AuthorizedMemberDto authorizedMemberDto,
                                              @PathVariable("contentId") @Positive Long contentId){
        VisitedPlace visitedPlace = VisitedPlace.builder().build();
        VisitedPlace saveVisitedPlace = visitedPlaceService.saveVisitedPlace(visitedPlace, contentId, authorizedMemberDto);
    
        VisitedPlaceDto.Response response = mapper.visitedPlaceToResponseDto(saveVisitedPlace);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{visitedPlaceId}")
    public ResponseEntity<?> deleteById(@AuthenticationPrincipal AuthorizedMemberDto authorizedMemberDto,
                                        @PathVariable("visitedPlaceId") @Positive Long id) {
        visitedPlaceService.deleteVisitedPlace(id, authorizedMemberDto);
        String message = "방문한 장소가 삭제 되었습니다.";
        return new ResponseEntity<>(message, HttpStatus.NO_CONTENT);
    }
}
