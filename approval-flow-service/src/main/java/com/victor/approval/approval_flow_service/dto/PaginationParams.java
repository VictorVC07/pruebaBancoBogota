package com.victor.approval.approval_flow_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginationParams {
    private int page = 0;
    private int size = 10;
    private String sortBy = "createdAt";
    private String sortDir = "desc";
    
    /**
     * Convierte los parámetros a un objeto Pageable con validaciones
     */
    public Pageable toPageable() {
        // Validar parámetros
        int validPage = Math.max(0, this.page);
        int validSize = (this.size < 1 || this.size > 100) ? 10 : this.size;
        
        Sort.Direction direction = "asc".equalsIgnoreCase(this.sortDir) ? 
            Sort.Direction.ASC : Sort.Direction.DESC;
        
        return PageRequest.of(validPage, validSize, Sort.by(direction, this.sortBy));
    }
    
    /**
     * Convierte a Pageable con campo de ordenamiento personalizado
     */
    public Pageable toPageable(String defaultSortBy) {
        int validPage = Math.max(0, this.page);
        int validSize = (this.size < 1 || this.size > 100) ? 10 : this.size;
        
        Sort.Direction direction = "asc".equalsIgnoreCase(this.sortDir) ? 
            Sort.Direction.ASC : Sort.Direction.DESC;
        
        String sortField = (this.sortBy == null || this.sortBy.trim().isEmpty()) ? 
            defaultSortBy : this.sortBy;
        
        return PageRequest.of(validPage, validSize, Sort.by(direction, sortField));
    }
}