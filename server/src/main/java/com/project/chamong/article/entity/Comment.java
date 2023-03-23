package com.project.chamong.article.entity;

import com.project.chamong.article.dto.ArticleDto;
import com.project.chamong.article.dto.CommentDto;
import com.project.chamong.audit.Auditable;
import com.project.chamong.member.entity.Member;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String content;
    private String profileImg;
    private String nickname;
    private String carName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Long getMemberId(){
        return member.getId();
    }
    public String getCarName(){
        return member.getCarName();
    }

    public String getNickname(){
        return member.getNickname();
    }
    public String getProfileImg(){
        return member.getProfileImg();
    }

//    public static Comment createArticle(CommentDto.Post postDto, Member member) {
//        Comment comment = new Comment();
//        comment.setContent(postDto.getContent());
//        comment.setMember(member);
//        comment.setProfileImg(member.getProfileImg());
//        comment.setCarName(member.getCarName());
//        comment.setNickname(member.getNickname());
//        return comment;
//    }
}