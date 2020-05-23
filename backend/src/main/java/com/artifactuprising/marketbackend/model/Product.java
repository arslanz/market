package com.artifactuprising.marketbackend.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Document(collection = "Product")
@Data
public class Product {
    @Id
    private String _id;
    @Transient
    private String id;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private String image;

    public String getId() {
        return String.valueOf(this._id);
    }
}
