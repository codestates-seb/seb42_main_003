package com.project.chamong.article.service;

import com.project.chamong.article.dto.ArticleDto;
import com.project.chamong.article.entity.Article;
import com.project.chamong.article.entity.ArticleLike;
import com.project.chamong.article.mapper.ArticleMapper;
import com.project.chamong.article.repository.ArticleLikeRepository;
import com.project.chamong.article.repository.ArticleRepository;
import com.project.chamong.member.entity.Member;
import com.project.chamong.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleLikeService {
    private final ArticleLikeRepository articleLikeRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;

    private final ArticleMapper articleMapper;

//    @Transactional
//    public void likeArticle(Long articleId, Long memberId) {
//        ArticleLike articleLike = new ArticleLike();
//        Member member = articleLike.getMember();
//        articleLike.setArticle(articleRepository.getOne(articleId));
//        articleLike.setMember(member);
//        articleLikeRepository.save(articleLike);
//
//        Article article = articleRepository.findById(articleId)
//                .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + articleId));
//        article.increaseLikeCnt();
//    }
//
//    @Transactional
//    public void unlikeArticle(Long memberId, Long articleId) {
//        ArticleLike articleLike = articleLikeRepository.findByMemberIdAndArticleId(articleId, memberId)
//                .orElseThrow(() -> new IllegalArgumentException("Article Like not found with articleId: " + articleId + " and memberId: " + memberId));
//        articleLikeRepository.delete(articleLike);
//
//        Article article = articleRepository.findById(articleId)
//                .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + articleId));
//        article.decreaseLikeCnt();
//    }
    // 게시물 고유 번호를 받아 해당 게시물의 좋아요 개수 반환

    @Transactional
    public void likeArticle(Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found ID:" + articleId));

        ArticleLike articleLike = new ArticleLike();
        Member member = article.getMember();
        articleLike.setArticle(articleRepository.getOne(articleId));
        articleLike.setMember(member);
        articleLikeRepository.save(articleLike);

        article.increaseLikeCnt();
    }


    @Transactional
    public void unlikeArticle(Long memberId, Long articleId) {
        ArticleLike articleLike = articleLikeRepository.findByMemberIdAndArticleId(articleId, memberId)
                .orElseThrow(() -> new IllegalArgumentException("Article Like not found with articleId: " + articleId + " and memberId: " + memberId));
        articleLikeRepository.delete(articleLike);

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + articleId));
        article.decreaseLikeCnt();
    }

    // 사용자가 좋아요한 게시글 목록 조회
    @Transactional(value = "transactionManager", readOnly = true)
    public List<ArticleDto.Response> getLikedArticlesByMember(Member member) {
        List<ArticleLike> likes = articleLikeRepository.findByMember(member);
        List<ArticleDto.Response> articles = new ArrayList<>();
        for (ArticleLike like : likes) {
            ArticleDto.Response article = articleMapper.articleResponse(like.getArticle());
            article.setIsLiked(true);
            articles.add(article);
        }
        return articles;
    }

}
