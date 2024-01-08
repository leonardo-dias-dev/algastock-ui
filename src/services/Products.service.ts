import http from '../utils/http'
import {Product} from '../shared/Table/Table.mockdata'
import {ProductCreator} from '../components/Products/ProductForm'
import {AxiosResponse} from "axios";

export function getAllProducts(): Promise<Product[]> {
    return http()
        .get<Product[]>('/products')
        .then((res: AxiosResponse<Product[], any>) => res.data);
}

export function createSingleProduct(product: ProductCreator): Promise<AxiosResponse<any>> {
    return http().post('/products', product);
}

export function updateSingleProduct({_id, name, price, stock}: Product): Promise<AxiosResponse<any>> {
    return http().patch(`/products/${_id}`, {
        ...(name && {name}),
        ...(price && {price}),
        ...(stock && {stock}),
    });
}

export function deleteSingleProduct(id: string): Promise<AxiosResponse<any>> {
    return http().delete(`/products/${id}`);
}
