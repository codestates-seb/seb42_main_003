package com.project.chamong.article.dto;

import com.project.chamong.article.entity.Article;
import com.project.chamong.audit.Auditable;
import com.project.chamong.member.dto.MemberDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ArticleDto{
    @Getter
    @Setter
    @Builder
    public static class Response {
        private Long id;
        @NotBlank(message = "제목을 입력해주세요")
        @Length(max = 100, message = "Title은 100자 이하여야 합니다.")
        private String title;
        @NotBlank(message = "내용을 입력해주세요")
        @Length(max = 1000, message = "content는 1000자 이하여야 합니다.")
        private String content;
        private String nickname;
        private String profileImg;
        private String carName;
        private String articleImg;
        private Long memberId;
        private Integer viewCnt;
        private Integer likeCnt;
        private Integer commentCnt;
        private String createdAt;
        private String updatedAt;
        private Boolean isLiked;
        private List<CommentDto.Response> comments;

        public void setComments(List<CommentDto.Response> comments) {
            this.comments = comments;
            this.commentCnt = comments.size();
        }

    }

    @Getter
    @Setter
    public static class Post {
        @NotBlank(message = "제목을 입력해주세요")
        @Length(max = 100, message = "Title은 100자 이하여야 합니다.")
        private String title;
        @NotBlank(message = "내용을 입력해주세요")
        @Length(max = 1000, message = "content는 1000자 이하여야 합니다.")
        private String content;
        private String articleImg;
        private Long memberId;
        private String profileImg;
        private String createdAt;
    }

    @Getter
    @Setter
    public static class Patch {
        @NotBlank(message = "제목을 입력해주세요")
        @Length(max = 100, message = "Title은 100자 이하여야 합니다.")
        private String title;
        @NotBlank(message = "내용을 입력해주세요")
        @Length(max = 1000, message = "content는 1000자 이하여야 합니다.")
        private String content;
        private String articleImg;
        private String modifiedAt;
    }

}
