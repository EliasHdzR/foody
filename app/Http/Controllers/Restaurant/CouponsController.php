<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Coupons\StoreRequest;
use App\Models\Coupon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CouponsController extends Controller
{
    public function index()
    {
        $restaurantId = auth()->user()->restaurant->id;
        $coupons = Coupon::where('restaurant_id', $restaurantId)->get();

        return Inertia::render('RestaurantViews/Coupons/Index', [
            'coupons' => $coupons,
            'restaurantID' => $restaurantId,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $restaurant = auth()->user()->restaurant;

        if (!$restaurant) {
            return back()->withErrors(['error' => 'El usuario no tiene un restaurante asociado.'])->withInput();
        }

        $restaurantId = $restaurant->id;

        DB::beginTransaction();

        try {
            // Recupera los datos validados del StoreRequest
            $data = $request->validated();

            // Agrega el ID del restaurante al conjunto de datos
            $data['restaurant_id'] = $restaurantId; // Asignación del ID del restaurante

            // Crea el cupón en la base de datos
            Coupon::create($data);

            DB::commit();

            return redirect()->route('restaurante.coupons.index')->with('success', 'Cupón creado con éxito.');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Error al crear el cupón: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Hubo un error al crear el cupón: ' . $e->getMessage()])->withInput();
        }
    }

    public function update(StoreRequest $request, Coupon $coupon)
    {
        DB::beginTransaction();

        try {
            // Recupera los datos validados del StoreRequest
            $data = $request->validated();

            // Filtra los datos para actualizar solo los campos deseados
            $updateData = [
                'discount' => $data['discount'],
                'discount_percent' => $data['discount_percent'],
                'expires_at' => $data['expires_at'],
            ];

            // Actualiza el cupón con los datos filtrados
            $coupon->update($updateData);

            DB::commit();

            return redirect()->route('restaurante.coupons.index')->with('success', 'Cupón actualizado con éxito.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Hubo un error al actualizar el cupón: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy(Coupon $coupon)
    {
        try {
            $coupon->delete();
            return redirect()->route('restaurante.coupons.index')->with('success', 'Cupón eliminado con éxito.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Hubo un error al eliminar el cupón.']);
        }
    }
}
