package com.artifactuprising.marketbackend.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
@Data
public class User {
    @Id
    private String _id;
    @Transient
    private String id;
    @Indexed(name = "username", unique = true)
    private String username;

    public String getId() {
        return String.valueOf(this._id);
    }
}
