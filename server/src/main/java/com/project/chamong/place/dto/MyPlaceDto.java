package com.project.chamong.place.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MyPlaceDto {
    @Getter
    @Setter
    public static class Post {
        private String memo;
        private String keyword;
        private Long memberId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String img;
        private Double latitude;
        private Double longitude;
        private boolean shared;

    }

    @Getter
    @Setter
    public static class Response {
        private String memo;
        private String keyword;
        private Long id;
        private Double latitude;
        private Double longitude;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String img;
        private Long memberId;
        private boolean shared;

    }

    @Getter
    @Setter
    public static class Patch {
        private String memo;
        private String keyword;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String img;
        private Double longitude;
        private Double latitude;
        private boolean shared;
    }
}
