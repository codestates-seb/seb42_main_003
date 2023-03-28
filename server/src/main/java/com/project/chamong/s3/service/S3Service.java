package com.project.chamong.s3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class S3Service {

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Autowired
    private AmazonS3 amazonS3;

    String folderPath = "http://chamongbucket.s3-website.ap-northeast-2.amazonaws.com/images/member_image/"; // S3 내의 원하는 경로 설정가능하다.

    public String uploadFile(MultipartFile file) {
        String fileName = folderPath + System.currentTimeMillis() + "_" + file.getOriginalFilename();

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata));
        } catch (IOException e) {
            throw new RuntimeException("An error occurred while uploading the file of the ChaMong application.");
        }

        return fileName;
    }
}
