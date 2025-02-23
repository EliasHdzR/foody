<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('address')->nullable()->after('user_id');
            $table->string('house_number')->nullable()->after('address');
            $table->string('suburb')->nullable()->after('house_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn('address');
            $table->dropColumn('house_number');
            $table->dropColumn('suburb');
        });
    }
};
