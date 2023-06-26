import { Table, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, ExportOutlined, DeleteOutlined, DownloadOutlined, CheckOutlined, MinusOutlined } from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

const dateFormat = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const Penempatan = ({ auth, penempatans }) => {
  const columnPenempatan = [
    {
      title: 'Permohonan',
      dataIndex: ['permohonan_id'],
      render: (permohonan_id) => (
        <Button
          type="link"
          size="small"
          onClick={() => router.get(route('permohonan.show', { permohonan: permohonan_id }))}
          style={{
            padding: 0
          }}
        >
          Permohonan #{permohonan_id}
        </Button>
      )
    },
    {
      title: 'Bagian',
      dataIndex: 'bagian',
    },
    {
      title: 'Tanggal Mulai',
      dataIndex: 'tanggal_mulai',
      render: (tanggal) => new Intl.DateTimeFormat('id', dateFormat).format(new Date(tanggal)),
    },
    {
      title: 'Tanggal Berakhir',
      dataIndex: 'tanggal_berakhir',
      render: (tanggal) => new Intl.DateTimeFormat('id', dateFormat).format(new Date(tanggal)),
    },
    {
      title: 'Acc',
      dataIndex: 'acc',
      align: 'center',
      render: (acc) => acc
        ? <CheckOutlined />
        : <MinusOutlined />
    },
    {
      title: 'Dibuat oleh',
      dataIndex: ['author', 'name'],
    },
    {
      title: 'Diacc oleh',
      dataIndex: ['acced_by', 'name'],
    },
    {
      title: 'Aksi',
      dataIndex: 'filepath_surat',
      align: 'center',
      render: (_, { id }) => (
        <Space>
          <Button
            shape="circle"
            onClick={() => router.get(route('penempatan.show', { id }))}
            icon={<ExportOutlined />}
          />
          <Button
            shape="circle"
            onClick={() => router.get(route('penempatan.edit', { id }))}
            icon={<EditOutlined />}
          />
          <Button
            shape="circle"
            onClick={() => router.get(route('penempatan.delete', { id }))}
            icon={<DeleteOutlined />}
          />
        </Space>
      )
    }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Penempatan</h2>
          <Space>
            <Button
              type="primary"
              size="small"
              icon={<DownloadOutlined />}
              href={route('penempatan.report')}
            >
              Download Laporan
            </Button>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => router.get(route('penempatan.new'))}
            >
              Tambah Penempatan
            </Button>
          </Space>
        </div>
      }
    >
      <Head title="Penempatan" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <Table
            rowKey="id"
            dataSource={penempatans}
            columns={columnPenempatan}
            pagination={{ pageSize: 5 }}
            bordered
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Penempatan
