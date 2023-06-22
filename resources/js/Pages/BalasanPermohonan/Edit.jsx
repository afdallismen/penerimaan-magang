import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Form, Button, Select, Switch, Upload } from 'antd';
import { SwapLeftOutlined, UploadOutlined } from '@ant-design/icons';

const BalasanPermohonanEdit = ({ auth, balasanPermohonan, penempatanChoices, authorChoices, accedByChoices, csrf  }) => {
  console.log({
    penempatanChoices,
    authorChoices,
    accedByChoices,
  });
  const [form] = Form.useForm();

  const handleFormFinish = async (values) => {
    try {
      await axios.post(route('balasan-permohonan.update', { balasanPermohonan: balasanPermohonan.id }), {
        ...values,
        filepath_surat: values.file ? values.file.file.response : values.filepath_surat
      }, { headers: { 'X-CSRF-TOKEN': csrf }, withCredentials: true });
      window.location.href = '/balasan-permohonan';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Edit Balasan Permohonan #${balasanPermohonan.id}`}</h2>}
    >
      <Head title={`Edit Balasan Permohonan #${balasanPermohonan.id}`} />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex flex-row justify-end">
              <Button
                type="link"
                href={route('balasan-permohonan.index')}
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
              initialValues={balasanPermohonan}
              onFinish={handleFormFinish}
            >
              <Form.Item
                label="Penempatan"
                name="penempatan_id"
              >
                <Select
                  options={penempatanChoices.map(({ id }) => ({ value: id, label: `Penempatan ${id}` }))}
                />
              </Form.Item>
              <Form.Item
                label="Acc"
                name="acc"
              >
                <Switch defaultChecked={!!balasanPermohonan.acc}/>
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
              <Form.Item
                label="Surat Balasan Permohonan"
                name="filepath_surat"
              >
                <Upload
                  maxCount={1}
                  name="file"
                  action={route('balasan-permohonan.upload')}
                  headers={{
                    'X-CSRF-TOKEN': csrf
                  }}
                  defaultFileList={balasanPermohonan.filepath_surat && [
                    {
                      name: balasanPermohonan.filepath_surat.split('/').reverse()[0],
                      status: 'done',
                      url: `http://localhost:8000${balasanPermohonan.filepath_surat}`
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

export default BalasanPermohonanEdit
