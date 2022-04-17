package poly.store.service.impl;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import poly.store.model.ProductModel;
import poly.store.service.CompareProductService;
import poly.store.service.ProductService;

@SessionScope
@Service
public class CompareProductServiceImpl implements CompareProductService {
	@Autowired
	ProductService productService;

	public static Map<Integer, ProductModel> map = new HashMap<>();

	@Override
	public void add(Integer id, ProductModel productModel) {
		if (map.get(id) == null) {
			map.put(id, productModel);
		}
	}

	@Override
	public void remove(Integer id) {
		int count = this.getCount();
		ProductModel productModel = productService.getOneProductById(id);
		Set<Integer> set = map.keySet();
		for (Integer key : set) {
			if ((productModel.getId() == map.get(key).getId())) {
				if (count == 1 && key == 1) {
					map.remove(key);
				} else {
					for (int i = key; i < count; i++) {
						map.put(i, map.get(i + 1));
					}
					map.remove(count);
				}
				break;
			}
		}
	}

	@Override
	public ProductModel addProduct(int productId) {
		int id = this.getCount();
		ProductModel productModel = productService.getOneProductById(productId);
		boolean checkDuplicate = true;
		if (id != 0) {
			Set<Integer> set = map.keySet();
			for (Integer key : set) {
				if ((productModel.getId() != map.get(key).getId())) {				
					checkDuplicate = false;
				} else {
					checkDuplicate = true;
					break;
				}
			}
			
			if (!checkDuplicate) {
				for (Integer key : set) {
					if (id > 3) {
						if (key == 4) {
							map.put(4, productModel);
							map.remove(key + 1);
							break;
						}
						map.put(key, map.get(key + 1));
					} else {
						map.put(id + 1, productModel);
						break;
					}
				}
			}		
		} else {
			map.put(id + 1, productModel);
		}
		return productModel;
	}

	@Override
	public Collection<ProductModel> getItems() {
		return map.values();
	}

	@Override
	public int getCount() {
		int count = 0;
		Set<Integer> set = map.keySet();
		for (Integer i : set) {
			count++;
		}
		return count;
	}

}
