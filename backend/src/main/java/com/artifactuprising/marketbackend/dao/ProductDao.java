package com.artifactuprising.marketbackend.dao;

import com.artifactuprising.marketbackend.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Interface for managing the Product object in the persistence layer.
 */
@RepositoryRestResource(collectionResourceRel = "products", path = "products")
@CrossOrigin("*")
public interface ProductDao extends MongoRepository<Product, String> {

}
