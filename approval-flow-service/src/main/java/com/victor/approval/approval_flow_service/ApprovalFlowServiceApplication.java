package com.victor.approval.approval_flow_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ApprovalFlowServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApprovalFlowServiceApplication.class, args);
	}

}
