package com.artifactuprising.marketbackend.service;

import com.artifactuprising.marketbackend.dao.OrderDao;
import com.artifactuprising.marketbackend.exception.InvalidRequestException;
import com.artifactuprising.marketbackend.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrderService {
    private final OrderDao orderDao;

    @Autowired
    public OrderService(final OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public Order submitOrder(final Order order) {
        return orderDao.insert(order);
    }
}
