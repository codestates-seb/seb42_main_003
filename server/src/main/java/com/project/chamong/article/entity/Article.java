package com.project.chamong.article.entity;

import com.project.chamong.article.dto.ArticleDto;
import com.project.chamong.audit.Auditable;
import com.project.chamong.member.entity.Member;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Article extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // PK
    // 작성자 닉네임
    private String nickname;
    private String carName;
    private String profileImg;
    // 제목
    @NotEmpty
    private String title;
    // 내용
    @NotEmpty
    private String content;
    // 업로드 하는 이미지
    @Column(name = "image_url")
    private String articleImg;
    // 조회수
    private Integer viewCnt;
    // 좋아요 수
    private Integer likeCnt;
    // 댓글 수
    private Integer commentCnt;
    // 댓글
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
    // 좋아요
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<ArticleLike> articleLikes = new ArrayList<>();

    //private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Long getMemberId(){
        return member.getId();
    }
    public String getProfileImg() {return member.getProfileImg();}
    public String getNickname(){return member.getNickname();}
    public String getCarName(){return member.getCarName();}
    public void increaseLikeCnt() {
        this.likeCnt++;
    }

    public void decreaseLikeCnt() {
        this.likeCnt--;
    }

    public void increaseCommentCnt() {
        this.commentCnt++;
    }

    public void decreaseCommentCnt() {
        this.commentCnt--;
    }

    public void update(ArticleDto.Patch patchDto) {
        if (patchDto.getTitle() != null) {
            this.setTitle(patchDto.getTitle());
        }
        if (patchDto.getContent() != null) {
            this.setContent(patchDto.getContent());
        }
        if (patchDto.getArticleImg() != null) {
            this.setArticleImg(patchDto.getArticleImg());
        }
    }

    public static Article createArticle(ArticleDto.Post postDto, Member member) {
        Article article = new Article();
        article.setTitle(postDto.getTitle());
        article.setContent(postDto.getContent());
        article.setMember(member);
        article.setProfileImg(member.getProfileImg());
        article.setNickname(member.getNickname());
        article.setCarName(member.getCarName());
        article.setViewCnt(0);
        article.setCommentCnt(0);
        article.setLikeCnt(0);
        article.setArticleImg(postDto.getArticleImg());
        return article;
    }


}