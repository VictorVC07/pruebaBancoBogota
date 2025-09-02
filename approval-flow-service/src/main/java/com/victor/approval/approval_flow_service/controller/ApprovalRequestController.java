package com.victor.approval.approval_flow_service.controller;

import com.victor.approval.approval_flow_service.dto.ApprovalActionDto;
import com.victor.approval.approval_flow_service.dto.ApprovalRequestResponseDto;
import com.victor.approval.approval_flow_service.dto.CreateApprovalRequestDto;
import com.victor.approval.approval_flow_service.dto.PagedResponseDto;
import com.victor.approval.approval_flow_service.dto.PaginationParams;
import com.victor.approval.approval_flow_service.service.IApprovalRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/requests")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ApprovalRequestController extends BasePageableController {
    
    private final IApprovalRequestService service;
    
    @PostMapping
    public ResponseEntity<ApprovalRequestResponseDto> createRequest(
            @Valid @RequestBody CreateApprovalRequestDto dto) {
        ApprovalRequestResponseDto response = service.createRequest(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping()
    public ResponseEntity<PagedResponseDto<ApprovalRequestResponseDto>> getAllRequests(
            PaginationParams paginationParams) {
        
        Pageable pageable = paginationParams.toPageable("createdAt");
        PagedResponseDto<ApprovalRequestResponseDto> response = service.getAllRequests(pageable);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApprovalRequestResponseDto> getRequestById(@PathVariable UUID id) {
        ApprovalRequestResponseDto request = service.getRequestById(id);
        return ResponseEntity.ok(request);
    }
    
    @PutMapping("/{id}/approve")
    public ResponseEntity<ApprovalRequestResponseDto> approveRequest(
            @PathVariable UUID id,
            @Valid @RequestBody ApprovalActionDto actionDto) {
        ApprovalRequestResponseDto response = service.approveRequest(id, actionDto);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}/reject")
    public ResponseEntity<ApprovalRequestResponseDto> rejectRequest(
            @PathVariable UUID id,
            @Valid @RequestBody ApprovalActionDto actionDto) {
        ApprovalRequestResponseDto response = service.rejectRequest(id, actionDto);
        return ResponseEntity.ok(response);
    }
}