package com.abhinav.controller;

import com.abhinav.model.ItemEntity;
import com.abhinav.service.EntityService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class EntityCrudControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EntityService entityService;

    @Test
    public void testGetAllItems() throws Exception {
        when(entityService.findAllItem()).thenReturn(Arrays.asList(new ItemEntity(), new ItemEntity()));
        mockMvc.perform(get("/api/item"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetItemById() throws Exception {
        when(entityService.findItemById(1)).thenReturn(new ItemEntity());
        mockMvc.perform(get("/api/item/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testCreateItem() throws Exception {
        when(entityService.createItem(new ItemEntity())).thenReturn(new ItemEntity());
        mockMvc.perform(post("/api/item/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"productId\":1,\"productName\":\"Item Name\",\"producatDesc\":\"Item Description\",\"productPrice\":2345 }"))
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdateItem() throws Exception {
        when(entityService.updateItem(new ItemEntity(), 1)).thenReturn(new ItemEntity());
        mockMvc.perform(put("/api/item/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"productId\":1,\"productName\":\"Updated Item Name\",\"productDesc\":\"Updated Item Description\",\"productPrice\":2345 }"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteItem() throws Exception {
        when(entityService.findItemById(1)).thenReturn(new ItemEntity());
        mockMvc.perform(delete("/api/item/delete/1"))
                .andExpect(status().isOk());
    }
}
