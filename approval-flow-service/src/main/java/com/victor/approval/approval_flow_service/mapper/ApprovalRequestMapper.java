package com.victor.approval.approval_flow_service.mapper;

import com.victor.approval.approval_flow_service.dto.ApprovalRequestResponseDto;
import com.victor.approval.approval_flow_service.dto.CreateApprovalRequestDto;
import com.victor.approval.approval_flow_service.entity.ApprovalRequest;
import com.victor.approval.approval_flow_service.entity.ApprovalStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ApprovalRequestMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "comment", ignore = true)
    ApprovalRequest toEntity(CreateApprovalRequestDto dto);

    ApprovalRequestResponseDto toResponseDto(ApprovalRequest entity);
    
    List<ApprovalRequestResponseDto> toResponseDtoList(List<ApprovalRequest> entities);
    
    default ApprovalStatus mapStatus(String status) {
        if (status == null) {
            return ApprovalStatus.PENDING;
        }
        return ApprovalStatus.valueOf(status.toUpperCase());
    }
}