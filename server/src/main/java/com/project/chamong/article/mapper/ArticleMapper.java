package com.project.chamong.article.mapper;

import com.project.chamong.article.dto.ArticleDto;
import com.project.chamong.article.entity.Article;
import com.project.chamong.article.entity.Comment;
import com.project.chamong.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
    default ArticleDto.Response articleResponse(Article article, Member member){

        Boolean isLiked = member.getArticleLikes()
                .stream()
                .anyMatch(memberArticleLike -> article.getArticleLikes().stream()
                        .anyMatch(articleArticleLike -> memberArticleLike.getId() == articleArticleLike.getId()));

        return ArticleDto.Response.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .nickname(article.getNickname())
                .profileImg(article.getProfileImg())
                .carName(article.getCarName())
                .articleImg(article.getArticleImg())
                .memberId(member.getId())
                .viewCnt(article.getViewCnt())
                .likeCnt(article.getLikeCnt())
                .commentCnt(article.getCommentCnt())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .isLiked(isLiked)
                .build();
    };

    default ArticleDto.Response articleResponse(Article article) {
        return ArticleDto.Response.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .nickname(article.getNickname())
                .profileImg(article.getProfileImg())
                .carName(article.getCarName())
                .articleImg(article.getArticleImg())
                .memberId(article.getMember().getId())
                .viewCnt(article.getViewCnt())
                .likeCnt(article.getLikeCnt())
                .commentCnt(article.getComments().size())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .build();
    }

}
