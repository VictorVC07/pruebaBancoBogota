package com.victor.approval.approval_flow_service.service.impl;

import com.victor.approval.approval_flow_service.entity.*;
import com.victor.approval.approval_flow_service.repository.ApprovalHistoryRepository;
import com.victor.approval.approval_flow_service.service.IApprovalHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApprovalHistoryServiceImpl implements IApprovalHistoryService {
    
    private final ApprovalHistoryRepository repository;
    
    @Override
    @Transactional
    public void recordCreationSync(ApprovalRequest request, String performer) {
        log.debug("Recording creation history synchronously for request ID: {}", request.getId());
        
        ApprovalHistory history = ApprovalHistory.builder()
                .approvalRequest(request)
                .previousStatus(null)
                .newStatus(ApprovalStatus.PENDING)
                .actionType(ActionType.CREATED)
                .performedBy(performer)
                .comment("Request created")
                .actionDate(LocalDateTime.now())
                .build();
        
        repository.save(history);
        log.debug("Creation history recorded synchronously for request ID: {}", request.getId());
    }
    
    @Override
    @Transactional
    public void recordApprovalSync(ApprovalRequest request, String performer, String comment) {
        log.debug("Recording approval history synchronously for request ID: {}", request.getId());
        
        ApprovalHistory history = ApprovalHistory.builder()
                .approvalRequest(request)
                .previousStatus(ApprovalStatus.PENDING)
                .newStatus(ApprovalStatus.APPROVED)
                .actionType(ActionType.APPROVED)
                .performedBy(performer)
                .comment(comment != null ? comment : "Request approved")
                .actionDate(LocalDateTime.now())
                .build();
        
        repository.save(history);
        log.debug("Approval history recorded synchronously for request ID: {}", request.getId());
    }
    
    @Override
    @Transactional
    public void recordRejectionSync(ApprovalRequest request, String performer, String comment) {
        log.debug("Recording rejection history synchronously for request ID: {}", request.getId());
        
        ApprovalHistory history = ApprovalHistory.builder()
                .approvalRequest(request)
                .previousStatus(ApprovalStatus.PENDING)
                .newStatus(ApprovalStatus.REJECTED)
                .actionType(ActionType.REJECTED)
                .performedBy(performer)
                .comment(comment != null ? comment : "Request rejected")
                .actionDate(LocalDateTime.now())
                .build();
        
        repository.save(history);
        log.debug("Rejection history recorded synchronously for request ID: {}", request.getId());
    }
}