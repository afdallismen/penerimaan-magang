<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Permohonan;
use App\Models\Penempatan;
use App\Models\BalasanPermohonan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@email.com',
            'password' => 'admin',
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'umum',
            'email' => 'umum@email.com',
            'password' => 'umum',
            'role' => 'umum',
        ]);

        User::factory()->create([
            'name' => 'sekretariat',
            'email' => 'sekretariat@email.com',
            'password' => 'sekretariat',
            'role' => 'sekretariat',
        ]);

        Permohonan::factory(20)->create();
        Penempatan::factory(13)->create();
        BalasanPermohonan::factory(7)->create();
    }
}
