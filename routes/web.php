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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::inertia('/restaurantes', 'Restaurants');
Route::inertia('/reportes', 'Reports');
Route::inertia('/usuarios', 'Users');
Route::inertia('/repartidores', 'Drivers');
Route::inertia('/inventario', 'Inventory')->name("inventario");
Route::get('/promociones', function () {
    return Inertia::render('Promotions');
});
Route::get('/product-info', function () {
    return Inertia::render('ProductInfo');
});

require __DIR__.'/auth.php';
