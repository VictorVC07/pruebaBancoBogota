package com.victor.approval.approval_flow_service.dto;

import com.victor.approval.approval_flow_service.entity.ApprovalStatus;
import com.victor.approval.approval_flow_service.entity.RequestType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ApprovalRequestResponseDto {
    private UUID id;
    private String title;
    private String description;
    private String requester;
    private String approver;
    private RequestType requestType;
    private ApprovalStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String comment;
}