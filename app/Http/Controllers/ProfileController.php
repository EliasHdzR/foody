<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Driver;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = User::with('restaurant','driver')->find(auth()->id());
        $categories = Category::orderBy('id')->get();
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'categories' => $categories,
            'user' => $user,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the restaurant's profile information.
     */
    public function updateRestaurant(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['required','string','max:10', 'min:10'],
            'city' => ['required','max:35'],
            'state' => ['required','max:35'],
            'address' => ['required','max:200'],
            'opening_time' => 'required',
            'close_time' => 'required',
            'category_id' => 'required',
        ]);

        $request->user()->fill($request->only(['phone_number']));
        $request->user()->save();

        $request->user()->restaurant->fill($request->only([
            'name','city', 'state', 'address', 'opening_time', 'close_time', 'category_id'
        ]));

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => ['mimes:png,jpg,jpeg', 'max:2048'],
            ]);
            if($request->user()->restaurant->image_url) {
                Storage::disk('public')->delete($request->user()->restaurant->image_url);
            }

            $path = $request->file('image')->store('restaurant_images', 'public');
            $request->user()->restaurant->image_url = $path;
        }

        $request->user()->restaurant->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the drivers' profile information.
     */
    public function updateDriver(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['string','max:10', 'min:10'],
            'shift_start' => 'required',
            'shift_end' => 'required',
        ]);

        $request->user()->fill($request->only(['phone_number','name']));
        $request->user()->save();

        $request->user()->driver->fill($request->only(['shift_start','shift_end']));
        $request->user()->driver->save();

        return Redirect::route('profile.edit');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Converts the user's role to driver.
     */
    public function toDriver(Request $request): RedirectResponse
    {
        $request->validate([
            'phone_number' => ['required','min:10','max:10'],
            'shift_start' => ['required'],
            'shift_end' => ['required'],
        ]);

        DB::beginTransaction();

        try {
            $user = User::findOrFail($request->user_id);
            $user->update([
                'phone_number' => $request->phone_number,
                'role' => "driver",
            ]);
            $user->save();

            $customer = Customer::where('user_id', $user->id)->first();

            $customer->delete();

            Driver::create([
                'user_id' => $user->id,
                'shift_start' => $request->shift_start,
                'shift_end' => $request->shift_end,
            ]);

            DB::commit();
            return Redirect::to('/');

        } catch (\Exception $e){
            DB::rollBack();
            return Redirect::route('profile.edit');
        }
    }

    /**
     * Converts the user's role to restaurant
     */
    public function toRestaurant(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'phone_number' => ['required','min:10','max:10'],
            'city' => ['required','max:35'],
            'state' => ['required','max:35'],
            'address' => ['required','max:200'],
            'opening_time' => 'required',
            'close_time' => 'required',
            'image' => ['sometimes','nullable','mimes:png,jpg,jpeg','max:2048'],
            'category_id' => 'required',
        ]);

        if($request->hasFile('image')){
            $image = $request->file('image');
            $image_url = $image->store('restaurant_images', ['disk' => 'public']);
        }

        DB::beginTransaction();
        try {
            $user = User::findOrFail($request->user_id);
            $user->update([
                'phone_number' => $request->phone_number,
                'role' => "restaurant",
            ]);
            $user->save();

            $customer = Customer::where('user_id', $user->id)->first();
            $customer->delete();

            Restaurant::create([
                'user_id' => $user->id,
                'category_id' => $request->category_id,
                'name' => $request->name,
                'image_url' => $image_url ?? null,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'opening_time' => $request->opening_time,
                'close_time' => $request->close_time,
            ]);

            DB::commit();
            return Redirect::to('/');

        } catch (\Exception $e){
            DB::rollBack();
            return Redirect::route('profile.edit');
        }
    }
}
