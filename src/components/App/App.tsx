import React, {JSX, useState} from 'react';
import Swal, {SweetAlertResult} from 'sweetalert2'
import './App.css';
import Products, {Product} from '../../shared/Table/Table.mockdata';
import ProductForm, {ProductCreator} from '../Products/ProductForm';
import Header from "../Header/Header";
import Container from "../../shared/Container/Container";
import Table, {TableHeader} from "../../shared/Table/Table";

const headers: TableHeader[] = [
    {key: 'id', value: '#'},
    {key: 'name', value: 'Product'},
    {key: 'price', value: 'Price', right: true},
    {key: 'stock', value: 'Available Stock', right: true}
]

function App(): JSX.Element {
    const [products, setProducts] = useState(Products)
    const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(products[0])

    const handleProductSubmit = (product: ProductCreator): void => {
        setProducts([
            ...products,
            {
                id: products.length + 1,
                ...product
            }
        ])
    }

    const handleProductUpdate = (newProduct: Product): void => {
        setProducts(products.map((product: Product): Product =>
            product.id === newProduct.id
                ? newProduct
                : product
        ))

        setUpdatingProduct(undefined)
    }

    const deleteProduct = (id: number): void => {
        setProducts(products.filter((product: Product): boolean => product.id !== id))
    }

    const handleProductDelete = (product: Product): void => {
        Swal
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#09f',
                cancelButtonColor: '#d33',
                confirmButtonText: `Yes, delete ${product.name}!`
            })
            .then((result: SweetAlertResult): void => {
                if (result.value) {
                    deleteProduct(product.id)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
    }

    const handleProductDetail = (product: Product): void => {
        Swal.fire(
            'Product details',
            `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
            'info'
        )
    }

    const handleProductEdit = (product: Product): void => {
        setUpdatingProduct(product)
    }

    return (
        <div className="App">
            <Header title="AlgaStock"/>
            <Container>
                <Table
                    headers={headers}
                    data={products}
                    enableActions
                    onDelete={handleProductDelete}
                    onDetail={handleProductDetail}
                    onEdit={handleProductEdit}
                />

                <ProductForm
                    form={updatingProduct}
                    onSubmit={handleProductSubmit}
                    onUpdate={handleProductUpdate}
                />
            </Container>
        </div>
    );
}

export default App;
