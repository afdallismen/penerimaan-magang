<?php

namespace App\Http\Controllers;

use App\Models\BalasanPermohonan;
use App\Models\Penempatan;
use App\Models\User;
use App\Http\Requests\StoreBalasanPermohonanRequest;
use App\Http\Requests\UpdateBalasanPermohonanRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class BalasanPermohonanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {   
        $balasanPermohonans = BalasanPermohonan::orderBy('updated_at', 'desc')
            ->with([
                'author',
                'accedBy',
                'penempatan.permohonan.pemohon',
                'penempatan.author',
                'penempatan.accedBy',
            ])
            ->get();

        return Inertia::render('BalasanPermohonan/index', [
            'balasanPermohonans' => $balasanPermohonans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $penempatanChoices = Penempatan::all();
        $authorChoices = User::all();
        $accedByChoices = User::all();
        $csrf = csrf_token();
        
        return Inertia::render('BalasanPermohonan/New', [
            'penempatanChoices' => $penempatanChoices,
            'authorChoices' => $authorChoices,
            'accedByChoices' => $accedByChoices,
            'csrf' => $csrf,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBalasanPermohonanRequest $request): RedirectResponse
    {
        BalasanPermohonan::create($request->input());
        return Redirect::route('balasan-permohonan.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(BalasanPermohonan $balasanPermohonan): Response
    {
        return Inertia::render('BalasanPermohonan/Show', [
            'balasanPermohonan' => $balasanPermohonan->load([
                'penempatan.permohonan.pemohon',
                'penempatan.author',
                'penempatan.accedBy',
                'author',
                'accedBy',
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BalasanPermohonan $balasanPermohonan): Response
    {
        $penempatanChoices = Penempatan::all();
        $authorChoices = User::all();
        $accedByChoices = User::all();
        $csrf = csrf_token();

        return Inertia::render('BalasanPermohonan/Edit', [
            'balasanPermohonan' => $balasanPermohonan->load([
                'penempatan.permohonan.pemohon',
                'author',
                'accedBy',
            ]),
            'penempatanChoices' => $penempatanChoices,
            'authorChoices' => $authorChoices,
            'accedByChoices' => $accedByChoices,
            'csrf' => $csrf,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateBalasanPermohonanRequest $request,
        BalasanPermohonan $balasanPermohonan
    ): RedirectResponse
    {
        $balasanPermohonan->fill($request->input());
        $balasanPermohonan->save();
        return Redirect::route('balasan-permohonan.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BalasanPermohoan $balasanPermohonan): RedirectResponse
    {
        $balasanPermohonan->delete();
        return Redirect::route('balasan-permohonan.index');
    }

    public function upload(Request $request): string
    {
        $path = $request
            ->file('file')
            ->store('public/balasan-permohonan');
        return Storage::url($path);
    }

    public function report()
    {
        $balasanPermohonans = BalasanPermohonan::where('acc', true)
            ->with([
                'penempatan.permohonan.pemohon',
                'penempatan',
                'author',
                'accedBy'
            ])
            ->get()
            ->toArray();
        // $pdf = PDF::loadView('report_balasan_permohonan', $balasanPermohonans);
        // return $pdf->download('laporan_balasan_permohonan_'.time().'.pdf');
        return view('report_balasan_permohonan', ['balasanPermohonans' => $balasanPermohonans]);
    }
}
