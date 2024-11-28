import {useForm} from "@inertiajs/react";
import React, {useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PriceFormatInput from "@/Components/PriceFormatInput.jsx";
import {MenuItem, Select} from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const EditProductForm = ({closeModal, product, ingredients, onSuccess}) => {
    const initialValues = {
        name: product.name,
        price: product.price,
        ingredients: product.ingredients.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.quantity,
        })),
        description: product.description,
        availability: product.availability,
    };

    const {data, errors, setData, post} = useForm(initialValues);
    const [selectedIngredients, setSelectedIngredients] = useState(initialValues.ingredients);

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
        post(route('restaurante.products.update', product), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Producto '${data.name}' actualizado con éxito`);
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
                <InputLabel htmlFor="price" value="Precio"/>
                <TextInput
                    startDecorator={'$'}
                    type="price"
                    id="price"
                    name="price"
                    value={data.price}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('price', e.target.value)}
                    slotProps={{
                        input: {
                            component: PriceFormatInput,
                            min: 0,
                        },
                    }}
                />
                <InputError message={errors.price} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="image" value="Nueva Imagen (Opcional)"/>
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
            <PrimaryButton>Actualizar Producto</PrimaryButton>
        </form>
    );
};

export default EditProductForm;
