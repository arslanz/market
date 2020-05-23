package com.artifactuprising.marketbackend.service;

import com.artifactuprising.marketbackend.dao.ProductDao;
import com.artifactuprising.marketbackend.exception.InvalidRequestException;
import com.artifactuprising.marketbackend.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {
    private final ProductDao productDao;

    @Autowired
    public ProductService(final ProductDao productDao) {
        this.productDao = productDao;
    }

    public Product getProduct(final String productId) {
        Optional<Product> p = productDao.findById(productId);
        if (!p.isPresent())
            throw new InvalidRequestException("Product Id not found: " + productId);
        return p.get();
    }
}
