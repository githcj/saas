import React, { Component, useState } from "react";
import { Form, Modal, message, Input, Switch, Table, Select } from "antd";
import ConTitle from "../../components/ConTitle";
import { UnorderedListOutlined } from "@ant-design/icons";
import "../../assets/css/viewSetting/Department.css";
import axios from "../../plugins/axios";
import Delete from "../../components/Delete";

const { Option } = Select;
const { TextArea } = Input;

const data = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		dep_name: `Edward King ${i}`,
		dep_describe: "无描述",
		emp_num: `${i}`,
		dep_addtime: "2020-12-6",
	});
}

export default class Warehouse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: [{}],
			visible: false,
			confirmLoading: false,
		};
	}

	async componentDidMount() {
		const { data: res } = await axios.post("/depManagement", {
			limit: 5,
			page: 1,
		});
		console.log(res);
	}

	handleChange = () => { };

	toAddware = () => {
		this.props.his.push({
			pathname: this.props.msg + "/AddWare",
			params: { aa: 123 },
		});
	};

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = () => {
		this.setState({
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

		const onFinish = (values) => {
			console.log("Success:", values);
		};

		const onFinishFailed = (errorInfo) => {
			console.log("Failed:", errorInfo);
		};

		const columns = [
			{
				title: "仓库名称",
				dataIndex: "dep_name",
			},
			{
				title: "仓库类型",
				dataIndex: "dep_describe",
			},
			{
				title: "仓库地址",
				dataIndex: "dep_describe",
			},
			{
				title: "负责人",
				dataIndex: "dep_describe",
			},
			{
				title: "联系电话",
				dataIndex: "emp_num",
			},
			{
				title: "跟车司机",
				dataIndex: "dep_addtime",
			},
			{
				title: "是否启用",
				dataIndex: "axios",
				render: () => <Switch defaultChecked />,
			},
			{
				title: "操作",
				dataIndex: "axios",
				render: () => (
					<div className="caozuoPart">
						<a onClick={this.showModal}>编辑</a>

						<Delete />
					</div>
				),
			},
		];
		const layout = {
			labelCol: {
				span: 8,
			},
			wrapperCol: {
				span: 16,
			},
		};
		return (
			<div className="stockOut">
				<header>
					<div className="stockout-top">
						<ConTitle titleName="仓库管理" />
					</div>
				</header>
				<div className="dynamic-dataList">
					<div className="dynamic-left-title">
						<UnorderedListOutlined style={{ fontSize: "20px" }} />
						<span style={{ fontSize: "14px" }}>数据列表</span>
					</div>
					<div className="purchase-table-se2">
						<div onClick={this.toAddware} className="addDiv">
							添加
            </div>
						<Select
							defaultValue="显示条数"
							style={{ width: 120 }}
							onChange={this.handleChange}
						>
							<Option value="15">10条/页</Option>
							<Option value="20">15条/页</Option>
						</Select>
						<Select
							defaultValue="排序方式"
							className="seen"
							style={{ width: 120 }}
							onChange={this.handleChange}
						>
							<Option value="15">编号递增</Option>
							<Option value="20">编号递减</Option>
						</Select>
					</div>
				</div>
				{/* 模态框 */}
				<Modal
					title="仓库编辑"
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					bodyStyle={{ height: '25vw' }}
				>
					<div className='modal-item'>
						<Form
							style={{ width: '100%' }}
							{...layout}
							name="basic"
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
						>
							<Form.Item
								label="仓库名称"
								name="仓库名称"
								rules={[
									{
										required: true,
										message: "仓库名不能为空",
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="仓库类型"
								name="仓库类型"
								rules={[
									{
										required: true,
										message: "类型不能为空",
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="负责人"
								name="负责人"
								rules={[
									{
										required: true,
										message: "请选择负责人",
									},
								]}
							>
								<Select defaultValue="lucy" style={{ width: 120 }}>
									<Option value="jack">Jack</Option>
									<Option value="lucy">Lucy</Option>
								</Select>
							</Form.Item>

							<Form.Item
								label="联系电话"
								name="联系电话"
								rules={[
									{
										required: true,
										message: "电话不能为空",
									}
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="仓库地址"
								name="仓库地址"
								rules={[
									{
										required: true,
										message: "地址不能为空",
									}
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="跟车司机"
								name="跟车司机"
								rules={[
									{
										required: true,
										message: "请选择跟车司机",
									},
								]}
							>
								<Select defaultValue="lucy" style={{ width: 120 }}>
									<Option value="jack">Jack</Option>
									<Option value="lucy">Lucy</Option>
								</Select>
							</Form.Item>
						</Form>
					</div>
				</Modal>

				<div className="table">
					<Table dataSource={data} columns={columns} bordered />
				</div>
			</div>
		);
	}
}
