package com.abhinav.service;

import com.abhinav.model.ItemEntity;
import com.abhinav.repository.EntityItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class EntityServiceImplementationTest {

    @InjectMocks
    private EntityServiceImplementation entityService;

    @Mock
    private EntityItemRepository itemRepository;

    @Test
    public void testUpdateItem() throws Exception {
        ItemEntity item = new ItemEntity();
        when(itemRepository.findById(1)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(ItemEntity.class))).thenReturn(item);

        ItemEntity updatedItem = entityService.updateItem(item, 1);

        verify(itemRepository, times(1)).save(item);
        assertEquals(item, updatedItem);
    }

    @Test
    public void testFindItemById() throws Exception {
        ItemEntity item = new ItemEntity();
        when(itemRepository.findById(1)).thenReturn(Optional.of(item));

        ItemEntity foundItem = entityService.findItemById(1);

        verify(itemRepository, times(1)).findById(1);
        assertEquals(item, foundItem);
    }

    @Test
    public void testDeleteItemById() throws Exception {
        ItemEntity item = new ItemEntity();
        when(itemRepository.findById(1)).thenReturn(Optional.of(item));

        entityService.deleteItemById(1);

        verify(itemRepository, times(1)).deleteById(1);
    }


    @Test
    public void testFindAllItem() {
        when(itemRepository.findAll()).thenReturn(Arrays.asList(new ItemEntity(), new ItemEntity()));

        assertEquals(2, entityService.findAllItem().size());
    }

//    @Test
//    public void testFindProductWithSorting() {
//        when(itemRepository.findAll(Sort.by(Sort.Direction.ASC))).thenReturn(Arrays.asList(new ItemEntity(), new ItemEntity()));
//
//        assertEquals(2, entityService.findProductWithSorting("field").size());
//    }
}
