package poly.store.controller.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import poly.store.common.Constants;
import poly.store.model.CategoryModel;
import poly.store.model.ManufacturerModel;
import poly.store.model.ProductModel;
import poly.store.model.RatingModel;
import poly.store.service.CategoryService;
import poly.store.service.CommentService;
import poly.store.service.ManufacturerService;
import poly.store.service.impl.CompareProductServiceImpl;

@Controller
public class CompareController {
	@Autowired
	CompareProductServiceImpl compareService;
	
	@Autowired
	ManufacturerService manufacturerService;
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	CommentService commentService;
	
	@GetMapping("/compare")
	public String index(Model model) {	
		List<ProductModel> listProductModel = new ArrayList<ProductModel>(compareService.getItems());
		List<ManufacturerModel> listManufacturerModel = new ArrayList<ManufacturerModel>(); 
		List<CategoryModel> listCategoryModel = new ArrayList<CategoryModel>();
		List<RatingModel> listRating = new ArrayList<RatingModel>();
		for(ProductModel productModel: listProductModel) {
			RatingModel ratingModel = new RatingModel();
			ManufacturerModel manufacturerModel = manufacturerService.getOneManufacturerById(productModel.getManuId());
			CategoryModel categoryModel = categoryService.getOneCategoryById(productModel.getCateId());
			
			int countComment = commentService.getCountCommentByProductNameSearch(productModel.getNameSearch());
			int totalStar = commentService.getAllStarCommentByProductNameSearch(productModel.getNameSearch());
			
			ratingModel.setCountComment(countComment);
			ratingModel.setTotalStar(totalStar);
			
			listRating.add(ratingModel);
			listManufacturerModel.add(manufacturerModel);
			listCategoryModel.add(categoryModel);
		}
		
		model.addAttribute("rating", listRating);
		model.addAttribute("compare", compareService);
		model.addAttribute("listManu", listManufacturerModel);
		model.addAttribute("listCate", listCategoryModel);
		return Constants.USER_DISPLAY_COMPARE_FORM;
	}
	
	@GetMapping("/compare/remove/{id}")
	public String remove(@PathVariable("id") Integer id, Model model) {
		compareService.remove(id);
		System.out.println(id);
		model.addAttribute("compare", compareService);
		return "redirect:/compare";
	}
	
}
