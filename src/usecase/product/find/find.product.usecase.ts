import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindCustomerDto } from "../../customer/find/find.customer.dto";
import { OutputFindProductDto } from "./find.product.dto";


export default class FindProductUseCase {

    private productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.find(input.id)
        return product        
    }

}