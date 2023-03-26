import { InputCreateProductDto } from "./create.product.dto"
import CreateProductUseCase from "./create.product.usecase"


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}
 

describe('Unit test create product use case ', () => {
    it('Should create a product', async () => {

        const input: InputCreateProductDto = {
            type: "a",
            name: "Product A",
            price: 22.90
        }
        
        const mockRepository = MockRepository()
        const productCreateUseCase = new CreateProductUseCase(mockRepository)
        
        const output = await productCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: expect.any(String),
            price: expect.any(Number)
        })
    })

    it('Should throw an error when product name is missing', async () =>{

        const productRepository = MockRepository()
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        const input: InputCreateProductDto = {
            type: "a",
            name: "",
            price: 22.90
        }
        
        await expect(productCreateUseCase.execute(input)).rejects.toThrow('Name is required')
    })

    it("Should throw an erro when price product is missing", async () => {

        const productRepository = MockRepository()
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        const input: InputCreateProductDto = {
            type: 'a',
            name: "Product Alfa",
            price: -50.99
        }
        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero")
    })
})