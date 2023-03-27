package com.project.chamong.bookmark.mapper;

import com.project.chamong.bookmark.dto.BookmarkDto;
import com.project.chamong.bookmark.entity.Bookmark;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-23T23:30:46+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class BookmarkMapperImpl implements BookmarkMapper {

    @Override
    public Bookmark bookmarkPostDtoToBookmark(BookmarkDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Bookmark bookmark = new Bookmark();

        return bookmark;
    }

    @Override
    public BookmarkDto.Response bookmarkResponse(Bookmark bookmark) {
        if ( bookmark == null ) {
            return null;
        }

        long bookmarkId = 0L;
        LocalDateTime createdAt = null;
        LocalDateTime updatedat = null;

        bookmarkId = bookmark.getBookmarkId();
        createdAt = bookmark.getCreatedAt();
        updatedat = bookmark.getUpdatedat();

        long memberId = 0L;
        long contentId = 0L;

        BookmarkDto.Response response = new BookmarkDto.Response( bookmarkId, memberId, contentId, createdAt, updatedat );

        return response;
    }
}
