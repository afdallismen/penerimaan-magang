<?php

use App\Models\Permohonan;
use App\Models\Penempatan;
use App\Models\BalasanPermohonan;
use App\Http\Controllers\BalasanPermohonanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermohonanController;
use App\Http\Controllers\PenempatanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $permohonan = Permohonan::where('pemohon_id', Auth::id())->first();
    $penempatan = $permohonan ? Penempatan::where('permohonan_id', $permohonan->id)->first() : null;
    $balasanPermohonan = $penempatan ? BalasanPermohonan::where('penempatan_id', $penempatan->id)->first() : null;

    return Inertia::render('Dashboard', [
        'permohonan' => $permohonan,
        'penempatan' => $penempatan,
        'balasanPermohonan' => $balasanPermohonan,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/permohonan/upload', [PermohonanController::class, 'upload'])->name('permohonan.upload');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/permohonan', [PermohonanController::class, 'index'])->name('permohonan.index');
    Route::get('/permohonan/report', [PermohonanController::class, 'report'])->name('permohonan.report');
    Route::get('/permohonan/new', [PermohonanController::class, 'create'])->name('permohonan.new');
    Route::post('/permohonan/new', [PermohonanController::class, 'store'])->name('permohonan.store');
    Route::get('/permohonan/{permohonan}', [PermohonanController::class, 'show'])->name('permohonan.show');
    Route::get('/permohonan/{permohonan}/delete', [PermohonanController::class, 'destroy'])->name('permohonan.delete');
    Route::get('/permohonan/{permohonan}/edit', [PermohonanController::class, 'edit'])->name('permohonan.edit');
    Route::post('/permohonan/{permohonan}/edit', [PermohonanController::class, 'update'])->name('permohonan.update');

    Route::get('/penempatan', [PenempatanController::class, 'index'])->name('penempatan.index');
    Route::get('/penempatan/report', [PenempatanController::class, 'report'])->name('penempatan.report');
    Route::get('/penempatan/new', [PenempatanController::class, 'create'])->name('penempatan.new');
    Route::post('/penempatan/new', [PenempatanController::class, 'store'])->name('penempatan.store');
    Route::get('/penempatan/{penempatan}', [PenempatanController::class, 'show'])->name('penempatan.show');
    Route::get('/penempatan/{penempatan}/delete', [PenempatanController::class, 'destroy'])->name('penempatan.delete');
    Route::get('/penempatan/{penempatan}/edit', [PenempatanController::class, 'edit'])->name('penempatan.edit');
    Route::post('/penempatan/{penempatan}/edit', [PenempatanController::class, 'update'])->name('penempatan.update');

    Route::get('/balasan-permohonan', [BalasanPermohonanController::class, 'index'])->name('balasan-permohonan.index');
    Route::get('/balasan-permohonan/report', [BalasanPermohonanController::class, 'report'])->name('balasan-permohonan.report');
    Route::post('/balasan-permohonan/upload', [BalasanPermohonanController::class, 'upload'])->name('balasan-permohonan.upload');
    Route::get('/balasan-permohonan/new', [BalasanPermohonanController::class, 'create'])->name('balasan-permohonan.new');
    Route::post('/balasan-permohonan/new', [BalasanPermohonanController::class, 'store'])->name('balasan-permohonan.store');
    Route::get('/balasan-permohonan/{balasanPermohonan}', [BalasanPermohonanController::class, 'show'])->name('balasan-permohonan.show');
    Route::get('/balasan-permohonan/{balasanPermohonan}/delete', [BalasanPermohonanController::class, 'destroy'])->name('balasan-permohonan.delete');
    Route::get('/balasan-permohonan/{balasanPermohonan}/edit', [BalasanPermohonanController::class, 'edit'])->name('balasan-permohonan.edit');
    Route::post('/balasan-permohonan/{balasanPermohonan}/edit', [BalasanPermohonanController::class, 'update'])->name('balasan-permohonan.update');
});

require __DIR__.'/auth.php';
