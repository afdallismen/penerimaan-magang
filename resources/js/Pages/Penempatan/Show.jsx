import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { SwapLeftOutlined, CheckOutlined, MinusOutlined } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
import { Descriptions, Space, Button } from 'antd';

const dateFormat = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const PenempatanShow = ({ auth, penempatan }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Penempatan #${penempatan.id}`}</h2>}
    >
      <Head title={`Penempatan #${penempatan.id}`} />
      
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
                    href={route('penempatan.index')}
                    size="small"
                    icon={<SwapLeftOutlined />}
                  >
                    Kembali
                  </Button>
                }
                column={1}
                bordered
              >
                <Descriptions.Item label="Pemohon">{penempatan.permohonan.pemohon.name}</Descriptions.Item>
                <Descriptions.Item label="Universitas">{penempatan.permohonan.universitas}</Descriptions.Item>
                <Descriptions.Item label="Jurusan">{penempatan.permohonan.jurusan}</Descriptions.Item>
                <Descriptions.Item label="Surat Permohonan">
                  <Button
                    type="link"
                    size="small"
                    href={penempatan.permohonan.filepath_surat}
                    style={{
                      padding: 0
                    }}
                  >
                    Download Surat Permohonan
                  </Button>
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                title="Penempatan"
                column={1}
                bordered
              >
                <Descriptions.Item label="Acc">{penempatan.acc ? <CheckOutlined /> : <MinusOutlined />}</Descriptions.Item>
                <Descriptions.Item label="Bagian">{penempatan.bagian}</Descriptions.Item>
                <Descriptions.Item label="Tanggal Mulai">{new Intl.DateTimeFormat('id', dateFormat).format(new Date(penempatan.tanggal_mulai))}</Descriptions.Item>
                <Descriptions.Item label="Tanggal Berakhir">{new Intl.DateTimeFormat('id', dateFormat).format(new Date(penempatan.tanggal_berakhir))}</Descriptions.Item>
                <Descriptions.Item label="Dibuat oleh">{penempatan.author.name}</Descriptions.Item>
                <Descriptions.Item label="Diacc oleh">{penempatan.acced_by.name}</Descriptions.Item>
              </Descriptions>
            </Space>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
};

export default PenempatanShow
