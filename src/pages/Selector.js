import React from "react";
import { Select, Space } from "antd";

const Selector = ({ item, value, onChange, ...props }) => {
  const handleChange = (value) => {
    onChange(value); // 调用父组件传递的 onChange 函数，将选中的值传递给父组件
  };
  return (
    <Space wrap>
      <Select
        defaultValue={props.defaultValue}
        style={{
          width: 120,
        }}
        allowClear
        options={item}
        onChange={handleChange}
      />
    </Space>
  );
};
export default Selector;
