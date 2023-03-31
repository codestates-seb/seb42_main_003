package com.project.chamong.article.service;

import com.project.chamong.article.entity.Article;
import com.project.chamong.article.entity.ArticleLike;
import com.project.chamong.article.repository.ArticleLikeRepository;
import com.project.chamong.article.repository.ArticleRepository;
import com.project.chamong.auth.dto.AuthorizedMemberDto;
import com.project.chamong.member.entity.Member;
import com.project.chamong.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class ArticleLikeService {
    private final ArticleLikeRepository articleLikeRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = false)
    public void likeArticle(AuthorizedMemberDto authorizedMemberDto, Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found ID:" + articleId));

        // 해당 게시물에 로그인한 회원이 좋아요를 눌렀는지 확인
        var authorizedMemberArticleLike = article.getArticleLikes().stream()
                .filter(articleLike -> articleLike.getMember().getId() == authorizedMemberDto.getId())
                .findAny();

        if(authorizedMemberArticleLike.isPresent()){
            throw new IllegalArgumentException("Already liked the article ID: "+articleId);
        }

        if (authorizedMemberArticleLike.isEmpty()) {
            article.increaseLikeCnt();

            Member member = memberRepository.findById(authorizedMemberDto.getId())
                    .orElseThrow(() -> new EntityNotFoundException(String.format("Member is not found. memberId: %d", authorizedMemberDto.getId())));

            ArticleLike articleLike = new ArticleLike();
            articleLike.setArticle(article);
            articleLike.setMember(member);
            articleLikeRepository.save(articleLike);
        }
    }
    
    
    @Transactional(readOnly = false)
    public void unlikeArticle(AuthorizedMemberDto authorizedMemberDto, Long articleId) {
        Article article = articleRepository.findById(articleId)
          .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + articleId));
        
        var authorizedMemberArticleLike = article.getArticleLikes().stream()
          .filter(articleLike -> articleLike.getMember().getId() == authorizedMemberDto.getId())
          .findAny();
        if (authorizedMemberArticleLike.isPresent()) {
            article.decreaseLikeCnt();
            article.getArticleLikes().removeIf(articleLike -> articleLike.getMember().getId() == authorizedMemberDto.getId());
        }
    }
    
    
}
