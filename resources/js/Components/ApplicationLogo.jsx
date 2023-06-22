import { Image, Space, Typography } from "antd";

export default function ApplicationLogo(props) {
    return (
        <Space>
            <Image
                width={20}
                src="http://localhost:8000/storage/logo-provinsi.png"
                preview={false}
            />
            <Typography.Title level={5}>Sistem Informasi Penerimaan Magang</Typography.Title>
        </Space>
        
    );
}
