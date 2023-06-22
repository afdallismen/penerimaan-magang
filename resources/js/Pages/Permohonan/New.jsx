import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Form, Input, Button, Select, Upload } from 'antd';
import { SwapLeftOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const PermohonanNew = ({ auth, pemohonChoices, csrf }) => {
  const [form] = Form.useForm();

  const handleFormFinish = async (values) => {
    try {
      await axios.post(route('permohonan.store'), {
        ...values,
        filepath_surat: values.file ? values.file.file.response : undefined
      }, { headers: { 'X-CSRF-TOKEN': csrf }, withCredentials: true });
      window.location.href = '/permohonan';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Permohonan Baru</h2>}
    >
      <Head title="Buat Permohonan Baru" />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex flex-row justify-end">
              <Button
                type="link"
                href={route('permohonan.index')}
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
                label="Pemohon"
                name="pemohon_id"
              >
                <Select
                  options={pemohonChoices.map(({ id, name }) => ({ value: id, label: name }))}
                />
              </Form.Item>
              <Form.Item
                label="Universitas"
                name="universitas"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Jurusan"
                name="jurusan"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Surat Permohonan"
                name="file"
              >
                <Upload
                  maxCount={1}
                  name="file"
                  action={route('permohonan.upload')}
                  headers={{
                    'X-CSRF-TOKEN': csrf
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
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

export default PermohonanNew
