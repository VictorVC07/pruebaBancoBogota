package com.victor.approval.approval_flow_service.event;

import com.victor.approval.approval_flow_service.entity.ApprovalRequest;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ApprovalRequestCreatedEvent extends ApplicationEvent {
    private final ApprovalRequest approvalRequest;
    private final String performer;
    
    public ApprovalRequestCreatedEvent(Object source, ApprovalRequest approvalRequest, String performer) {
        super(source);
        this.approvalRequest = approvalRequest;
        this.performer = performer;
    }
}