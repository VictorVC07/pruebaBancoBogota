package com.victor.approval.approval_flow_service.service;

import com.victor.approval.approval_flow_service.entity.ApprovalRequest;

public interface IApprovalHistoryService {

    void recordCreationSync(ApprovalRequest request, String performer);
    
    void recordApprovalSync(ApprovalRequest request, String performer, String comment);
    
    void recordRejectionSync(ApprovalRequest request, String performer, String comment);
}