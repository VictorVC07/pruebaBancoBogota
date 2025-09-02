package com.victor.approval.approval_flow_service.exception;

import java.util.UUID;

public class ApprovalRequestNotFoundException extends ApprovalFlowException {
    
    public ApprovalRequestNotFoundException(UUID id) {
        super("Approval request not found with ID: " + id);
    }
}