<?php

use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\RestaurantsController;
use App\Http\Controllers\Admin\DriversController;
use App\Http\Controllers\Admin\CustomersController;
use App\Http\Controllers\Admin\FaqsController;
use App\Http\Controllers\Restaurant\IngredientsController;
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

        Route::controller(FaqsController::class)->group(function () {
            Route::get('/preguntas', 'index')->name('admin.faqs.index');
            Route::post('/preguntas', 'store')->name('admin.faqs.store');
            Route::put('/preguntas/{faq}', 'update')->name('admin.faqs.update');
            Route::delete('/preguntas/{faq}', 'destroy')->name('admin.faqs.destroy');
        });

        Route::controller(CategoriesController::class)->group(function () {
            Route::get('/categorias', 'index')->name('admin.categories.index');
            Route::post('/categorias', 'store')->name('admin.categories.store');
            Route::put('/categorias/{category}', 'update')->name('admin.categories.update');
            Route::delete('/categorias/{category}', 'destroy')->name('admin.categories.destroy');
        });

        Route::controller(CustomersController::class)->group(function (){
            Route::get('/clientes', 'index')->name('admin.customers.index');
            Route::delete('/clientes/{customer}', 'destroy')->name('admin.customers.destroy');
        });

        Route::controller(DriversController::class)->group(function (){
            Route::get('/repartidores', 'index')->name('admin.drivers.index');
            Route::delete('/repartidores/{driver}', 'destroy')->name('admin.drivers.destroy');
        });

        Route::inertia('/reportes', 'AdminViews/Reports')->name('admin.reports.index');
        Route::inertia('/usuarios', 'AdminViews/Users')->name('admin.users.index');
        Route::inertia('/inventario', 'AdminViews/Inventory');
        Route::inertia('/promociones', 'AdminViews/Promotions')->name('admin.promotions.index');
        Route::inertia('/producto-info', 'AdminViews/ProductInfo');
    });

    Route::prefix('/restaurante')->group((function () {
        Route::controller(IngredientsController::class)->group(function () {
        Route::get('/ingredientes', 'index')->name('restaurante.ingredients.index'); 
        Route::post('/ingredientes', 'store')->name('restaurante.ingredients.store');
        Route::put('/ingredientes/{ingredient}', 'update')->name('restaurante.ingredients.update');
        Route::delete('/ingredientes/{ingredient}', 'destroy')->name('restaurante.ingredients.destroy');
        });

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
