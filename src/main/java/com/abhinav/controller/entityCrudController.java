package com.abhinav.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.abhinav.model.ItemEntity;
import com.abhinav.service.EntityService;

@RestController
@RequestMapping("/api/item")
public class EntityCrudController {
	
	@Autowired
	private EntityService entityService;
	
	@PostMapping("/save")
	public ItemEntity createItem(@RequestBody ItemEntity item) throws Exception {
		
		ItemEntity createdItem = entityService.createItem(item);
		return createdItem;
		
	}
	
	@GetMapping()
	public List<ItemEntity> getAllItem() throws Exception{
		List<ItemEntity> items = entityService.findAllItem();
		return items;
	}
	
	@DeleteMapping("/delete/{productId}")
	public ItemEntity deleteItemById(@PathVariable int productId) throws Exception{
		ItemEntity deletedItem=entityService.findItemById(productId);
		entityService.deleteItemById(productId);
		return deletedItem;
	}
	
	@PutMapping("/{productId}")
	public ItemEntity updateItem(@RequestBody ItemEntity item,@PathVariable int productId)throws Exception{
		
		ItemEntity updatedItem=entityService.updateItem(item, productId);
		
		return updatedItem;
		
	}
	
	@GetMapping("/{productId}")
	public ItemEntity getProductById(@PathVariable int productId)throws Exception{
		ItemEntity selectedItem= entityService.findItemById(productId);
		return selectedItem;
	}
	
}
