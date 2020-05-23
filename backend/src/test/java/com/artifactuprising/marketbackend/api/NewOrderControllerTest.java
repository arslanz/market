package com.artifactuprising.marketbackend.api;

import com.artifactuprising.marketbackend.model.Order;
import com.artifactuprising.marketbackend.model.OrderRequest;
import com.artifactuprising.marketbackend.model.Product;
import com.artifactuprising.marketbackend.service.NewOrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class NewOrderControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private NewOrderService service;

    private static final Order EMPTY_ORDER = new Order();

    @Test
    public void whenOrderRequestIsEmpty_thenReturnsStatus400() throws Exception {
        when(service.createNewOrder(Mockito.any(OrderRequest.class))).thenReturn(EMPTY_ORDER);
        final OrderRequest or = new OrderRequest();
        mvc.perform(post("/api/new-order")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(or)))
                .andExpect(status().isBadRequest());
    }


    @Test
    public void whenOrderRequestHasEmptyProducts_thenReturnsStatus400() throws Exception {
        when(service.createNewOrder(Mockito.any(OrderRequest.class))).thenReturn(EMPTY_ORDER);
        final OrderRequest or = new OrderRequest();
        or.setUserId("1");
        or.setProducts(Collections.emptyList());
        mvc.perform(post("/api/new-order")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(or)))
                .andExpect(status().isBadRequest());
    }
}