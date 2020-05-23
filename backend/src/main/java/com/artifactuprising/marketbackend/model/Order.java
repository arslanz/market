package com.artifactuprising.marketbackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "Order")
@Data
public class Order {
    @Id
    private String _id;
    @Transient
    private String id;
    private String userId;
    private LocalDateTime submissionDateTime;
    private List<Product> products;
    private double total;

    public String getId() {
        return String.valueOf(this._id);
    }
}