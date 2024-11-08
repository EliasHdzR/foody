<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*****
 * TEMPORALES
 */

Route::get('/dashboard', function () {
    return Inertia::render('AdminViews/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::inertia('/restaurantes', 'AdminViews/Restaurants');
Route::inertia('/reportes', 'AdminViews/Reports');
Route::inertia('/usuarios', 'AdminViews/Users');
Route::inertia('/repartidores', 'AdminViews/Drivers');
Route::inertia('/inventario', 'AdminViews/Inventory');
Route::inertia('/promociones', 'AdminViews/Promotions');
Route::inertia('/producto-info', 'AdminViews/ProductInfo');
Route::inertia('/menu', 'Layaout');
Route::inertia('/ingredientes', 'RestaurantViews/Ingredients');


require __DIR__.'/auth.php';
