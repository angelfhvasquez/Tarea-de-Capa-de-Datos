package com.petcenter.service;

import com.petcenter.dto.ProductCategoryDTO;
import com.petcenter.dto.ProductDTO;
import com.petcenter.entity.Product;
import com.petcenter.entity.ProductCategory;
import com.petcenter.repository.ProductCategoryRepository;
import com.petcenter.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    // ========== CATEGORÍAS ==========

    public ProductCategoryDTO createCategory(ProductCategoryDTO categoryDTO) {
        if (categoryRepository.findByNombre(categoryDTO.getNombre()).isPresent()) {
            throw new IllegalArgumentException("La categoría ya existe");
        }

        ProductCategory category = modelMapper.map(categoryDTO, ProductCategory.class);
        ProductCategory savedCategory = categoryRepository.save(category);
        return modelMapper.map(savedCategory, ProductCategoryDTO.class);
    }

    public List<ProductCategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> modelMapper.map(category, ProductCategoryDTO.class))
                .collect(Collectors.toList());
    }

    public ProductCategoryDTO getCategoryById(Long id) {
        ProductCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        return modelMapper.map(category, ProductCategoryDTO.class);
    }

    public ProductCategoryDTO updateCategory(Long id, ProductCategoryDTO categoryDTO) {
        ProductCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        category.setNombre(categoryDTO.getNombre());
        category.setDescripcion(categoryDTO.getDescripcion());

        ProductCategory updatedCategory = categoryRepository.save(category);
        return modelMapper.map(updatedCategory, ProductCategoryDTO.class);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    // ========== PRODUCTOS ==========

    public ProductDTO createProduct(ProductDTO productDTO) {
        ProductCategory category = categoryRepository.findById(productDTO.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        Product product = modelMapper.map(productDTO, Product.class);
        product.setCategoria(category);

        Product savedProduct = productRepository.save(product);
        return mapToDTO(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        product.setNombre(productDTO.getNombre());
        product.setDescripcion(productDTO.getDescripcion());
        product.setPrecio(productDTO.getPrecio());
        product.setStock(productDTO.getStock());

        if (productDTO.getCategoriaId() != null) {
            ProductCategory category = categoryRepository.findById(productDTO.getCategoriaId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            product.setCategoria(category);
        }

        Product updatedProduct = productRepository.save(product);
        return mapToDTO(updatedProduct);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return mapToDTO(product);
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategory(Long categoriaId) {
        return productRepository.findByCategoriaId(categoriaId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getAvailableProducts() {
        return productRepository.findByStockGreaterThan(0).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public void updateStock(Long id, Integer cantidad) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (product.getStock() < cantidad) {
            throw new IllegalArgumentException("Stock insuficiente");
        }

        product.setStock(product.getStock() - cantidad);
        productRepository.save(product);
    }

    private ProductDTO mapToDTO(Product product) {
        ProductDTO dto = modelMapper.map(product, ProductDTO.class);
        if (product.getCategoria() != null) {
            dto.setCategoriaId(product.getCategoria().getId());
            dto.setCategoriaNombre(product.getCategoria().getNombre());
        }
        return dto;
    }
}
