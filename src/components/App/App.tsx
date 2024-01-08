import React, {JSX, useEffect, useState} from 'react';
import Swal, {SweetAlertResult} from 'sweetalert2'
import './App.css';
import {Product} from '../../shared/Table/Table.mockdata';
import ProductForm, {ProductCreator} from '../Products/ProductForm';
import {
    createSingleProduct,
    deleteSingleProduct,
    getAllProducts,
    updateSingleProduct
} from '../../services/Products.service';
import Table, {TableHeader} from "../../shared/Table/Table";
import Header from "../Header/Header";
import Container from "../../shared/Container/Container";

const headers: TableHeader[] = [
    {key: 'id', value: '#'},
    {key: 'name', value: 'Product'},
    {key: 'price', value: 'Price', right: true},
    {key: 'stock', value: 'Available Stock', right: true}
]

function App(): JSX.Element {
    const [products, setProducts] = useState<Product[]>([])
    const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(undefined)

    async function fetchData(): Promise<void> {
        const _products: Product[] = await getAllProducts();
        setProducts(_products);
    }

    useEffect((): void => {
        fetchData();
    }, []);

    async function handleProductSubmit(product: ProductCreator): Promise<void> {
        try {
            await createSingleProduct(product)
            fetchData()
        } catch (err) {
            if (err instanceof Error)
                Swal.fire('Oops!', err.message, 'error')
        }
    }

    async function handleProductUpdate(newProduct: Product): Promise<void> {
        try {
            await updateSingleProduct(newProduct)
            setUpdatingProduct(undefined)
            fetchData()
        } catch (err) {
            if (err instanceof Error)
                Swal.fire('Oops!', err.message, 'error')
        }
    }

    async function deleteProduct(id: string): Promise<void> {
        try {
            await deleteSingleProduct(id)
            fetchData()
            Swal.fire('Uhul!', 'Product successfully deleted', 'success')
        } catch (err) {
            if (err instanceof Error)
                Swal.fire('Oops!', err.message, 'error')
        }
    }

    function handleProductDelete(product: Product): void {
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
                    deleteProduct(product._id)
                }
            })
    }

    function handleProductDetail(product: Product): void {
        Swal.fire(
            'Product details',
            `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
            'info'
        )
    }

    function handleProductEdit(product: Product): void {
        setUpdatingProduct(product)
    }

    return (
        <div className="App">
            <Header title="AlgaStock"/>
            <Container>
                <Table headers={headers} data={products} enableActions
                       onDelete={handleProductDelete}
                       onDetail={handleProductDetail}
                       onEdit={handleProductEdit}/>

                <ProductForm form={updatingProduct}
                             onSubmit={handleProductSubmit}
                             onUpdate={handleProductUpdate}/>
            </Container>
        </div>
    );
}

export default App;
