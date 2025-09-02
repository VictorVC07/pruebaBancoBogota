package com.victor.approval.approval_flow_service.service;

import com.victor.approval.approval_flow_service.entity.ApprovalRequest;

public interface INotificationService {
    
    void notifyApproverAsync(ApprovalRequest request);
    
    void notifyRequesterAsync(ApprovalRequest request, String action);
}