import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Form, Input, Button, Select, DatePicker, Switch } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const PenempatanEdit = ({ auth, penempatan, permohonanChoices, authorChoices, accedByChoices  }) => {
  const [form] = Form.useForm();
  const penempatanForm = useForm(penempatan);

  const handleFormFinish = async (values) => {
    penempatanForm.post(route('penempatan.update', { penempatan: penempatan.id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Edit Penempatan #${penempatan.id}`}</h2>}
    >
      <Head title={`Edit Penempatan #${penempatan.id}`} />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 drop-shadow-sm">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="flex flex-row justify-end">
              <Button
                type="link"
                onClick={() => router.get(route('penempatan.index'))}
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
              initialValues={{
                ...penempatan,
                tanggal_mulai: dayjs(penempatan.tanggal_mulai),
                tanggal_berakhir: dayjs(penempatan.tanggal_berakhir),
              }}
              onFinish={handleFormFinish}
              requiredMark
            >
              <Form.Item
                label="Permohonan"
                name="permohonan_id"
                rules={[{ required: true }]}
                validateStatus={penempatanForm.errors.permohonan_id ? 'error' : ''}
                help={penempatanForm.errors.permohonan_id}
              >
                <Select
                  options={permohonanChoices.map(({ id, pemohon }) => ({ value: id, label: pemohon.name }))}
                  onChange={(value) => penempatanForm.setData('permohonan_id', value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Bagian"
                name="bagian"
                rules={[{ required: true }]}
                validateStatus={penempatanForm.errors.bagian ? 'error' : ''}
                help={penempatanForm.errors.bagian}
              >
                <Input
                  onChange={(e) => penempatanForm.setData('bagian', e.target.value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Tanggal Mulai"
                name="tanggal_mulai"
                rules={[{ required: true }]}
                validateStatus={penempatanForm.errors.tanggal_mulai ? 'error' : ''}
                help={penempatanForm.errors.tanggal_mulai}
              >
                <DatePicker
                  onChange={(value) => penempatanForm.setData('tanggal_mulai', value.toDate())}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Tanggal Berakhir"
                name="tanggal_berakhir"
                rules={[{ required: true }]}
                validateStatus={penempatanForm.errors.tanggal_berakhir ? 'error' : ''}
                help={penempatanForm.errors.tanggal_berakhir}
              >
                <DatePicker
                  onChange={(value) => penempatanForm.setData('tanggal_berakhir', value.toDate())}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Acc"
                name="acc"
                rules={[{ required: true }]}
                validateStatus={penempatanForm.errors.acc ? 'error' : ''}
                help={penempatanForm.errors.acc}
              >
                <Switch
                  defaultChecked={!!penempatan.acc}
                  onChange={(checked) => penempatanForm.setData('acc', checked)}
                />
              </Form.Item>
              <Form.Item
                label="Dibuat oleh"
                name="author_id"
                rules={[{ required: true }]}
                validateStatus={penempatanForm.errors.author_id ? 'error' : ''}
                help={penempatanForm.errors.author_id}
              >
                <Select
                  options={authorChoices.map(({ id, name }) => ({ value: id, label: name }))}
                  onChange={(value) => penempatanForm.setData('author_id', value)}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Diacc oleh"
                name="acced_by_id"
                rules={[{ required: true }]}
                validateStatus={penempatanForm.errors.acced_by_id ? 'error' : ''}
                help={penempatanForm.errors.acced_by_id}
              >
                <Select
                  options={accedByChoices.map(({ id, name }) => ({ value: id, label: name }))}
                  onChange={(value) => penempatanForm.setData('acced_by_id', value)}
                  required
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

export default PenempatanEdit
