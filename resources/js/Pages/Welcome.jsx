import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Layout, Row, Col, Typography, Space, Image, Input, Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function Welcome({ auth }) {
  const [form] = Form.useForm();
  const loginForm = useForm({
    email: '',
    password: '',
  });
  const registerForm = useForm({
    name: '',
    email: '',
    password: '',
    universitas: '',
    jurusam: '',
    filepath_surat: undefined
  });
  const [authType, setAuthType] = useState('login');

  const handleSubmitLogin = async (values) => {
    loginForm.post(route('login'));
  };

  const handleSubmitRegister = async (values) => {
    registerForm.post(route('register'));
  };

  const handleClickSecondButton = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head title="Welcome" />
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: '100vh', width: '100%' }}
        gutter={80}
      >
        <Col
          span={12}
          style={{
            textAlign: 'right'
          }}
        >
          <Space size="middle">
            <Space
              direction="vertical"
              size={0}
            >
              <Typography.Title level={4} style={{ margin: 0 }}>Dinas</Typography.Title>
              <Typography.Title level={3} style={{ margin: 0 }}><b>Bina Marga Cipta Karya</b></Typography.Title>
              <Typography.Title level={3} style={{ margin: 0 }}><b>dan Tata Ruang</b></Typography.Title>
              <Typography.Title level={4} style={{ margin: 0 }}>Provinsi Sumatera Barat</Typography.Title>
            </Space>
            <Image
              width={100}
              src="http://localhost:8000/storage/logo-provinsi.png"
              preview={false}
            />
          </Space>
        </Col>
        <Col
          span={12}
          style={{
            borderLeft: '2px solid #ababab',
            paddingTop: 16,
            paddingBottom: 8,
          }}
        >
          <Space
            direction="vertical"
            size={0}
            style={{ marginBottom: 16, display: 'block' }}
          >
            <Typography.Text style={{ margin: 0 }} type="secondary" strong>Sistem Informasi</Typography.Text>
            <Typography.Text style={{ margin: 0 }} type="secondary" strong>Penerimaan Magang</Typography.Text>
          </Space>
          {auth.user ? (
            <Space>
              <Button
                type="primary"
                onClick={() => window.location.pathname = '/dashboard'}
              >
                Dashboard
              </Button>
            </Space>
          ) : (
            authType === 'login' ?
              <>
                {!!Object.values(loginForm.errors).length && <Typography.Text type="danger">Email atau password salah!</Typography.Text>}
                <Form
                  layout="vertical"
                  form={form}
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 10 }}
                  onFinish={handleSubmitLogin}
                  requiredMark
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    style={{ marginBottom: 8 }}
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="email"
                      onChange={(e) => loginForm.setData('email', e.target.value)}
                      required
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    style={{ marginBottom: 16 }}
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="password"
                      onChange={(e) => loginForm.setData('password', e.target.value)}
                      required
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: 12 }}
                    >
                      Masuk
                    </Button>
                    <Button
                      type="primary"
                      onClick={handleClickSecondButton}
                      danger
                    >
                      Daftar Magang
                    </Button>
                  </Form.Item>
                </Form>
              </>
              :
              <Form
                layout="horizontal"
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 10 }}
                onFinish={handleSubmitRegister}
                requiredMark
              >
                <Form.Item
                  label="Nama"
                  name="name"
                  style={{ marginBottom: 8 }}
                  rules={[{ required: true }]}
                  validateStatus={registerForm.errors.name ? 'error' : ''}
                  help={registerForm.errors.name}
                >
                  <Input
                    onChange={(e) => registerForm.setData('name', e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  style={{ marginBottom: 8 }}
                  rules={[{ required: true }]}
                  validateStatus={registerForm.errors.email ? 'error' : ''}
                  help={registerForm.errors.email}
                >
                  <Input
                    type="email"
                    onChange={(e) => registerForm.setData('email', e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  style={{ marginBottom: 8 }}
                  rules={[{ required: true }]}
                  validateStatus={registerForm.errors.password ? 'error' : ''}
                  help={registerForm.errors.password}
                >
                  <Input
                    type="password"
                    onChange={(e) => registerForm.setData('password', e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Universitas"
                  name="universitas"
                  style={{ marginBottom: 8 }}
                  rules={[{ required: true }]}
                  validateStatus={registerForm.errors.universitas ? 'error' : ''}
                  help={registerForm.errors.universitas}
                >
                  <Input
                    onChange={(e) => registerForm.setData('universitas', e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Jurusan"
                  name="jurusan"
                  style={{ marginBottom: 8 }}
                  rules={[{ required: true }]}
                  validateStatus={registerForm.errors.jurusan ? 'error' : ''}
                  help={registerForm.errors.jurusan}
                >
                  <Input
                    onChange={(e) => registerForm.setData('jurusan', e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Surat Permohonan"
                  name="file"
                  style={{ marginBottom: 16 }}
                  rules={[{ required: true }]}
                  validateStatus={registerForm.errors.filepath_surat ? 'error' : ''}
                  help={registerForm.errors.filepath_surat}
                >
                  <Upload
                    maxCount={1}
                    name="file"
                    action={route('permohonan.upload')}
                    onChange={({ file }) => registerForm.setData('filepath_surat', file?.response || undefined)}
                    required
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: 12 }}
                  >
                    Daftar
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleClickSecondButton}
                    danger
                  >
                    Masuk
                  </Button>
                </Form.Item>
              </Form>
          )}
        </Col>
      </Row>
    </Layout>
  );
}
