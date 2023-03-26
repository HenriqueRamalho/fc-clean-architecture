import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputUpdateProductDto } from "./update.product.dto"
import UpdateProductUseCase from "./update.product.usecase"


const input: InputUpdateProductDto = {
    id: '1',
    name: 'Product B',
    price: 27.90
}

const product = ProductFactory.create('b', 'Product B', 27.90)

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn()
    }
}

describe('Unit test for product update use case', () => {

    it('Should update a product', async () => {

        const mockRepository = MockRepository()
        const productUpdateUseCase = new UpdateProductUseCase(mockRepository)
        
        const result = await productUpdateUseCase.execute(input)

        expect(result).toEqual(product)
    })
})