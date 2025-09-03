package com.victor.approval.approval_flow_service.config;

import com.victor.approval.approval_flow_service.entity.ApprovalRequest;
import com.victor.approval.approval_flow_service.entity.ApprovalStatus;
import com.victor.approval.approval_flow_service.entity.RequestType;
import com.victor.approval.approval_flow_service.repository.ApprovalRequestRepository;
import com.victor.approval.approval_flow_service.service.IApprovalHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final ApprovalRequestRepository approvalRequestRepository;
    private final IApprovalHistoryService historyService;
    
    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (approvalRequestRepository.count() == 0) {
            log.info("Initializing test data in H2 database...");
            createTestData();
            log.info("Test data initialization completed.");
        } else {
            log.info("Database already contains data, skipping initialization.");
        }
    }
    
    private void createTestData() {
        // Request 1: Deployment request (PENDING)
        ApprovalRequest request1 = ApprovalRequest.builder()
                .title("Desplegar MS de autenticación")
                .description("Se necesita desplegar un microservicio para la autenticación.")
                .requester("carlos.rodriguez@ejemplo.com")
                .approver("aprobador@bancobogota.com")
                .requestType(RequestType.DEPLOYMENT)
                .status(ApprovalStatus.PENDING)
                .build();
        
        ApprovalRequest savedRequest1 = approvalRequestRepository.save(request1);
        historyService.recordCreationSync(savedRequest1, savedRequest1.getRequester());
        
        // Request 2: Access request (APPROVED)
        ApprovalRequest request2 = ApprovalRequest.builder()
                .title("Acceso a base de datos de producción")
                .description("Solicitud de acceso de lectura a la base de datos de producción para análisis de datos.")
                .requester("maria.lopez@ejemplo.com")
                .approver("aprobador@bancobogota.com")
                .requestType(RequestType.ACCESS)
                .status(ApprovalStatus.APPROVED)
                .comment("Acceso aprobado por 30 días")
                .build();
        
        ApprovalRequest savedRequest2 = approvalRequestRepository.save(request2);
        historyService.recordCreationSync(savedRequest2, savedRequest2.getRequester());
        historyService.recordApprovalSync(savedRequest2, savedRequest2.getApprover(), "Acceso aprobado por 30 días");
        
        // Request 3: Technical change (REJECTED)
        ApprovalRequest request3 = ApprovalRequest.builder()
                .title("Actualización de framework Spring")
                .description("Actualizar el framework Spring Boot de la versión 2.7 a 3.2 en el microservicio de pagos.")
                .requester("pedro.martinez@ejemplo.com")
                .approver("aprobador@bancobogota.com")
                .requestType(RequestType.TECHNICAL_CHANGE)
                .status(ApprovalStatus.REJECTED)
                .comment("Requiere más análisis de impacto")
                .build();
        
        ApprovalRequest savedRequest3 = approvalRequestRepository.save(request3);
        historyService.recordCreationSync(savedRequest3, savedRequest3.getRequester());
        historyService.recordRejectionSync(savedRequest3, savedRequest3.getApprover(), "Requiere más análisis de impacto");
        
        // Request 4: Infrastructure request (PENDING)
        ApprovalRequest request4 = ApprovalRequest.builder()
                .title("Provisión de servidor adicional")
                .description("Solicitud de un servidor adicional para el ambiente de staging debido al incremento de carga.")
                .requester("lucia.fernandez@ejemplo.com")
                .approver("aprobador@bancobogota.com")
                .requestType(RequestType.INFRASTRUCTURE)
                .status(ApprovalStatus.PENDING)
                .build();
        
        ApprovalRequest savedRequest4 = approvalRequestRepository.save(request4);
        historyService.recordCreationSync(savedRequest4, savedRequest4.getRequester());
        
        // Request 5: Security request (PENDING)
        ApprovalRequest request5 = ApprovalRequest.builder()
                .title("Implementación de autenticación multifactor")
                .description("Implementar MFA para todos los usuarios administrativos del sistema.")
                .requester("jose.garcia@ejemplo.com")
                .approver("aprobador@bancobogota.com")
                .requestType(RequestType.SECURITY)
                .status(ApprovalStatus.PENDING)
                .build();
        
        ApprovalRequest savedRequest5 = approvalRequestRepository.save(request5);
        historyService.recordCreationSync(savedRequest5, savedRequest5.getRequester());
        
        log.info("Created {} test approval requests with proper history tracking", 5);
    }
}