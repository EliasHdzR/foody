<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    const ROLE_ADMIN = 'admin';
    const ROLE_CUSTOMER = 'customer';
    const ROLE_RESTAURANT = 'restaurant';
    const ROLE_DRIVER = 'driver';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone_number',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isCustomer(): bool{
        return $this->role === self::ROLE_CUSTOMER;
    }

    public function isRestaurant(): bool{
        return $this->role === self::ROLE_RESTAURANT;
    }

    public function isDriver(): bool{
        return $this->role === self::ROLE_DRIVER;
    }

    public function hasRole($role)
    {
        return $this->role === $role;
    }

    public function customer(): HasOne {
        return $this->hasOne(Customer::class);
    }

    public function restaurant(): HasOne {
        return $this->hasOne(Restaurant::class);
    }

    public function driver(): HasOne {
        return $this->hasOne(Driver::class);
    }
}
