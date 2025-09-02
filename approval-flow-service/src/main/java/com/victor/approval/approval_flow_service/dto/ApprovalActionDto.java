package com.victor.approval.approval_flow_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ApprovalActionDto {
    
    @NotBlank(message = "Comment is required")
    private String comment;
}