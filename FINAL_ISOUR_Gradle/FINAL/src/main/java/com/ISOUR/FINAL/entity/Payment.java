package com.ISOUR.FINAL.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;


@Data
@Entity
@Table(name="Payment")
@DynamicUpdate
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="pd_num")
    private Long pdNum;

    private String createdAt;
    @Column(unique = false)
    private Long idNum;
    private String id;
    private String pdName;

    private String paymentMethod;
    private String amountTotal;
}