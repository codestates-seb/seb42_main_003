package com.project.chamong.bookmark.mapper;

import com.project.chamong.bookmark.dto.BookmarkDto;
import com.project.chamong.bookmark.entity.Bookmark;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-27T17:04:10+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class BookmarkMapperImpl implements BookmarkMapper {

    @Override
    public BookmarkDto.Response bookmarkResponse(Bookmark bookmark) {
        if ( bookmark == null ) {
            return null;
        }

        long bookmarkId = 0L;
        LocalDateTime createdAt = null;
        LocalDateTime updatedAt = null;

        bookmarkId = bookmark.getBookmarkId();
        createdAt = bookmark.getCreatedAt();
        updatedAt = bookmark.getUpdatedAt();

        BookmarkDto.Response response = new BookmarkDto.Response( bookmarkId, createdAt, updatedAt );

        return response;
    }
}
