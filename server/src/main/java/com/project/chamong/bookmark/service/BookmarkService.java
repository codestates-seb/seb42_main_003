package com.project.chamong.bookmark.service;

import com.project.chamong.bookmark.entity.Bookmark;
import com.project.chamong.bookmark.repository.BookmarkRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class BookmarkService{

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository){
        this.bookmarkRepository = bookmarkRepository;
    }

    // 북마크 추가
    public Bookmark createBookmark(Bookmark bookmark){
        return bookmarkRepository.save(bookmark);
    }
}
