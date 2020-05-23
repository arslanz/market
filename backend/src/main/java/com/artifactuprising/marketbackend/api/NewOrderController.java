package com.artifactuprising.marketbackend.api;

import com.artifactuprising.marketbackend.model.Order;
import com.artifactuprising.marketbackend.model.OrderRequest;
import com.artifactuprising.marketbackend.service.NewOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Validated
@RestController
@RequestMapping("/api/new-order")
public class NewOrderController {
    private final NewOrderService newOrderService;

    @Autowired
    public NewOrderController(final NewOrderService newOrderService) {
        this.newOrderService = newOrderService;
    }

    @PostMapping
    public Order createOrder(@RequestBody @Valid final OrderRequest orderRequest) {
        return newOrderService.createNewOrder(orderRequest);
    }

}