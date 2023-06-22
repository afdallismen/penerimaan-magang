import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';

const PenempatanNew = ({ auth, permohonanChoices, authorChoices, accedByChoices, csrf }) => {
  const [form] = Form.useForm();

  const handleFormFinish = async (values) => {
    try {
      await axios.post(
        route('penempatan.store'),
        values,
        { headers: { 'X-CSRF-TOKEN': csrf },
        withCredentials: true }
      );
      window.location.href = '/penempatan';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Penempatan Baru</h2>}
    >
      <Head title="Buat Penempatan Baru" />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex flex-row justify-end">
              <Button
                type="link"
                href={route('penempatan.index')}
                size="small"
                icon={<SwapLeftOutlined />}
              >
                Kembali
              </Button>
            </div>
            <Form
              form={form}
              layout="vertical"
              className="w-96"
              onFinish={handleFormFinish}
            >
              <Form.Item
                label="Permohonan"
                name="permohonan_id"
              >
                <Select
                  options={permohonanChoices.map(({ id }) => ({ value: id, label: `Permohonan ${id}` }))}
                />
              </Form.Item>
              <Form.Item
                label="Bagian"
                name="bagian"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tanggal Mulai"
                name="tanggal_mulai"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Tanggal Berakhir"
                name="tanggal_berakhir"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Dibuat oleh"
                name="author_id"
              >
                <Select
                  options={authorChoices.map(({ id, name }) => ({ value: id, label: name }))}
                />
              </Form.Item>
              <Form.Item
                label="Diacc oleh"
                name="acced_by_id"
              >
                <Select
                  options={accedByChoices.map(({ id, name }) => ({ value: id, label: name }))}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
};

export default PenempatanNew
