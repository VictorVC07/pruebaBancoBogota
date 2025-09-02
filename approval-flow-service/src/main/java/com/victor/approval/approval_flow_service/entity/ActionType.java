package com.victor.approval.approval_flow_service.entity;

public enum ActionType {
    CREATED("Request Created"),
    APPROVED("Request Approved"),
    REJECTED("Request Rejected"),
    UPDATED("Request Updated"),
    COMMENTED("Comment Added");

    private final String displayName;
    
    ActionType(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}