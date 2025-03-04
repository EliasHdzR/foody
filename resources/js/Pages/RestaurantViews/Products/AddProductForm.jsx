import {useForm} from "@inertiajs/react";
import React, {useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {MenuItem, Select} from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const AddProductForm = ({ingredients, restaurantID, productCategories, closeModal, onSuccess}) => {
    const initialValues = {
        name: "",
        code: "",
        price: 0,
        product_category_id: "",
        image: null,
        ingredients: [],
        description: "",
        availability: false,
    };

    const {data, errors, setData, post} = useForm(initialValues);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const addIngredient = (e) => {
        e.preventDefault();
        setSelectedIngredients([...selectedIngredients, {}]);
    }

    const removeIngredient = (e, index) => {
        e.preventDefault();
        const updatedIngredients = selectedIngredients.filter((_, i) => i !== index);
        setSelectedIngredients(updatedIngredients);
        setData('ingredients', updatedIngredients);
    }

    const setIngredient = (index, ingredientId) => {
        const updatedIngredients = selectedIngredients.map((item, i) =>
            i === index ? {...ingredients.find(ing => ing.id === ingredientId), quantity: item.quantity} : item
        );
        setSelectedIngredients(updatedIngredients);
        setData('ingredients', updatedIngredients);
    }

    const setAmount = (index, amount) => {
        const updatedIngredients = selectedIngredients.map((item, i) =>
            i === index ? {...item, quantity: amount} : item
        );
        setSelectedIngredients(updatedIngredients);
        setData('ingredients', updatedIngredients);
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('restaurante.products.store'), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Producto '${data.name}' agregado con éxito`);
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4 overflow-scroll">
            <div>
                <InputLabel htmlFor="name" value="Nombre"/>
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="code" value="Código"/>
                <TextInput
                    id="code"
                    startDecorator={`#${restaurantID}-`}
                    type="text"
                    name="code"
                    value={data.code}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('code', e.target.value)}
                />
                <InputError message={errors.code} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="product_category_id" value="Categoría"/>
                <Select
                    id="product_category_id"
                    value={data.product_category_id}
                    onChange={(e) => setData('product_category_id', e.target.value)}
                    className="bg-white mt-1 block w-full h-10 pl-3 py-2 text-base border-gray-300"
                >
                    {productCategories.map((category) => {
                        return (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        );
                    })};
                </Select>
                <InputError message={errors.product_category_id} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="price" value="Precio"/>
                <TextInput
                    type="number"
                    id="price"
                    name="price"
                    value={data.price}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('price', e.target.value)}
                />
                <InputError message={errors.price} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="image" value="Imagen"/>
                <TextInput
                    id="image"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="description" value="Descripción"/>
                <TextInput
                    id="description"
                    type="text"
                    name="description"
                    placeholder={'Descripción del producto'}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    minRows={4}
                />
                <InputError message={errors.description} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="ingredients" value="Ingredientes"/>
                {selectedIngredients.map((ingredient, index) => {
                    const availableIngredients = ingredients.filter(
                        (ing) => !selectedIngredients.some((selected) => selected.id === ing.id) || ing.id === ingredient.id
                    );

                    return (
                        <div key={index} className="flex items-center space-x-4">
                            <Select
                                id="ingredient"
                                value={ingredient.id}
                                onChange={(e) => setIngredient(index, e.target.value)}
                                className="mt-1 block w-full h-10 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                {availableIngredients.map((ing) => (
                                    <MenuItem key={ing.id} value={ing.id}>
                                        {ing.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextInput
                                type="number"
                                name={`ingredient-${index}`}
                                placeholder={'Cantidad'}
                                value={ingredient.quantity}
                                className="w-1/2"
                                onChange={(e) => setAmount(index, e.target.value)}
                            />
                            <button onClick={(e) => removeIngredient(e, index)} className="text-red-500">
                                Eliminar
                            </button>
                        </div>
                    );
                })}
                <button onClick={addIngredient} className="text-blue-500">Agregar Ingrediente</button>
                <InputError message={errors.ingredients} className="mt-2"/>
            </div>
            <PrimaryButton>Agregar Producto</PrimaryButton>
        </form>
    );
};

export default AddProductForm;
