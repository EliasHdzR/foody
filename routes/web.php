<?php

    use App\Http\Controllers\Admin\CategoriesController;
    use App\Http\Controllers\Admin\RestaurantsController;
    use App\Http\Controllers\Customer\RestaurantController as CustomerRestaurantController;
    use App\Http\Controllers\Restaurant\CategoriesController as RestaurantCategoriesController;
    use App\Http\Controllers\Admin\DriversController;
    use App\Http\Controllers\Admin\CustomersController;
    use App\Http\Controllers\Admin\FaqsController;
    use App\Http\Controllers\Restaurant\IngredientsController;
    use App\Http\Controllers\Restaurant\CouponsController;
    use App\Http\Controllers\Restaurant\ProductsController;
    use App\Http\Controllers\ProfileController;
    use App\Http\Middleware\CheckRole;
    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;

    Route::get('/', function () {
        return redirect()->route('login');
    });

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::post('/profile/driver', [ProfileController::class, 'toDriver'])->name('profile.toDriver');
        Route::post('/profile/restaurant', [ProfileController::class, 'toRestaurant'])->name('profile.toRestaurant');
        Route::post('/profile/restaurant/update', [ProfileController::class, 'updateRestaurant'])->name('profile.restaurant.update');
        Route::patch('/profile/driver/update', [ProfileController::class, 'updateDriver'])->name('profile.driver.update');

        Route::get('/dashboard', function () {
            $user = Auth::user();

            if ($user->isRestaurant()) {
                return redirect()->route('restaurante.dashboard');
            }

            if ($user->isCustomer()) {
                return redirect()->route('cliente.dashboard');
            }

            if ($user->isDriver()) {
                return redirect()->route('driver.dashboard');
            }

            return redirect()->route('admin.dashboard');
        })->name('dashboard');

        /**
         * RUTAS ROL DE ADMIN
         */
        Route::middleware([CheckRole::class . ':admin'])->prefix('/admin')->group(function () {
            Route::inertia('/dashboard', 'AdminViews/Dashboard')->name('admin.dashboard');

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

            Route::controller(CustomersController::class)->group(function () {
                Route::get('/clientes', 'index')->name('admin.customers.index');
                Route::delete('/clientes/{customer}', 'destroy')->name('admin.customers.destroy');
            });

            Route::controller(DriversController::class)->group(function () {
                Route::get('/repartidores', 'index')->name('admin.drivers.index');
                Route::delete('/repartidores/{driver}', 'destroy')->name('admin.drivers.destroy');
            });

            Route::inertia('/reportes', 'AdminViews/Reports')->name('admin.reports.index');
            Route::inertia('/inventario', 'AdminViews/Inventory');
            Route::inertia('/producto-info', 'AdminViews/ProductInfo');
        });

        /**
         * RUTAS ROL DE RESTAURANTE
         */
        Route::middleware([CheckRole::class . ':restaurant'])->prefix('/restaurante')->group((function () {
            Route::inertia('/dashboard', 'RestaurantViews/Dashboard')->name('restaurante.dashboard');

            Route::prefix('/productos')->group(function () {
                Route::get('/', [ProductsController::class, 'index'])->name('restaurante.products.index');
                Route::post('/', [ProductsController::class, 'store'])->name('restaurante.products.store');
                Route::post('/{product}', [ProductsController::class, 'update'])->name('restaurante.products.update');
                Route::delete('/{product}', [ProductsController::class, 'destroy'])->name('restaurante.products.destroy');
            });

            Route::controller(IngredientsController::class)->group(function () {
                Route::get('/ingredientes', 'index')->name('restaurante.ingredients.index');
                Route::post('/ingredientes', 'store')->name('restaurante.ingredients.store');
                Route::put('/ingredientes/{ingredient}', 'update')->name('restaurante.ingredients.update');
                Route::delete('/ingredientes/{ingredient}', 'destroy')->name('restaurante.ingredients.destroy');
            });

            Route::controller(CouponsController::class)->group(function () {
                Route::get('/cupones', 'index')->name('restaurante.coupons.index');
                Route::post('/cupones', 'store')->name('restaurante.coupons.store');
                Route::put('/cupones/{coupon}', 'update')->name('restaurante.coupons.update');
                Route::delete('/cupones/{coupon}', 'destroy')->name('restaurante.coupons.destroy');
            });

            Route::controller(RestaurantCategoriesController::class)->group(function () {
                Route::get('/categorias', 'index')->name('restaurante.categories.index');
                Route::post('/categorias', 'store')->name('restaurante.categories.store');
                Route::put('/categorias/{category}', 'update')->name('restaurante.categories.update');
                Route::delete('/categorias/{category}', 'destroy')->name('restaurante.categories.destroy');
            });

            Route::inertia('/menu', 'RestaurantViews/MenuStore')->name('restaurante.menu.index');
        }));

        /**
         * RUTAS ROL CLIENTE
         */
        Route::middleware([CheckRole::class . ':customer'])->prefix('/cliente')->group((function () {
            Route::inertia('/dashboard', 'CustomerViews/Dashboard')->name('cliente.dashboard');

            Route::controller(CustomerRestaurantController::class)->group(function () {
                Route::get('/restaurante/{restaurant}', 'index')->name('cliente.restaurant.index');
                Route::post('/restaurante/{restaurant}', 'store')->name('cliente.restaurant.store');
                Route::inertia('/orders', 'CustomerViews/OrdersPage')->name('cliente.orders.index');
            });

        }));

        /**
         * RUTAS ROL REPARTIDOR
         */
        Route::middleware([CheckRole::class . ':driver'])->prefix('/repartidor')->group((function () {
            Route::inertia('/dashboard', 'DriverViews/Dashboard')->name('driver.dashboard');
        }));
    });


    require __DIR__ . '/auth.php';
