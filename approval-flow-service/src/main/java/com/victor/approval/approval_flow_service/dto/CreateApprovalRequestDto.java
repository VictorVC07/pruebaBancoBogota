package com.victor.approval.approval_flow_service.dto;

import com.victor.approval.approval_flow_service.entity.RequestType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateApprovalRequestDto {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotBlank(message = "Requester is required")
    @Email(message = "Requester must be a valid email address")
    private String requester;
    
    @NotBlank(message = "Approver is required")
    @Email(message = "Approver must be a valid email address")
    private String approver;
    
    @NotNull(message = "Request type is required")
    private RequestType requestType;
}