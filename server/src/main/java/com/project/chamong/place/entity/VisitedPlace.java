package com.project.chamong.place.entity;

import com.project.chamong.member.entity.Member;
import com.project.chamong.place.dto.VisitedPlaceDto;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class VisitedPlace {
    // 장소 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 장소명
    private String name;
    // 주소
    private String address;
    // 장소 설명
    private String description;
    // 위도
    private Double latitude;
    // 경도
    private Double longitude;
    // 방문 날짜
    private LocalDateTime createdAt;
    // 수정 날짜
    private LocalDateTime updatedAt;
    // 메모
    private String memo;
    //private Long memberId;

    // 멤버 고유 키
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public static VisitedPlace createVisitedPlace(VisitedPlaceDto.Post postDto, Member member){
        VisitedPlace visitedPlace = new VisitedPlace();
        visitedPlace.setName(postDto.getName());
        visitedPlace.setAddress(postDto.getAddress());
        visitedPlace.setDescription(postDto.getDescription());
        visitedPlace.setLatitude(postDto.getLatitude());
        visitedPlace.setLongitude(postDto.getLongitude());
        visitedPlace.setCreatedAt(postDto.getCreatedAt());
        visitedPlace.setMember(member);
        visitedPlace.setMemo(postDto.getMemo());
        return visitedPlace;
    }


    public void update(VisitedPlaceDto.Patch patchDto) {
        if (patchDto.getName() != null) {
            this.setName(patchDto.getName());
        }
        if (patchDto.getAddress() != null) {
            this.setAddress(patchDto.getAddress());
        }
        if (patchDto.getDescription() != null) {
            this.setDescription(patchDto.getDescription());
        }
        if (patchDto.getLatitude() != null) {
            this.setLatitude(patchDto.getLatitude());
        }
        if (patchDto.getLongitude() != null) {
            this.setLongitude(patchDto.getLongitude());
        }
        if (patchDto.getCreatedAt() != null) {
            this.setCreatedAt(patchDto.getCreatedAt());
        }
        if (patchDto.getMemo() != null) {
            this.setMemo(patchDto.getMemo());
        }
    }
}
