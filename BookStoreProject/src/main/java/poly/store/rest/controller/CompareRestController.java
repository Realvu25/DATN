package poly.store.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.store.model.ProductModel;
import poly.store.service.CompareProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/compare")
public class CompareRestController {
	@Autowired
	CompareProductService compareService;
	
	@PostMapping("/add/{id}")
	public ProductModel add(@PathVariable("id") int productId) {
		return compareService.addProduct(productId);
	}
}
