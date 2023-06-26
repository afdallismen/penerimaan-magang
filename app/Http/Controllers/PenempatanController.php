<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Penempatan;
use App\Models\Permohonan;
use App\Models\User;
use App\Http\Requests\StorePenempatanRequest;
use App\Http\Requests\UpdatePenempatanRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Barryvdh\Snappy\Facades\SnappyPdf;

class PenempatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {   
        $penempatans = Penempatan::orderBy('updated_at', 'desc')
            ->with(['author', 'accedBy'])
            ->get();

        return Inertia::render('Penempatan/index', [
            'penempatans' => $penempatans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $permohonanChoices = Permohonan::all();
        $authorChoices = User::all();
        $accedByChoices = User::all();
        
        return Inertia::render('Penempatan/New', [
            'permohonanChoices' => $permohonanChoices,
            'authorChoices' => $authorChoices,
            'accedByChoices' => $accedByChoices,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePenempatanRequest $request): RedirectResponse
    {
        Penempatan::create($request->input());
        return Redirect::route('penempatan.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Penempatan $penempatan): Response
    {
        return Inertia::render('Penempatan/Show', [
            'penempatan' => $penempatan->load([
                'permohonan.pemohon',
                'author',
                'accedBy'
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penempatan $penempatan): Response
    {
        $permohonanChoices = Permohonan::with('pemohon')->get();
        $authorChoices = User::all();
        $accedByChoices = User::all();

        return Inertia::render('Penempatan/Edit', [
            'penempatan' => $penempatan->load([
                'permohonan.pemohon',
                'author',
                'accedBy',
            ]),
            'permohonanChoices' => $permohonanChoices,
            'authorChoices' => $authorChoices,
            'accedByChoices' => $accedByChoices,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdatePenempatanRequest $request,
        Penempatan $penempatan
    ): RedirectResponse
    {
        $penempatan->fill($request->input());
        $penempatan->save();
        return Redirect::route('penempatan.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penempatan $penempatan): RedirectResponse
    {
        $penempatan->delete();
        return Redirect::route('penempatan.index');
    }

    public function report()
    {
        $penempatans = Penempatan::where('acc', true)
            ->with([
                'permohonan.pemohon',
                'author',
                'accedBy'
            ])
            ->get()
            ->toArray();
        $pdf = SnappyPdf::loadView('report_penempatan', ['penempatans' => $penempatans]);
        return $pdf->download('laporan_penempatan_'.time().'.pdf');
        // return view('report_penempatan', ['penempatans' => $penempatans]);
    }
}
