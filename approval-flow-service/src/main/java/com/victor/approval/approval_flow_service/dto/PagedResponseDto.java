package com.victor.approval.approval_flow_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagedResponseDto<T> {
    private List<T> content;
    private PageMetadata page;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PageMetadata {
        private int number;           // Página actual (0-indexed)
        private int size;             // Tamaño de página
        private long totalElements;   // Total de elementos
        private int totalPages;       // Total de páginas
        private boolean first;        // Es la primera página
        private boolean last;         // Es la última página
        private boolean empty;        // Está vacía
        private int numberOfElements; // Elementos en esta página
    }
}