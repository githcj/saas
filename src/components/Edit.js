import React, { Component } from "react";
import {
  Modal,
  Popconfirm,
  message,
  Switch,
  Table,
  DatePicker,
  Select,
  Input,
} from "antd";
const { TextArea } = Input;

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: "",
      visible: false,
      confirmLoading: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      message.success("修改成功");
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
    message.error("修改失败");
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <a onClick={this.showModal}>编辑</a>
        <Modal
          title="职位编辑"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div>
            <div for="znmc">
              <label id="znmc">职位名称</label>
              <Input />
            </div>
            <div style={{ margin: '24px 0' }} />
            <div className='Eidt'>
              <label for="zhineng">职能描述</label>
              <TextArea id='zhineng' placeholder="职能描述" autoSize />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
