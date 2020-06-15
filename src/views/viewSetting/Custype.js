// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/sales/order.css'
import { Table, Button,Modal,Select } from 'antd';
const { Option } = Select


export default class Custype extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            orderDate: '',
            orderList: [],
            fuji:'',
            username:'',
            addfuji:'',
            addusername:'',
            dates:'',
            eachPage:10,
            visible:false,
            bianji:[],
            tianjia:[],
            addmodels:false
        };
    }
    editfuji = async(v) => {
         await  this.setState({
              fuji:v
          })
    }

    editusername = async(v) => {
         await  this.setState({
              username:v
          })
    }

    addfuji = async(v) => {
        await  this.setState({
             addfuji:v
         })
   }

   addusername = async(v) => {
        await  this.setState({
             addusername:v
         })
   }

        showModal = (row) => {
		this.setState({
            bianji:row,  
            visible: true,
		});
       }
       addModal = () => {
        this.setState({
            addmodels: true,
        });
       
        axios({
            method: 'POST',
            url: 'http://172.16.6.27:8080/customer_type/add',
            data:{
                token:'123',
                
            }
        })
            .then(res => {
                this.setState({
                    orderList: res.data.data
                })
            })
            .catch(err => {
                console.log(err);
            })
       
     }
    
	handleOk = e => {
        console.log(e);
		this.setState({
              visible: false,
              addmodels:false
		});
	}
	handleCancel = e => {
		console.log(e);
		this.setState({
              visible: false,
              addmodels:false
		});
	}

    componentDidMount() {
        axios({
            method: 'POST',
            url: 'http://172.16.6.27:8080/customer_type/querysubclass',
            data:{
                token:'123'
            }
        })
            .then(res => {
                console.log(res,'res');
                
                this.setState({
                    orderList: res.data.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    setphone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    setsousuo = (e) => {
      this.setState({
          sousuo: e.target.value
      })
  }

  setdates = (e) => {
    this.setState({
        dates: e.target.value
    })
}

    // onSelectChange = selectedRowKeys => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     this.setState({ selectedRowKeys });
    // };
    render() {
        const { orderList, selectedRowKeys ,phone ,sousuo , dates,bianji } = this.state;

        const columns = [
            {
                title: '父类型',
                dataIndex: 'customer_type_father_name',
            },
            {
                title: '客户类型名称',
                dataIndex: 'customer_type_name',
            },
            {
                title: 'Axios',
                render: (text,row,index) => (
                  <span>
                       <a onClick={()=> this.showModal(row)}>编辑</a>
                       <a>删除</a>
                  </span>
                )
            },
        
        ];


        for (let i = 0; i < orderList.length; i++) {
            orderList[i].key = i
        }

        return (
            <div>
                <div className="top">
                    <div className="top-title">客户类型</div>
                </div>
           
                <div className="table">
                    <div style={{ marginBottom: 16 }}>
                        {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button> */}
                        {/* <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span> */}

                    </div>

                    <div className="quire-title ">
                        <div>数据列表</div>
                        <div className="chaxun" onClick={()=> this.addModal()}>添加</div>
                    </div>
                    <Table 
                    // rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={orderList}
                    bordered />
                     <Modal
						title="编辑"
						centered
						visible={this.state.visible}
						onOk={this.handleOk}
						okText='确定'
						okType='primary'
						cancelText='重置'
						onCancel={this.handleCancel}
						>
						<div className='modal-item'>
							<p>父级类型：</p>
							<Select defaultValue={bianji.useName} onChange={(value) => this.editfuji(value)}  style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
						<div className='modal-item'>
							<p>客户类型名称：</p>
							<Select defaultValue={bianji.Customer} onChange={(value) => this.editusername(value)} style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
					</Modal>
                   
                       <Modal
						title="新增"
						centered
						visible={this.state.addmodels}
						onOk={this.handleOk}
						okText='确定'
						okType='primary'
						cancelText='重置'
						onCancel={this.handleCancel}
						>
						<div className='modal-item'>
							<p>父级类型：</p>
							<Select defaultValue='' onChange={(value) => this.addfuji(value)} style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
						<div className='modal-item'>
							<p>客户类型名称：</p>
							<Select defaultValue='' onChange={(value) => this.addusername(value)} style={{ width: '60%' }}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="Yim">yim</Option>
							</Select>
						</div>
					</Modal>

                   
                </div>

            </div>
        )
    }
}
