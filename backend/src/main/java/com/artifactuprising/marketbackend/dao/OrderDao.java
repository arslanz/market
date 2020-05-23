package com.artifactuprising.marketbackend.dao;

import com.artifactuprising.marketbackend.model.Order;
import com.artifactuprising.marketbackend.model.Product;
import com.artifactuprising.marketbackend.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

/**
 * Interface for managing the Product object in the persistence layer.
 */
@RepositoryRestResource(collectionResourceRel = "orders", path = "orders")
@CrossOrigin("*")
public interface OrderDao extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);
}
