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
        $customers = Customer::with('user:id,name,email,phone_number')->orderBy('id')->get();
        return Inertia::render('AdminViews/Customers/Index', [
            'customers' => $customers->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'user_name' => $customer->user->name,
                    'email' => $customer->user->email,
                    'phone_number' => $customer->user->phone_number
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
