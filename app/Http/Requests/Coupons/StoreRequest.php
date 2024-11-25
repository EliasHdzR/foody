<?php

namespace App\Http\Requests\Coupons;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Obtén el ID del cupón si existe
        $couponId = $this->route('coupon') ? $this->route('coupon')->id : null;

        return [
            'code' => [
                'required',
                'string',
                'size:5',
                // Modificar la regla de unique para ignorar el cupón actual
                Rule::unique('coupons')->ignore($couponId),
            ],
            'discount' => 'nullable|numeric|min:0|max:999999.99',
            'discount_percent' => 'nullable|numeric|min:0|max:100',
            'expires_at' => 'required|date|after:now',
        ];
    }

    /**
     * Add custom validation logic for exclusive fields.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'discount' => $this->input('discount') ?: null,
            'discount_percent' => $this->input('discount_percent') ?: null,
        ]);
    }

    /**
     * After the basic validation rules, apply custom logic.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $discount = $this->input('discount');
            $discountPercent = $this->input('discount_percent');

            if (is_null($discount) && is_null($discountPercent)) {
                $validator->errors()->add('discount', 'Debes especificar al menos un descuento o porcentaje de descuento.');
                $validator->errors()->add('discount_percent', 'Debes especificar al menos un descuento o porcentaje de descuento.');
            }

            if (!is_null($discount) && !is_null($discountPercent)) {
                $validator->errors()->add('discount', 'Solo uno de los campos de descuento puede tener un valor.');
                $validator->errors()->add('discount_percent', 'Solo uno de los campos de descuento puede tener un valor.');
            }
        });
    }

    /**
     * Custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'code.required' => 'El código es obligatorio.',
            'code.size' => 'El código debe tener exactamente 5 caracteres.',
            'code.unique' => 'El código ya existe.',
            'discount.numeric' => 'El descuento debe ser un valor numérico.',
            'discount_percent.numeric' => 'El porcentaje de descuento debe ser un valor numérico.',
            'expires_at.required' => 'La fecha de expiración es obligatoria.',
            'expires_at.after' => 'La fecha de expiración debe ser en el futuro.',
        ];
    }
}
