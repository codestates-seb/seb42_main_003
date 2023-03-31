package com.project.chamong.article.mapper;

import com.project.chamong.article.dto.CommentDto;
import com.project.chamong.article.entity.Comment;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-30T23:09:40+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment commentPostDtoToComment(CommentDto.Post postDto) {
        if ( postDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setContent( postDto.getContent() );

        return comment;
    }

    @Override
    public Comment commentPatchDtoToComment(CommentDto.Patch patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setContent( patchDto.getContent() );

        return comment;
    }
}
