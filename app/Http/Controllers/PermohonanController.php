<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Permohonan;
use App\Models\User;
use App\Http\Requests\StorePermohonanRequest;
use App\Http\Requests\UpdatePermohonanRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Barryvdh\Snappy\Facades\SnappyPdf;

class PermohonanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {   
        $permohonans = Permohonan::orderBy('updated_at', 'desc')
            ->with('pemohon')
            ->get();

        return Inertia::render('Permohonan/index', [
            'permohonans' => $permohonans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $pemohonChoices = User::all();

        return Inertia::render('Permohonan/New', [
            'pemohonChoices' => $pemohonChoices,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermohonanRequest $request): RedirectResponse
    {
        Permohonan::create($request->input());
        return Redirect::route('permohonan.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Permohonan $permohonan):Response
    {
        return Inertia::render('Permohonan/Show', [
            'permohonan' => $permohonan->load('pemohon'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permohonan $permohonan): Response
    {
        $pemohonChoices = User::all();

        return Inertia::render('Permohonan/Edit', [
            'permohonan' => $permohonan->load('pemohon'),
            'pemohonChoices' => $pemohonChoices,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdatePermohonanRequest $request,
        Permohonan $permohonan
    )
    {
        $permohonan->fill($request->input());
        $permohonan->save();
        return Redirect::route('permohonan.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permohonan $permohonan): RedirectResponse
    {
        $permohonan->delete();
        return Redirect::route('permohonan.index');
    }

    public function upload(Request $request): string
    {
        $path = $request
            ->file('file')
            ->store('public/permohonan');
        return Storage::url($path);
    }

    public function report()
    {
        $permohonans = Permohonan::with('pemohon')->get()->toArray();
        $pdf = SnappyPdf::loadView('report_permohonan', ['permohonans' => $permohonans]);
        return $pdf->download('laporan_permohonan_'.time().'.pdf');
        // return view('report_permohonan', ['permohonans' => $permohonans]);
    }
}
