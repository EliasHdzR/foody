<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\Customer;
use App\Models\User;
use Inertia\Inertia;

class CustomersController extends Controller
{
    public function index() {
        $customers = Customer::with('user:id,name')->orderBy('id')->get();
        return Inertia::render('AdminViews/Customers/Index', [
            'customers' => $customers->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'user_name' => $customer->user->name,
                ];
            }),
        ]);
    }
    
    public function destroy(Customer $customer) {   
        $user = $customer->user;
    
        if ($user) {
            $user->delete();
        }
    }
}
