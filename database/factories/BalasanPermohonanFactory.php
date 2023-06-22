<?php

namespace Database\Factories;

use App\Models\Penempatan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BalasanPermohonan>
 */
class BalasanPermohonanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'filepath_surat' => '/storage/'.uniqid().'.pdf',
            'acc' => true,
            'penempatan_id' => Penempatan::where('acc', true)->get()->random(),
            'author_id' => User::where('role', 'sekretariat')->get()->random(),
            'acced_by_id' => User::where('role', 'sekretariat')->get()->random(),
        ];
    }
}
