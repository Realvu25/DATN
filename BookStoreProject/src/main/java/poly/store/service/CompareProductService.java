package poly.store.service;

import java.util.Collection;

import poly.store.model.ProductModel;

public interface CompareProductService {
	void add(Integer id, ProductModel productModel);
	void remove(Integer id);
	ProductModel addProduct(int productId);
	Collection<ProductModel> getItems();
	int getCount();
}
