package com.project.chamong.place.entity;

import com.project.chamong.audit.BaseTime;
import com.project.chamong.member.entity.Member;
import com.project.chamong.place.dto.MyPlaceDto;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

// 내가 찾은 차박지
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyPlace extends BaseTime {
    // 장소 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // 설명
    private String memo;
    
    private String placeImg;
    
    // 키워드
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "my_place_keyword", joinColumns = @JoinColumn(name = "my_place_id", referencedColumnName = "id"))
    @Column(name = "keyword")
    private List<String> keywords = new ArrayList<>();
    
    // 위도
    @Column(name = "map_x")
    private Double mapX;
    
    // 경도
    @Column(name = "map_y")
    private Double mapY;
    
    // 공유 상태
    private Boolean isShared;

    // 멤버 고유 키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;
    
    public void setMember(Member member){
        if(this.member != null){
            this.member.getMyPlaces().remove(this);
        }
        this.member = member;
        member.getMyPlaces().add(this);
    }
    @Builder
    public MyPlace(String memo, String placeImg, List<String> keywords, Double mapX, Double mapY, Boolean isShared) {
        this.memo = memo;
        this.placeImg = placeImg;
        this.keywords = keywords;
        this.mapX = mapX;
        this.mapY = mapY;
        this.isShared = isShared;
    }
    
    public static MyPlace createMyplace(MyPlaceDto.Post postDto){
        return MyPlace.builder()
          .memo(postDto.getMemo())
          .placeImg(postDto.getMyPlaceImg())
          .keywords(postDto.getKeywords())
          .mapX(postDto.getMapX())
          .mapY(postDto.getMapY())
          .isShared(false)
          .build();
    }
    
    public void updateMyPlace(MyPlaceDto.Patch patchDto){
        this.memo = patchDto.getMemo();
        this.placeImg = patchDto.getMyPlaceImg();
        this.keywords = patchDto.getKeywords();
        this.isShared = patchDto.getIsShared();
    }

}
