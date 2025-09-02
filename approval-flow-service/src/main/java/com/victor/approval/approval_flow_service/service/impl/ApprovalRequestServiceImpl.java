package com.victor.approval.approval_flow_service.service.impl;

import com.victor.approval.approval_flow_service.dto.ApprovalActionDto;
import com.victor.approval.approval_flow_service.dto.ApprovalRequestResponseDto;
import com.victor.approval.approval_flow_service.dto.CreateApprovalRequestDto;
import com.victor.approval.approval_flow_service.dto.PagedResponseDto;
import com.victor.approval.approval_flow_service.entity.ApprovalRequest;
import com.victor.approval.approval_flow_service.entity.ApprovalStatus;
import com.victor.approval.approval_flow_service.event.ApprovalRequestCreatedEvent;
import com.victor.approval.approval_flow_service.exception.ApprovalRequestNotFoundException;
import com.victor.approval.approval_flow_service.exception.InvalidApprovalStatusException;
import com.victor.approval.approval_flow_service.mapper.ApprovalRequestMapper;
import com.victor.approval.approval_flow_service.repository.ApprovalRequestRepository;
import com.victor.approval.approval_flow_service.service.IApprovalRequestService;
import com.victor.approval.approval_flow_service.service.INotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.victor.approval.approval_flow_service.event.ApprovalRequestApprovedEvent;
import com.victor.approval.approval_flow_service.event.ApprovalRequestRejectedEvent;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ApprovalRequestServiceImpl implements IApprovalRequestService {
    
    private final ApprovalRequestRepository repository;
    private final INotificationService notificationService;
    private final ApprovalRequestMapper mapper;
    private final ApplicationEventPublisher eventPublisher;
    
    @Override
    public ApprovalRequestResponseDto createRequest(CreateApprovalRequestDto dto) {
        log.info("Creating new approval request with title: {}", dto.getTitle());
        
        ApprovalRequest request = mapper.toEntity(dto);
        ApprovalRequest savedRequest = repository.save(request);

        eventPublisher.publishEvent(new ApprovalRequestCreatedEvent(this, savedRequest, dto.getRequester()));
        notificationService.notifyApproverAsync(savedRequest);
        
        log.info("Approval request created with ID: {}", savedRequest.getId());
        return mapper.toResponseDto(savedRequest);
    }
    
    @Override
    @Transactional(readOnly = true)
    public PagedResponseDto<ApprovalRequestResponseDto> getAllRequests(Pageable pageable) {
        log.info("Fetching approval requests - Page: {}, Size: {}", pageable.getPageNumber(), pageable.getPageSize());
        
        Page<ApprovalRequest> requestPage = repository.findAll(pageable);
        List<ApprovalRequestResponseDto> content = mapper.toResponseDtoList(requestPage.getContent());
        
        PagedResponseDto.PageMetadata pageMetadata = new PagedResponseDto.PageMetadata(
            requestPage.getNumber(),
            requestPage.getSize(),
            requestPage.getTotalElements(),
            requestPage.getTotalPages(),
            requestPage.isFirst(),
            requestPage.isLast(),
            requestPage.isEmpty(),
            requestPage.getNumberOfElements()
        );
        
        log.info("Retrieved {} requests out of {} total", content.size(), requestPage.getTotalElements());
        return new PagedResponseDto<>(content, pageMetadata);
    }
    
    @Override
    @Transactional(readOnly = true)
    public ApprovalRequestResponseDto getRequestById(UUID id) {
        log.info("Fetching approval request with ID: {}", id);
        ApprovalRequest request = repository.findById(id)
                .orElseThrow(() -> new ApprovalRequestNotFoundException(id));
        return mapper.toResponseDto(request);
    }
    
    @Override
    public ApprovalRequestResponseDto approveRequest(UUID id, ApprovalActionDto actionDto) {
        log.info("Approving request with ID: {}", id);
        
        ApprovalRequest request = repository.findById(id)
                .orElseThrow(() -> new ApprovalRequestNotFoundException(id));
        
        if (request.getStatus() != ApprovalStatus.PENDING) {
            throw new InvalidApprovalStatusException("Request is not in pending status");
        }
        
        request.setStatus(ApprovalStatus.APPROVED);
        request.setComment(actionDto.getComment());
        request.setUpdatedAt(LocalDateTime.now());
        
        ApprovalRequest savedRequest = repository.save(request);
        
        // Publicar evento que se ejecutará después del commit
        eventPublisher.publishEvent(new ApprovalRequestApprovedEvent(this, savedRequest, request.getApprover(), actionDto.getComment()));
        
        // Notify requester
        notificationService.notifyRequesterAsync(savedRequest, "approved");
        
        log.info("Request approved with ID: {}", id);
        return mapper.toResponseDto(savedRequest);
    }
    
    @Override
    public ApprovalRequestResponseDto rejectRequest(UUID id, ApprovalActionDto actionDto) {
        log.info("Rejecting request with ID: {}", id);
        
        ApprovalRequest request = repository.findById(id)
                .orElseThrow(() -> new ApprovalRequestNotFoundException(id));
        
        if (request.getStatus() != ApprovalStatus.PENDING) {
            throw new InvalidApprovalStatusException("Request is not in pending status");
        }
        
        request.setStatus(ApprovalStatus.REJECTED);
        request.setComment(actionDto.getComment());
        request.setUpdatedAt(LocalDateTime.now());
        
        ApprovalRequest savedRequest = repository.save(request);
        
        // Publicar evento que se ejecutará después del commit
        eventPublisher.publishEvent(new ApprovalRequestRejectedEvent(this, savedRequest, request.getApprover(), actionDto.getComment()));
        
        // Notify requester
        notificationService.notifyRequesterAsync(savedRequest, "rejected");
        
        log.info("Request rejected with ID: {}", id);
        return mapper.toResponseDto(savedRequest);
    }
}