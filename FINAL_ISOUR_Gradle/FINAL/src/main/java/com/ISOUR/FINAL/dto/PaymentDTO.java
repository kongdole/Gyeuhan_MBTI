package com.ISOUR.FINAL.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PaymentDTO {
    private Long pdNum;
    private Long idNum;
    private String id;
    private String pdName;
    private String createdAt;
    private String paymentMethod;
    private String amountTotal;
}