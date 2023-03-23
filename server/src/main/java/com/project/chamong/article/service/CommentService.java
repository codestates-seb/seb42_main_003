package com.project.chamong.article.service;

import com.project.chamong.article.dto.CommentDto;
import com.project.chamong.article.entity.Article;
import com.project.chamong.article.entity.Comment;
import com.project.chamong.article.mapper.CommentMapper;
import com.project.chamong.article.repository.ArticleRepository;
import com.project.chamong.article.repository.CommentRepository;
import com.project.chamong.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final CommentMapper commentMapper;

    // 댓글 생성
    @Transactional
    public CommentDto.Response createComment(CommentDto.Post postDto) {
        Comment comment = commentMapper.commentPostDtoToComment(postDto);
        commentRepository.save(comment);
        Article article = articleRepository.findById(postDto.getArticleId())
                .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + postDto.getArticleId()));
        article.increaseCommentCnt();
        return commentMapper.commentResponse(comment);
    }

    // 댓글 수정
    @Transactional
    public CommentDto.Response updateComment(Long id, CommentDto.Patch patchDto) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with ID: " + id));
        Comment updatedComment = commentMapper.commentPatchDtoToComment(patchDto);
        comment.setContent(updatedComment.getContent());

        return commentMapper.commentResponse(comment);
    }
    // 댓글 삭제
    @Transactional
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with ID: " + id));

        Article article = articleRepository.findById(comment.getArticle().getId())
                .orElseThrow(() -> new IllegalArgumentException("Article not found with ID: " + comment.getArticle().getId()));
        article.decreaseCommentCnt();

        commentRepository.deleteById(id);
    }

    @Transactional
    // 게시글에 대한 댓글 목록 조회
    public List<CommentDto.Response> getCommentsByArticleId(Long articleId) {
        List<Comment> comments = commentRepository.findByArticleId(articleId);
        return comments.stream()
                .map(commentMapper::commentResponse)
                .collect(Collectors.toList());
    }

    // 사용자가 작성한 댓글 목록 조회
    @Transactional(value = "transactionManager", readOnly = true)
    public List<CommentDto.Response> getCommentsByMember(Member member) {
        List<Comment> comments = commentRepository.findByMember(member);
        return comments.stream()
                .map(commentMapper::commentResponse)
                .collect(Collectors.toList());

    }


}
