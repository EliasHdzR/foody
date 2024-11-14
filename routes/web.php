<?php

use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\RestaurantsController;
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
    Route::post('/profile/driver', [ProfileController::class, 'toDriver'])->name('profile.toDriver');
    Route::post('/profile/restaurant', [ProfileController::class, 'toRestaurant'])->name('profile.toRestaurant');
    Route::post('/profile/restaurant/update', [ProfileController::class, 'updateRestaurant'])->name('profile.restaurant.update');
    Route::patch('/profile/driver/update', [ProfileController::class, 'updateDriver'])->name('profile.driver.update');

    Route::prefix('/admin')->group(function () {
        Route::controller(RestaurantsController::class)->group(function () {
            Route::get('/restaurantes', 'index')->name('admin.restaurant.index');
        });

        Route::controller(CategoriesController::class)->group(function () {
            Route::get('/categorias', 'index')->name('admin.categories.index');
            Route::post('/categorias', 'store')->name('admin.categories.store');
            Route::put('/categorias/{category}', 'update')->name('admin.categories.update');
            Route::delete('/categorias/{category}', 'destroy')->name('admin.categories.destroy');
        });

        Route::inertia('/reportes', 'AdminViews/Reports')->name('admin.reports.index');
        Route::inertia('/usuarios', 'AdminViews/Users')->name('admin.users.index');
        Route::inertia('/repartidores', 'AdminViews/Drivers')->name('admin.drivers.index');
        Route::inertia('/inventario', 'AdminViews/Inventory');
        Route::inertia('/promociones', 'AdminViews/Promotions')->name('admin.promotions.index');
        Route::inertia('/producto-info', 'AdminViews/ProductInfo');
    });

    Route::prefix('/restaurante')->group((function () {
        Route::inertia('/ingredientes', 'RestaurantViews/Ingredients');
        Route::inertia('/menu', 'RestaurantViews/MenuStore');
    }));
});

/*****
 * TEMPORALES
 */

Route::get('/dashboard', function () {
    return Inertia::render('AdminViews/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


require __DIR__.'/auth.php';
