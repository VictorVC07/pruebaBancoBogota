package com.victor.approval.approval_flow_service.service;

import com.victor.approval.approval_flow_service.dto.ApprovalActionDto;
import com.victor.approval.approval_flow_service.dto.ApprovalRequestResponseDto;
import com.victor.approval.approval_flow_service.dto.CreateApprovalRequestDto;
import com.victor.approval.approval_flow_service.dto.PagedResponseDto;
import com.victor.approval.approval_flow_service.dto.PendingApprovalsCountDto;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IApprovalRequestService {
    
    ApprovalRequestResponseDto createRequest(CreateApprovalRequestDto dto);
    
    PagedResponseDto<ApprovalRequestResponseDto> getAllRequests(Pageable pageable);
    
    ApprovalRequestResponseDto getRequestById(UUID id);
    
    ApprovalRequestResponseDto approveRequest(UUID id, ApprovalActionDto actionDto);
    
    ApprovalRequestResponseDto rejectRequest(UUID id, ApprovalActionDto actionDto);
    
    PendingApprovalsCountDto getPendingApprovalsCount(String approverEmail);
}