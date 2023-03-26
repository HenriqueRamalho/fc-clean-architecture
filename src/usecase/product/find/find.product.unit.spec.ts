import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import FindProductUseCase from "./find.product.usecase"

const product = ProductFactory.create('a', "product A", 22.90)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe('Unit test find a product', () => {
    it('Should find a product', async () => {
        const productRepository = MockRepository()
        const productUseCase = new FindProductUseCase(productRepository)

        const input: InputFindProductDto = { id: '123' }
        
        const result = await productUseCase.execute(input)

        expect(result).toEqual(product)        
    })

    it('Should not find a product', async () => {
        const productRepository = MockRepository()
        productRepository.find.mockImplementation(() => {
            throw new Error('Product not found')
        })
        const productUseCase = new FindProductUseCase(productRepository)

        const input: InputFindProductDto = { id: "123"}

        expect(() => {
            return productUseCase.execute(input)
        }).rejects.toThrow('Product not found')
    })
})