package com.abhinav.service;
import com.abhinav.model.ItemEntity;
import java.util.List;



public interface EntityService {
	
	public ItemEntity createItem(ItemEntity item);
	public ItemEntity findItemById(int id) throws Exception;
	public void deleteItemById(int id) throws Exception;
	public ItemEntity updateItem(ItemEntity item,int id) throws Exception;
	public List<ItemEntity> findAllItem();
//	public List<ItemEntity> findProductWithSorting(String field);

}

