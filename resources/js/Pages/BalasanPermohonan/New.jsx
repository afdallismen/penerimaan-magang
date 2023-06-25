import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Form, Button, Select, Upload, Switch } from 'antd';
import { SwapLeftOutlined, UploadOutlined } from '@ant-design/icons';

const BalasanPermohonanNew = ({ auth, penempatanChoices, authorChoices, accedByChoices, csrf  }) => {
  const [form] = Form.useForm();
  const balasanPermohonanForm = useForm({
    penempatan_id: null,
    acc: false,
    author_id: null,
    acced_by_id: null,
    filepath_surat: null,
  });

  const handleFormFinish = async (values) => {
    balasanPermohonanForm.post(route('balasan-permohonan.store'));
    try {
      await axios.post(route('balasan-permohonan.store'), {
        ...values,
        filepath_surat: values.file.file.response
      }, { headers: { 'X-CSRF-TOKEN': csrf }, withCredentials: true });
      window.location.href = '/balasan-permohonan';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Balasan Permohonan Baru</h2>}
    >
      <Head title="Buat Balasan Permohonan Baru" />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex flex-row justify-end">
              <Button
                type="link"
                onClick={() => router.get(route('balasan-permohonan.index'))}
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
              requiredMark
            >
              <Form.Item
                label="Penempatan"
                name="penempatan_id"
                rules={[{ required: true }]}
                validateStatus={balasanPermohonanForm.errors.penempatan_id ? 'error' : ''}
                help={balasanPermohonanForm.errors.penempatan_id}
              >
                <Select
                  options={penempatanChoices.map(({ id }) => ({ value: id, label: `Penempatan ${id}` }))}
                  onChange={(value) => balasanPermohonanForm.setData('penempatan_id', value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Acc"
                name="acc"
                rules={[{ required: true }]}
                validateStatus={balasanPermohonanForm.errors.acc ? 'error' : ''}
                help={balasanPermohonanForm.errors.acc}
              >
                <Switch onChange={(checked) => balasanPermohonanForm.setData('acc', checked)} />
              </Form.Item>
              <Form.Item
                label="Dibuat oleh"
                name="author_id"
                rules={[{ required: true }]}
                validateStatus={balasanPermohonanForm.errors.author_id ? 'error' : ''}
                help={balasanPermohonanForm.errors.author_id}
              >
                <Select
                  options={authorChoices.map(({ id, name }) => ({ value: id, label: name }))}
                  onChange={(value) => balasanPermohonanForm.setData('author_id', value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Diacc oleh"
                name="acced_by_id"
                rules={[{ required: true }]}
                validateStatus={balasanPermohonanForm.errors.acced_by_id ? 'error' : ''}
                help={balasanPermohonanForm.errors.acced_by_id}
              >
                <Select
                  options={accedByChoices.map(({ id, name }) => ({ value: id, label: name }))}
                  onChange={(value) => balasanPermohonanForm.setData('acced_by_id', value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Surat Balasan Permohonan"
                name="file"
                rules={[{ required: true }]}
                validateStatus={balasanPermohonanForm.errors.filepath_surat ? 'error' : ''}
                help={balasanPermohonanForm.errors.filepath_surat}
              >
                <Upload
                  maxCount={1}
                  name="file"
                  action={route('balasan-permohonan.upload')}
                  onChange={({ file }) => balasanPermohonanForm.setData('filepath_surat', file?.response || null)}
                  required
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

export default BalasanPermohonanNew
