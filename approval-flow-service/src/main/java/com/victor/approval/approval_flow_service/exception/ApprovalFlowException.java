package com.victor.approval.approval_flow_service.exception;

public abstract class ApprovalFlowException extends RuntimeException {
    
    protected ApprovalFlowException(String message) {
        super(message);
    }
    
    protected ApprovalFlowException(String message, Throwable cause) {
        super(message, cause);
    }
}