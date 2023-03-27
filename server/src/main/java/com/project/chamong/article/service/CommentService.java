package com.project.chamong.article.service;

import com.project.chamong.article.dto.CommentDto;
import com.project.chamong.article.entity.Article;
import com.project.chamong.article.entity.Comment;
import com.project.chamong.article.mapper.CommentMapper;
import com.project.chamong.article.repository.ArticleRepository;
import com.project.chamong.article.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final CommentMapper commentMapper;

    // 댓글 생성
    @Transactional
    public CommentDto.Response createComment(Long articleId,CommentDto.Post postDto) {
        Comment comment = commentMapper.commentPostDtoToComment(postDto);
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + articleId));

        comment.setArticle(article);
        commentRepository.save(comment);
        articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + articleId));
        return commentMapper.commentResponse(comment);
    }

    // 댓글 수정
    @Transactional
    public CommentDto.Response updateComment(Long articleId, Long id, CommentDto.Patch patchDto) {
        Comment comment = commentRepository.findByIdAndArticleId(id, articleId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with ID: " + id));
        Comment updatedComment = commentMapper.commentPatchDtoToComment(patchDto);
        comment.setContent(updatedComment.getContent());

        return commentMapper.commentResponse(comment);
    }
    // 댓글 삭제
    @Transactional
    public void deleteComment(Long articleId, Long id) {
        commentRepository.findByIdAndArticleId(id, articleId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with ID: " + id+"for Article ID: "+ articleId));

        commentRepository.deleteById(id);
    }
}