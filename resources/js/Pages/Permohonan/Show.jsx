import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { SwapLeftOutlined } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
import { Descriptions, Space, Button } from 'antd';

const PermohonanShow = ({ auth, permohonan }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Permohonan #${permohonan.id}`}</h2>}
    >
      <Head title={`Permohonan #${permohonan.id}`} />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <Space
              direction="vertical"
              size="middle"
              className="w-full"
            >
              <Descriptions
                title="Permohonan"
                extra={
                  <Button
                    type="link"
                    href={route('permohonan.index')}
                    size="small"
                    icon={<SwapLeftOutlined />}
                  >
                    Kembali
                  </Button>
                }
                column={1}
                bordered
              >
                <Descriptions.Item label="Pemohon">{permohonan.pemohon.name}</Descriptions.Item>
                <Descriptions.Item label="Universitas">{permohonan.universitas}</Descriptions.Item>
                <Descriptions.Item label="Jurusan">{permohonan.jurusan}</Descriptions.Item>
                <Descriptions.Item label="Surat Permohonan">
                  <Button
                    type="link"
                    size="small"
                    href={permohonan.filepath_surat}
                    style={{ padding: 0 }}
                  >
                    Download Surat
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            </Space>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
};

export default PermohonanShow
