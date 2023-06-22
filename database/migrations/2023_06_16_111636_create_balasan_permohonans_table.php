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
        Schema::create('balasan_permohonans', function (Blueprint $table) {
            $table->id();
            $table->boolean('acc');
            $table->string('filepath_surat');
            $table->unsignedBigInteger('penempatan_id');
            $table->foreign('penempatan_id')->references('id')->on('penempatans');
            $table->unsignedBigInteger('author_id');
            $table->foreign('author_id')->references('id')->on('users');
            $table->unsignedBigInteger('acced_by_id');
            $table->foreign('acced_by_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balasan_permohonans');
    }
};
