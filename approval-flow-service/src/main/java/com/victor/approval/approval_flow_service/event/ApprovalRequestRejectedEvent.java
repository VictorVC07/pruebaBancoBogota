package com.victor.approval.approval_flow_service.event;

import com.victor.approval.approval_flow_service.entity.ApprovalRequest;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ApprovalRequestRejectedEvent extends ApplicationEvent {
    private final ApprovalRequest approvalRequest;
    private final String performer;
    private final String comment;
    
    public ApprovalRequestRejectedEvent(Object source, ApprovalRequest approvalRequest, String performer, String comment) {
        super(source);
        this.approvalRequest = approvalRequest;
        this.performer = performer;
        this.comment = comment;
    }
}