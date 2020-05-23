package com.artifactuprising.marketbackend.service;

import com.artifactuprising.marketbackend.exception.InvalidRequestException;
import com.artifactuprising.marketbackend.model.Order;
import com.artifactuprising.marketbackend.model.OrderRequest;
import com.artifactuprising.marketbackend.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NewOrderService {
    private final UserService userService;
    private final ProductService productService;
    private final OrderService orderService;

    @Autowired
    public NewOrderService(
            final UserService userService,
            final ProductService productService,
            final OrderService orderService) {
        this.userService = userService;
        this.productService = productService;
        this.orderService = orderService;
    }

    public Order createNewOrder(final OrderRequest request) {
        validateUserIdExists(request.getUserId());
        final List<Product> daoProducts = getDaoProducts(request.getProducts());
        validateProducts(request.getProducts(), daoProducts);
        validateTotal(request.getTotal(), daoProducts, request.getProducts());
        final Order newOrder = createOrder(request);
        return orderService.submitOrder(newOrder);
    }

    private Order createOrder(final OrderRequest request) {
        final Order newOrder = new Order();
        newOrder.setUserId(request.getUserId());
        newOrder.setProducts(request.getProducts());
        newOrder.setTotal(request.getTotal());
        newOrder.setSubmissionDateTime(LocalDateTime.now());
        return newOrder;
    }

    private void validateTotal(
            final double total,
            final List<Product> daoProducts,
            final List<Product> reqProducts) {
        final Map<String, Product> idToReqProduct = toProductMap(reqProducts);
        double daoTotal = daoProducts.stream()
                .map(p -> p.getPrice() * idToReqProduct.get(p.getId()).getQuantity())
                .mapToDouble(Double::doubleValue)
                .sum();
        if (Math.abs(total - daoTotal) >= 0.001)
            throw new InvalidRequestException(
                    "Requested total does not match expected total: " + daoTotal
            );
    }

    private void validateUserIdExists(final String userId) {
        if (!userService.isUserIdExist(userId))
            throw new InvalidRequestException(
                    "The User Id specified in the OrderRequest does not exist in the database: " + userId
            );
    }

    private List<Product> getDaoProducts(final List<Product> products) {
        return products.stream()
                .map(p -> productService.getProduct(p.getId()))
                .collect(Collectors.toList());
    }

    private void validateProducts(final List<Product> reqProducts, final List<Product> daoProducts) {
        final Map<String, Product> idToReqProduct = toProductMap(reqProducts);
        final Map<String, Product> idToDaoProduct = toProductMap(daoProducts);

        for (final Map.Entry<String, Product> e : idToDaoProduct.entrySet()) {
            final Product daoProduct = e.getValue();
            final Product reqProduct = idToReqProduct.get(e.getKey());
            if (daoProduct.getPrice() != reqProduct.getPrice())
                throw new InvalidRequestException(
                        "Price has changed for Product Id " + daoProduct.getId()
                );
            if (daoProduct.getQuantity() < reqProduct.getQuantity())
                throw new InvalidRequestException(
                        "Requested quantity unavailable for Product Id " + daoProduct.getId()
                );
        }
    }

    private Map<String, Product> toProductMap(final List<Product> reqProducts) {
        return reqProducts.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));
    }

}
