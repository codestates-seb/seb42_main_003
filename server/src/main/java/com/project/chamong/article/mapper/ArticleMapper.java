package com.project.chamong.article.mapper;

import com.project.chamong.article.dto.ArticleDto;
import com.project.chamong.article.dto.CommentDto;
import com.project.chamong.article.entity.Article;
import com.project.chamong.article.entity.Comment;
import com.project.chamong.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ArticleMapper {
    default ArticleDto.Response articleResponse(Article article, Member member) {
        Boolean isLiked = false;
        
        if(member != null){
            isLiked = member.getArticleLikes()
              .stream()
              .anyMatch(memberArticleLike -> article.getArticleLikes().stream()
                .anyMatch(articleArticleLike -> memberArticleLike.getId() == articleArticleLike.getId()));
        }
        
        return ArticleDto.Response.builder()
          .id(article.getId())
          .title(article.getTitle())
          .content(article.getContent())
          .nickname(article.getMember().getNickname())
          .profileImg(article.getMember().getProfileImg())
          .carName(article.getMember().getCarName())
          .articleImg(article.getArticleImg())
          .memberId(article.getMember().getId())
          .viewCnt(article.getViewCnt())
          .likeCnt(article.getLikeCnt())
          .isLiked(isLiked)
          .createdAt(article.getCreatedAt())
          .updatedAt(article.getUpdatedAt())
          .comments(commentsToCommentResponseDto(article.getComments()))
          .build();
    }
    
    
    default ArticleDto.Response articleResponse(Article article) {
        return ArticleDto.Response.builder()
          .id(article.getId())
          .title(article.getTitle())
          .content(article.getContent())
          .nickname(article.getMember().getNickname())
          .profileImg(article.getMember().getProfileImg())
          .carName(article.getMember().getCarName())
          .articleImg(article.getArticleImg())
          .memberId(article.getMember().getId())
          .viewCnt(article.getViewCnt())
          .likeCnt(article.getLikeCnt())
          .commentCnt(article.getComments().size())
          .createdAt(article.getCreatedAt())
          .updatedAt(article.getUpdatedAt())
          .build();
    }
    
    default List<CommentDto.Response> commentsToCommentResponseDto(List<Comment> comments) {
        
        List<CommentDto.Response> responseDtos = comments.stream()
          .map(comment ->
            CommentDto.Response.builder()
              .id(comment.getId())
              .content(comment.getContent())
              .articleId(comment.getArticle().getId())
              .memberId(comment.getMember().getId())
              .nickname(comment.getMember().getNickname())
              .profileImg(comment.getMember().getProfileImg())
              .createdAt(comment.getCreatedAt())
              .updatedAt(comment.getUpdatedAt())
              .build())
          .collect(Collectors.toList());
        
        Collections.sort(responseDtos, Comparator.comparing(CommentDto.Response::getCreatedAt));
        
        return responseDtos;
    }
    
}
