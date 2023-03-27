package com.project.chamong.article.controller;

import com.project.chamong.article.dto.CommentDto;
import com.project.chamong.article.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    // 댓글 생성
    @PostMapping("/articles/{articleId}/comments")
    public ResponseEntity<CommentDto.Response> createComment(@PathVariable Long articleId,  @RequestBody CommentDto.Post postDto){

        return ResponseEntity.ok(commentService.createComment(articleId,postDto));
    }

    // 댓글 수정
    @PatchMapping("/articles/{articleId}/comments/{id}")
    public ResponseEntity<CommentDto.Response> updateComment(@PathVariable Long articleId, @PathVariable Long id, @RequestBody CommentDto.Patch patchDto){

        return ResponseEntity.ok(commentService.updateComment(articleId, id, patchDto));
    }

    // 댓글 삭제
    @DeleteMapping("/articles/{articleId}/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long articleId, @PathVariable Long id){
        commentService.deleteComment(articleId,id);
        return ResponseEntity.noContent().build();
    }
}
