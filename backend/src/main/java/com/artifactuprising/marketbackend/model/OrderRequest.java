package com.artifactuprising.marketbackend.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

public class OrderRequest {
    @NotBlank (message = "Order request must contain a userId")
    private String userId;
    @NotEmpty (message = "Order request must contain at least one product")
    private List<Product> products;
    private double total;

    public OrderRequest() {
    }

    public @NotBlank(message = "Order request must contain a userId") String getUserId() {
        return this.userId;
    }

    public @NotEmpty(message = "Order request must contain at least one product") List<Product> getProducts() {
        return this.products;
    }

    public double getTotal() {
        return this.total;
    }

    public void setUserId(@NotBlank(message = "Order request must contain a userId") String userId) {
        this.userId = userId;
    }

    public void setProducts(@NotEmpty(message = "Order request must contain at least one product") List<Product> products) {
        this.products = products;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof OrderRequest)) return false;
        final OrderRequest other = (OrderRequest) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$userId = this.getUserId();
        final Object other$userId = other.getUserId();
        if (this$userId == null ? other$userId != null : !this$userId.equals(other$userId)) return false;
        final Object this$products = this.getProducts();
        final Object other$products = other.getProducts();
        if (this$products == null ? other$products != null : !this$products.equals(other$products)) return false;
        if (Double.compare(this.getTotal(), other.getTotal()) != 0) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof OrderRequest;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $userId = this.getUserId();
        result = result * PRIME + ($userId == null ? 43 : $userId.hashCode());
        final Object $products = this.getProducts();
        result = result * PRIME + ($products == null ? 43 : $products.hashCode());
        final long $total = Double.doubleToLongBits(this.getTotal());
        result = result * PRIME + (int) ($total >>> 32 ^ $total);
        return result;
    }

    public String toString() {
        return "OrderRequest(userId=" + this.getUserId() + ", products=" + this.getProducts() + ", total=" + this.getTotal() + ")";
    }
}