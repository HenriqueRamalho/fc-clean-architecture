import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import CreateProductUseCase from "../create/create.product.usecase"
import { InputUpdateProductDto } from "./update.product.dto"
import UpdateProductUseCase from "./update.product.usecase"


describe('Create product use case', () => {
    let sequelize: Sequelize

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true}
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('Should update a product', async() => {
        const productRepository = new ProductRepository()
        const useCaseUpdateProduct = new UpdateProductUseCase(productRepository)

        const product = new Product('1234-abcd', 'Product Beta', 25.90)
        productRepository.create(product)

        const input: InputUpdateProductDto = {
            id: '1234-abcd',
            name: "Product Alfa",
            price: 10.90
        }
       
        const productChanged = await useCaseUpdateProduct.execute(input)

        expect(productChanged).toEqual({
            _id: input.id,
            _name: input.name,
            _price: input.price
        })
        
    })
})