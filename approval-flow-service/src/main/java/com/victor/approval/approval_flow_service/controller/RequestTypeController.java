package com.victor.approval.approval_flow_service.controller;

import com.victor.approval.approval_flow_service.dto.RequestTypeDto;
import com.victor.approval.approval_flow_service.service.IRequestTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/request-types")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RequestTypeController {
    
    private final IRequestTypeService requestTypeService;
    
    @GetMapping
    public ResponseEntity<List<RequestTypeDto>> getAllRequestTypes() {
        List<RequestTypeDto> requestTypes = requestTypeService.getAllRequestTypes();
        return ResponseEntity.ok(requestTypes);
    }
}