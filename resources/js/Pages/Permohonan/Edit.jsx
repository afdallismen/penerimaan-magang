import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Form, Input, Button, Select, Upload } from 'antd';
import { SwapLeftOutlined, UploadOutlined } from '@ant-design/icons';

const PermohonanEdit = ({ auth, permohonan, pemohonChoices }) => {
  const [form] = Form.useForm();
  const permohonanForm = useForm(permohonan);

  const handleFormFinish = async () => {
    permohonanForm.post(route('permohonan.update', { permohonan: permohonan.id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Edit Permohonan #${permohonan.id}`}</h2>}
    >
      <Head title={`Edit Permohonan #${permohonan.id}`} />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex flex-row justify-end">
              <Button
                type="link"
                onClick={() => router.get(route('permohonan.index'))}
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
              initialValues={permohonan}
              onFinish={handleFormFinish}
              requiredMark
            >
              <Form.Item
                label="Pemohon"
                name="pemohon_id"
                rules={[{ required: true }]}
                validateStatus={permohonanForm.errors.pemohon_id ? 'error' : ''}
                help={permohonanForm.errors.pemohon_id}
              >
                <Select
                  options={pemohonChoices.map(({ id, name }) => ({ value: id, label: name }))}
                  onChange={(value) => permohonanForm.setData('pemohon_id', value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Universitas"
                name="universitas"
                rules={[{ required: true }]}
                validateStatus={permohonanForm.errors.universitas ? 'error' : ''}
                help={permohonanForm.errors.universitas}
              >
                <Input
                  onChange={(e) => permohonanForm.setData('universitas', e.target.value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Jurusan"
                name="jurusan"
                rules={[{ required: true }]}
                validateStatus={permohonanForm.errors.jurusan ? 'error' : ''}
                help={permohonanForm.errors.jurusan}
              >
                <Input
                  onChange={(e) => permohonanForm.setData('jurusan', e.target.value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Surat Permohonan"
                name="file"
                validateStatus={permohonanForm.errors.filepath_surat ? 'error' : ''}
                help={permohonanForm.errors.filepath_surat}
              >
                <Upload
                  maxCount={1}
                  name="file"
                  action={route('permohonan.upload')}
                  onChange={({ file }) => permohonanForm.setData('filepath_surat', file?.response || null)}
                  defaultFileList={permohonan.filepath_surat && [
                    {
                      name: permohonan.filepath_surat.split('/').reverse()[0],
                      status: 'done',
                      url: `http://localhost:8000${permohonan.filepath_surat}`
                    }
                  ]}
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

export default PermohonanEdit
