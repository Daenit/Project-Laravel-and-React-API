<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_checkouts_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCheckoutsTable extends Migration
{
    public function up()
    {
        // create_orders_table migration
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->boolean('sms_updates')->default(false);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax', 10, 2);
            $table->decimal('service_fee', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->string('status')->default('pending');
            $table->string('promo_code')->nullable();
            $table->timestamps();
        });

        // create_order_items_table migration
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });

        // create_promo_codes_table migration
        Schema::create('promo_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->decimal('discount', 10, 2);
            $table->string('type')->default('fixed');
            $table->date('valid_from');
            $table->date('valid_to');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('checkouts');
    }
}
