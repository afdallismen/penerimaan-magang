<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Penempatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'acc',
        'bagian',
        'tanggal_mulai',
        'tanggal_berakhir',
        'permohonan_id',
        'author_id',
        'acced_by_id',
    ];

    public function permohonan(): BelongsTo
    {
        return $this->belongsTo(Permohonan::class);
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
