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
    private Integer viewCnt = 0;
    // 좋아요 수
    private Integer likeCnt = 0;
    // 댓글 수
    private Integer commentCnt = 0;
//    // 댓글
//    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
//    private List<Comment> comments = new ArrayList<>();

    // 댓글
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "article_id")
    private List<Comment> comments = new ArrayList<>();
    // 좋아요
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<ArticleLike> articleLikes = new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT))
    private Member member;

    public Long getMemberId() {
        return member.getId();
    }

    public String getProfileImg() {
        return member.getProfileImg();
    }

    public String getNickname() {
        return member.getNickname();
    }

    public String getCarName() {
        return member.getCarName();
    }


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

    public void setMember(Member member) {
        if (this.member != null) {
            this.member.getArticles().remove(this);
        }
        this.member = member;
        member.getArticles().add(this);
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
        article.title = postDto.getTitle();
        article.content = postDto.getContent();
        article.setMember(member);
        article.viewCnt = 0;
        article.commentCnt = 0;
        article.likeCnt = 0;
        article.articleImg = postDto.getArticleImg();
        return article;
    }


}