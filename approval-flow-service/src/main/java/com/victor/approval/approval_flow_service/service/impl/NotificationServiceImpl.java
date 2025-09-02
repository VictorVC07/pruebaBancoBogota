package com.victor.approval.approval_flow_service.service.impl;

import com.victor.approval.approval_flow_service.entity.ApprovalRequest;
import com.victor.approval.approval_flow_service.service.INotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationServiceImpl implements INotificationService {
    
    @Override
    @Async("notificationTaskExecutor")
    public void notifyApproverAsync(ApprovalRequest request) {
        log.info("NOTIFICATION: New approval request pending for approver: {}", request.getApprover());
        log.info("Title: {}", request.getTitle());
        log.info("Requester: {}", request.getRequester());
        log.info("Request ID: {}", request.getId());
        
        // Simulate notification processing time
        try {
            Thread.sleep(100); // Simulate delay
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.warn("Notification processing interrupted for request: {}", request.getId());
        }
        
        log.debug("Approver notification sent successfully for request: {}", request.getId());
    }

}