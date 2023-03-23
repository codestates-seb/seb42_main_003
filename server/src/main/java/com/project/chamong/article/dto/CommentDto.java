package com.project.chamong.article.dto;

import com.project.chamong.article.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDto {
    @Getter
    @Setter
    public static class Post {
        private String content;
        private String nickname;
        private String profileImg;
        private String carName;
        private Long articleId;
        private Long memberId;
        private String createdAt;
    }
    @Getter
    @Setter
    public static class Response {
        private Long id;
        private String content;
        private String carName;
        private Long articleId;
        private Long memberId;
        private String nickname;
        private String profileImg;
        private String createdAt;
        private String modifiedAt;

    }

    @Getter
    @Setter
    public static class Patch{
        private String content;
        private String modifiedAt;

    }

}
