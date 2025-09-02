package com.victor.approval.approval_flow_service.exception;

import com.victor.approval.approval_flow_service.entity.ApprovalStatus;

public class InvalidApprovalStatusException extends ApprovalFlowException {
    
    public InvalidApprovalStatusException(String operation, ApprovalStatus currentStatus) {
        super(String.format("Cannot %s request. Current status is %s, but PENDING is required", 
                operation, currentStatus));
    }
    
    public InvalidApprovalStatusException(String message) {
        super(message);
    }
}