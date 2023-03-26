import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputFindProductDto } from "./find.product.dto"
import FindProductUseCase from "./find.product.usecase"

describe('Test find product use case', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize =  new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true}
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async ()=> {
        await sequelize.close()
    })
    
    it('Should find a product', async () => {

        const productRepository = new ProductRepository()
        const useCaseFindProduct = new FindProductUseCase(productRepository)

        const product = new Product('abcd-1234', 'Product A', 1.99)
        
        await productRepository.create(product)

        const input: InputFindProductDto = {
            id: 'abcd-1234'
        }

        const output = {
            _id: 'abcd-1234',
            _name: 'Product A',
            _price: 1.99
        }

        const result = await useCaseFindProduct.execute(input)

        expect(result).toEqual(output)
    })
})