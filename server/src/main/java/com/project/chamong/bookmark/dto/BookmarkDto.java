package com.project.chamong.bookmark.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@AllArgsConstructor
public class BookmarkDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{
        private long memberId;

        private long contentId;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long bookmarkId;
        private long memberId;
        private long contentId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedat;
    }
}
