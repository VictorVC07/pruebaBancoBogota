package com.victor.approval.approval_flow_service.service.impl;

import com.victor.approval.approval_flow_service.dto.RequestTypeDto;
import com.victor.approval.approval_flow_service.entity.RequestType;
import com.victor.approval.approval_flow_service.service.IRequestTypeService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestTypeServiceImpl implements IRequestTypeService {
    
    @Override
    public List<RequestTypeDto> getAllRequestTypes() {
        return Arrays.stream(RequestType.values())
                .map(requestType -> new RequestTypeDto(
                        requestType.name(), 
                        requestType.getDisplayName() 
                ))
                .collect(Collectors.toList());
    }
}