package com.abhinav.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.abhinav.model.ItemEntity;
import com.abhinav.repository.EntityItemRepository;

@Service
public class EntityServiceImplementation implements EntityService  {
	@Autowired
	private EntityItemRepository itemRepository;

	@Override
	public ItemEntity createItem(ItemEntity item) {
		ItemEntity createdItem=new ItemEntity();
		createdItem.setProductId(item.getProductId());
		createdItem.setProductName(item.getProductName());
		createdItem.setProductDesc(item.getProductDesc());
		createdItem.setProductPrice(item.getProductPrice());
		return itemRepository.save(createdItem);
	}

	@Override
	public ItemEntity findItemById(int id) throws Exception{
		Optional<ItemEntity> opt = itemRepository.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new Exception("No item with such id "+id);
	}

	@Override
	public void deleteItemById(int id) throws Exception {
		
		findItemById(id);
		itemRepository.deleteById(id);
	}

	@Override
	public ItemEntity updateItem(ItemEntity item, int id)throws Exception {
		
		ItemEntity oldItem = findItemById(id);
		if(item.getProductName()!=null) {
			
			oldItem.setProductName(item.getProductName());
		}
		if(item.getProductDesc()!=null) {
			
			oldItem.setProductDesc(item.getProductDesc());
		}
		return itemRepository.save(oldItem);
	}

	@Override
	public List<ItemEntity> findAllItem() {
		return itemRepository.findAll();
	}
	
//	public List<ItemEntity> findProductWithSorting(String field){
//		return itemRepository.findAll(Sort.by(Sort.Direction.ASC));
//	}
}