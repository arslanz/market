package com.artifactuprising.marketbackend.dao;

import com.artifactuprising.marketbackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Interface for managing the Product object in the persistence layer.
 */
@RepositoryRestResource(collectionResourceRel = "user", path = "user")
@CrossOrigin("*")
public interface UserDao extends MongoRepository<User, String> {
    User findByUsername(String username);
}
