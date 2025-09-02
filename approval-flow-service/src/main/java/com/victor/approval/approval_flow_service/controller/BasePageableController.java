package com.victor.approval.approval_flow_service.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestParam;

public abstract class BasePageableController {

    protected Pageable createPageable(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDir,
            String defaultSortBy) {
        
        if (page < 0) page = 0;
        if (size < 1 || size > 100) size = 10;
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("asc") ? 
            Sort.Direction.ASC : Sort.Direction.DESC;
        
        return PageRequest.of(page, size, Sort.by(direction, defaultSortBy));
    }
}