package com.victor.approval.approval_flow_service.listener;

import com.victor.approval.approval_flow_service.event.ApprovalRequestApprovedEvent;
import com.victor.approval.approval_flow_service.event.ApprovalRequestCreatedEvent;
import com.victor.approval.approval_flow_service.event.ApprovalRequestRejectedEvent;
import com.victor.approval.approval_flow_service.service.IApprovalHistoryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.transaction.event.TransactionPhase;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApprovalHistoryEventListener {
    
    private final IApprovalHistoryService historyService;
    
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async("historyTaskExecutor")
    public void handleApprovalRequestCreated(ApprovalRequestCreatedEvent event) {
        log.debug("Handling approval request created event for ID: {}", event.getApprovalRequest().getId());
        historyService.recordCreationSync(event.getApprovalRequest(), event.getPerformer());
    }
    
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async("historyTaskExecutor")
    public void handleApprovalRequestApproved(ApprovalRequestApprovedEvent event) {
        log.debug("Handling approval request approved event for ID: {}", event.getApprovalRequest().getId());
        historyService.recordApprovalSync(event.getApprovalRequest(), event.getPerformer(), event.getComment());
    }
    
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async("historyTaskExecutor")
    public void handleApprovalRequestRejected(ApprovalRequestRejectedEvent event) {
        log.debug("Handling approval request rejected event for ID: {}", event.getApprovalRequest().getId());
        historyService.recordRejectionSync(event.getApprovalRequest(), event.getPerformer(), event.getComment());
    }
}