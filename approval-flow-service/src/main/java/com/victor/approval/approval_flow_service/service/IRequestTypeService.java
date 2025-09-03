package com.victor.approval.approval_flow_service.service;

import com.victor.approval.approval_flow_service.dto.RequestTypeDto;
import java.util.List;

public interface IRequestTypeService {
    List<RequestTypeDto> getAllRequestTypes();
}