package com.project.chamong.place.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class VisitedPlaceDto {
    @Getter
    @Setter
    public static class Post{
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
        // 메모
        private String memo;
        private Long memberId;
    }
    @Getter
    @Setter
    public static class Response{
        // 장소 ID
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
        private Long memberId;
    }
    @Getter
    @Setter
    public static class Patch{
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
    }
}
