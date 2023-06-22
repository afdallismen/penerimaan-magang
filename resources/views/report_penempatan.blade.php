<?php
    setlocale(LC_ALL, 'id-ID', 'id_ID');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Permohonan</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="flex flex-col items-center">
        <h5 class="text-xl font-bold dark:text-white pt-4">LAPORAN PENEMPATAN MAGANG</h5>
        <h5 class="text-xl font-bold dark:text-white">DINAS BINA MARGA CIPTA KARYA DAN TATA RUANG</h5>
        <h5 class="text-xl font-bold dark:text-white mb-16">PROVINSI SUMATERA BARAT</h5>
        <table class="w-auto text-sm text-left">
            <thead class="text-xs uppercase">
                <tr>
                    <th scope="col" class="text-center px-3 py-2 border border-black">
                        No.
                    </th>
                    <th scope="col" class="text-center px-6 py-2 border border-black">
                        Pemohon
                    </th>
                    <th scope="col" class="text-center px-6 py-2 border border-black">
                        Bagian
                    </th>
                    <th scope="col" class="text-center px-6 py-2 border border-black">
                        Tanggal Mulai
                    </th>
                    <th scope="col" class="text-center px-6 py-2 border border-black">
                        Tanggal Berakhir
                    </th>
                    <th scope="col" class="text-center px-6 py-2 border border-black">
                        Dibuat oleh
                    </th>
                    <th scope="col" class="text-center px-6 py-2 border border-black">
                        Diacc oleh
                    </th>
                </tr>
            </thead>
            <tbody>
            @foreach ($penempatans as $penempatan)
                <tr>
                    <td class="text-center px-3 py-2 border border-black">
                        {{ ($loop->index) + 1 }}
                    </td>
                    <td class="px-3 py-2 border border-black">
                        {{ $penempatan['permohonan']['pemohon']['name'] }}
                    </td>
                    <td class="px-3 py-2 border border-black">
                        {{ $penempatan['bagian'] }}
                    </td>
                    <td class="px-3 py-2 border border-black">
                        {{ strftime("%d %B %Y", strtotime($penempatan['tanggal_mulai'])) }}
                    </td>
                    <td class="px-3 py-2 border border-black">
                        {{ strftime("%d %B %Y", strtotime($penempatan['tanggal_berakhir'])) }}
                    </td>
                    <td class="px-3 py-2 border border-black">
                        {{ $penempatan['author']['name'] }}
                    </td>
                    <td class="px-3 py-2 border border-black">
                        {{ $penempatan['acced_by']['name'] }}
                    </td>
                </tr>
            @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="pt-16">Padang, {{ strftime("%d %B %Y") }}</td>
                </tr>
                <tr>
                    <td class="py-8"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="font-bold underline pb-8">Kepala Dinas</td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>