<?php

namespace Database\Factories;

use App\Models\Permohonan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Penempatan>
 */
class PenempatanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bagian' => fake()->randomElement(['Sekretariat', 'Umum', 'Front Office']),
            'tanggal_mulai' => fake()->date(),
            'tanggal_berakhir' => fake()->date(),
            'acc' => true,
            'permohonan_id' => Permohonan::all()->random(),
            'author_id' => User::where('role', 'umum')->get()->random(),
            'acced_by_id' => User::where('role', 'sekretariat')->get()->random(),
        ];
    }
}
