<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BalasanPermohonan extends Model
{
    use HasFactory;

    protected $fillable = [
        'acc',
        'filepath_surat',
        'penempatan_id',
        'author_id',
        'acced_by_id',
    ];

    public function penempatan(): BelongsTo
    {
        return $this->belongsTo(Penempatan::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function accedBy(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
