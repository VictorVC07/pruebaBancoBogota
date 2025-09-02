package com.victor.approval.approval_flow_service.service;

import com.victor.approval.approval_flow_service.entity.ApprovalRequest;

public interface NotificationService {
    
    void notifyApproverAsync(ApprovalRequest request);
    
}