import React, { useEffect, useState } from 'react';
import { Layout, Menu, Row, Col, Select, Slider, Card, Rate, Button, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Destination } from '@/types/KeHoachDuLich/index';
import './style.css';

const { Header, Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const TrangChu = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [maxCost, setMaxCost] = useState<number>(10000000); // 10 triệu
  const [minRating, setMinRating] = useState<number>(0);

  // Lấy dữ liệu từ localStorage
  useEffect(() => {
    const storedDestinations = localStorage.getItem('destinations');
    if (storedDestinations) {
      const parsedDestinations: Destination[] = JSON.parse(storedDestinations);
      setDestinations(parsedDestinations);
      setFilteredDestinations(parsedDestinations);
    }
  }, []);


  // Lọc dữ liệu khi thay đổi bộ lọc
  useEffect(() => {
    const filtered = destinations.filter((dest) => {
      const totalCost =
        (dest.costAccommodation ?? 0) +
        (dest.costEating ?? 0) +
        (dest.costTransport ?? 0);
      return (
        (!category || dest.category === category) &&
        totalCost <= maxCost &&
        dest.rating >= minRating
      );
    });

    setFilteredDestinations(filtered);
  }, [category, maxCost, minRating, destinations]);

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Trang chủ</Menu.Item>
          <Menu.Item key="2">Lịch trình của tôi</Menu.Item>
          <Menu.Item key="3">Liên hệ</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '24px' }}>
        <Title level={2}>Khám phá điểm đến</Title>

        {/* Bộ lọc */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={8}>
            <Text strong>Loại hình:</Text>
            <Select
              style={{ width: '100%' }}
              placeholder="Chọn loại hình"
              value={category}
              onChange={setCategory}
              allowClear
            >
              <Option value="biển">Biển</Option>
              <Option value="núi">Núi</Option>
              <Option value="thành phố">Thành phố</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Text strong>Giá tối đa:</Text>
            <Slider
              min={0}
              max={10000000}
              step={500000}
              value={maxCost}
              onChange={setMaxCost}
              tipFormatter={(v: number | undefined) => `${v?.toLocaleString()} đ`}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Text strong>Đánh giá tối thiểu:</Text>
            <Select
              style={{ width: '100%' }}
              placeholder="Chọn đánh giá"
              value={minRating}
              onChange={setMinRating}
            >
              <Option value={0}>Tất cả</Option>
              <Option value={3}>3⭐</Option>
              <Option value={4}>4⭐</Option>
              <Option value={5}>5⭐</Option>
            </Select>
          </Col>
        </Row>

        {/* Danh sách điểm đến */}
        <Row gutter={[16, 16]}>
          {filteredDestinations.map((dest: Destination) => (
            <Col key={dest.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    src={dest.imageUrl || 'https://via.placeholder.com/400x250'}
                    alt={dest.name}
                    className="card-image"
                  />
                }
              >
                <Title level={5}>{dest.name}</Title>
                <p><EnvironmentOutlined /> {dest.location || 'Chưa xác định'}</p>
                <Rate disabled value={dest.rating} />
                <div style={{ marginTop: 12, textAlign: 'right' }}>
                  <Button type="primary">Thêm vào lịch trình</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default TrangChu;
