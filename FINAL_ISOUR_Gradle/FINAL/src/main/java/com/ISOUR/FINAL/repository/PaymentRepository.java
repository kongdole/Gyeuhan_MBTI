package com.ISOUR.FINAL.repository;

import com.ISOUR.FINAL.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentRepository extends JpaRepository<Payment, Long> {


    Payment findById(String id);


}