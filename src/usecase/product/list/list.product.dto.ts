
interface Product {
    id: string,
    name: string,
    price: number
}

export interface OutputProductListDto {
    products: Product[]
}