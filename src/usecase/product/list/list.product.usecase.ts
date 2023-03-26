import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputProductListDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface
    
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(): Promise<OutputProductListDto> {

        const products = await this.productRepository.findAll()
        return OutputMapper.toOutput(products)
        
    }
}

class OutputMapper {
    static toOutput(products: ProductInterface[]): OutputProductListDto {
        return {
            products: products.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price
            }))
        }

    }
}