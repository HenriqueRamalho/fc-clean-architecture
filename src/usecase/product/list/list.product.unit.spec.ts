import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase"


const productOne = ProductFactory.create('a', "product A", 10.90)
const productTwo = ProductFactory.create('b', "product B", 20.90)

const MockRepository = () => {
    return {
        find: jest.fn(), 
        findAll: jest.fn().mockReturnValue([productOne, productTwo]),
        create: jest.fn(),
        update: jest.fn()
    }
}
 
describe('Unit test for listing product', () => {
    it('Should list products', async () => {

        const repository = MockRepository()
        const useCase = new ListProductUseCase(repository)

        const result = await useCase.execute()

        console.log(result)

        expect(result.products.length).toBe(2)

        expect(result.products[0].name).toEqual(expect.any(String))
        expect(result.products[0].name).toBe('product A')
        expect(result.products[0].price).toBe(10.90)

        expect(result.products[1].id).toEqual(expect.any(String))
        expect(result.products[1].name).toBe('product B')
        expect(result.products[1].price).toBe(41.8)        
        
    })
})