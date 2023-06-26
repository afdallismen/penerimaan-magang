import { Table, Button, Space } from 'antd';
import { DownloadOutlined, PlusOutlined, EditOutlined, ExportOutlined, DeleteOutlined, FilePdfOutlined, CheckOutlined, MinusOutlined } from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

const BalasanPermohonan = ({ auth, balasanPermohonans }) => {
  const columnBalasanPermohonan = [
    {
      title: 'Penempatan',
      dataIndex: ['penempatan_id'],
      render: (penempatan_id) => (
        <Button
          type="link"
          size="small"
          onClick={() => router.get(route('penempatan.show', { penempatan: penempatan_id }))}
          style={{
            padding: 0
          }}
        >
          Penempatan #{penempatan_id}
        </Button>
      )
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
      render: (filepath_surat, { id }) => (
        <Space>
          <Button
            shape="circle"
            onClick={() => router.get(route('balasan-permohonan.show', { balasanPermohonan: id }))}
            icon={<ExportOutlined />}
          />
          <Button
            shape="circle"
            onClick={() => router.get(route('balasan-permohonan.edit', { balasanPermohonan: id }))}
            icon={<EditOutlined />}
          />
          <Button
            shape="circle"
            onClick={() => router.get(route('balasan-permohonan.delete', { balasanPermohonan: id }))}
            icon={<DeleteOutlined />}
          />
          <Button
            shape="circle"
            href={filepath_surat}
            icon={<FilePdfOutlined />}
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Balasan Permohonan</h2>
          <Space>
            <Button
              type="primary"
              size="small"
              icon={<DownloadOutlined />}
              href={route('balasan-permohonan.report')}
            >
              Download Laporan
            </Button>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              href={route('balasan-permohonan.new')}
            >
              Tambah Balasan Permohonan
            </Button>
          </Space>
        </div>
      }
    >
      <Head title="Balasan Permohonan" />
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <Table
            rowKey="id"
            dataSource={balasanPermohonans}
            columns={columnBalasanPermohonan}
            pagination={{ pageSize: 5 }}
            bordered
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default BalasanPermohonan
