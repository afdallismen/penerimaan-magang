import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
import { Typography } from 'antd';

export default function Dashboard({ auth, permohonan, penempatan, balasanPermohonan }) {
    const isWithUmum = permohonan && !penempatan;
    const hasNoBalasanPermohonan = penempatan && !balasanPermohonan;
    const hasNotBeenAcced = balasanPermohonan && !balasanPermohonan.acc;
    const permohonanHasBeenAcced = balasanPermohonan && balasanPermohonan.acc;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 min-h-[240px]">
                            {isWithUmum ? (
                                <Typography.Text><InfoCircleTwoTone twoToneColor="#eb2f96"/> Permohonan anda sedang diproses oleh Bagin Umum.</Typography.Text>
                            ): (
                                <>{hasNoBalasanPermohonan ? (
                                    <Typography.Text>Balasan permohonan anda sedang dibuat oleh Sekretariat.</Typography.Text>
                                ) : (
                                    <>{hasNotBeenAcced ? (
                                        <Typography.Text>Balasan permohonan belum di Acc Kepala Dinas.</Typography.Text>
                                    ) : (
                                        <>{permohonanHasBeenAcced && (
                                            <Typography.Text>Permohonan anda telah di Acc. Surat balasan permohonan bisa anda download <a href={balasanPermohonan.filepath_surat}>disini</a>.</Typography.Text>
                                        )}
                                        </>
                                    )}
                                    </>
                                )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
