import React, {useState, useEffect, JSX} from 'react'

import {Product} from '../../shared/Table/Table.mockdata'
import Form from "../../shared/Form/Form";
import Input from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";

declare interface InitialFormState {
    id?: number
    name: string
    price: string
    stock: string
}

export interface ProductCreator {
    name: string
    price: number
    stock: number
}

declare interface ProductFormProps {
    form?: Product
    onSubmit?: (product: ProductCreator) => void
    onUpdate?: (product: Product) => void
}

function ProductForm(props: ProductFormProps): JSX.Element {
    const initialFormState: InitialFormState = props.form
        ? {
            id: props.form.id,
            name: props.form.name,
            price: String(props.form.price),
            stock: String(props.form.stock),
        }
        : {
            name: '',
            price: '',
            stock: ''
        }

    const [form, setForm] = useState(initialFormState)

    useEffect((): void => {
        setForm(initialFormState)
    }, [props.form])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value, name} = event.target

        setForm({
            ...form,
            [name]: value
        })
    }

    const updateProduct = (product: InitialFormState): void => {
        const productDto = {
            id: Number(product.id),
            name: String(product.name),
            price: parseFloat(product.price),
            stock: Number(product.stock)
        }

        props.onUpdate &&
        props.onUpdate(productDto)
    }

    const createProduct = (product: InitialFormState): void => {
        const productDto = {
            name: String(product.name),
            price: parseFloat(product.price),
            stock: Number(product.stock)
        }

        props.onSubmit &&
        props.onSubmit(productDto)
    }

    const handleFormSubmit = (): void => {
        form.id
            ? updateProduct(form)
            : createProduct(form)

        setForm(initialFormState)
    }

    return (
        <Form title="Product form" onSubmit={handleFormSubmit}>
            <Input onChange={handleInputChange} value={form.name} name="name" label="Name" placeholder="E.g.: Cookie"
                   required/>

            <Input onChange={handleInputChange} value={form.price} name="price" label="Price" type="number" step="0.01"
                   min="0" placeholder="E.g.: 1.25" required/>

            <Input onChange={handleInputChange} value={form.stock} name="stock" label="Stock" type="number" min="0"
                   placeholder="E.g.: 15" required/>

            <Button>
                {
                    form.id ? 'Update' : 'Submit'
                }
            </Button>
        </Form>
    );
}

export default ProductForm;
