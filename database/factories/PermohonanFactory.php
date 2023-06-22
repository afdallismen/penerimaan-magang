<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Permohonan>
 */
class PermohonanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pemohon_id' => User::factory()->create()->id,
            'universitas' => fake()->randomElement(['UNAND', 'STTIND', 'UNP']),
            'jurusan' => fake()->randomElement(['Sistem Informasi', 'Hukum', 'Bahasa Indonesia']),
            'filepath_surat' => '/storage/'.uniqid().'.pdf',
        ];
    }
}
