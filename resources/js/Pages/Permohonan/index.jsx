import { Table, Button, Space } from 'antd';
import { PlusOutlined, FilePdfOutlined, EditOutlined, ExportOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Permohonan = ({ auth, permohonans }) => {
  const columnPermohonan = [
    {
      title: 'Pemohon',
      dataIndex: ['pemohon', 'name'],
      render: (name) => (
        <Button
          type="link"
          size="small"
          href={name}
          style={{ padding: 0 }}
        >
          {name}
        </Button>
      )
    },
    {
      title: 'Universitas',
      dataIndex: 'universitas',
    },
    {
      title: 'Jurusan',
      dataIndex: 'jurusan',
    },
    {
      title: 'Aksi',
      dataIndex: 'filepath_surat',
      align: 'center',
      render: (filepath_surat, { id }) => (
        <Space>
          <Button
            shape="circle"
            href={route('permohonan.show', { permohonan: id })}
            icon={<ExportOutlined />}
          />
          <Button
            shape="circle"
            href={route('permohonan.edit', { permohonan: id })}
            icon={<EditOutlined />}
          />
          <Button
            shape="circle"
            href={route('permohonan.delete', { permohonan: id })}
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Permohonan</h2>
          <Space>
            <Button
              type="primary"
              size="small"
              icon={<DownloadOutlined />}
              href={route('permohonan.report')}
            >
              Download Laporan
            </Button>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              href={route('permohonan.new')}
            >
              Tambah Permohonan
            </Button>
          </Space>
        </div>
      }
    >
      <Head title="Permohonan" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <Table
            rowKey="id"
            dataSource={permohonans}
            columns={columnPermohonan}
            pagination={{ pageSize: 5 }}
            bordered
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Permohonan
