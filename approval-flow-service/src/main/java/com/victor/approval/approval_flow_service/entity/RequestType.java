package com.victor.approval.approval_flow_service.entity;

import lombok.Getter;

@Getter
public enum RequestType {
    DEPLOYMENT("Deployment"),
    ACCESS("Access"),
    TECHNICAL_CHANGE("Technical Change"),
    INFRASTRUCTURE("Infrastructure"),
    SECURITY("Security"),
    OTHER("Other");
    
    private final String displayName;
    
    RequestType(String displayName) {
        this.displayName = displayName;
    }

}