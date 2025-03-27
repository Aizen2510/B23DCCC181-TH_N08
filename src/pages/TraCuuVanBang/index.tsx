import React from 'react'
import FormTra from './FormTra'
import { Button, Modal,orm,Input, Space  } from 'antd'
import { useModel } from 'umi'
import { useState } from 'react'
import { useEffect } from 'react'
import { AudioOutlined } from '@ant-design/icons';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
const index = () => {
    return (
        <Space direction="vertical">
            <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            />
        </Space>
    )
}

export default index