// import React, { useState,useEffect } from 'react'
import React, { Component } from 'react'
import axios from '../../plugins/axios'
import '../../assets/css/sales/order.css'
import { Table, Button,Modal,Select ,message} from 'antd';
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
            addmodels:false,
            fujity:[],
            kehu:[],
            delvis: false,
            confirmLoading: false,
            delid:''
        };
    }
    editfuji = (v) => {
        console.log(v,'vvv');
       this.setState({
              fuji:v
          })

    }

    editusename = (e) => {
     
            const bianji=this.state.bianji
            bianji.customer_type_name=e.target.value
          this.setState({
              bianji:bianji
          }) 
    }

    addfuji = async(v) => {
        await  this.setState({
             addfuji:v
         })
   }

   addusename = (e) => {

      this.setState({
             addusername:e.target.value
         })
   }

        showModal = async(row) => {            
	    await	this.setState({
            bianji:row,  
            visible: true,
        });
        console.log(this.state.bianji,'bianji');
        
       }
       addModal = () => {
        this.setState({
            addmodels: true,
        });
       
     }
    
	handlebianjiOk = e => {
        console.log(this.state.fuji,'zzzzzzzzzz');
        const tokens= localStorage.getItem('token')
        console.log(e);
        axios({
            method: 'POST',
            url: '/customer_type/update',
            data:{
                token:tokens,
                 customer_type_id:this.state.bianji.customer_type_id,
                 customer_type_father_id:this.state.fuji,
                 customer_type_name:this.state.bianji.customer_type_name,

            }
        })
            .then(res => {
                // this.setState({
                //     orderList: res.data.data
                // })
                message.success(res.message)

                this.componentDidMount()
            })
            .catch(err => {
                console.log(err);
            })


		this.setState({
              visible: false,
              addmodels:false
        });
    }

    handlexinzenOk = e => {
        console.log(this.state.addfuji,'0000000');
        console.log(this.state.addusername,'0000000');
        const tokens= localStorage.getItem('token')
        console.log(e);
        axios({
            method: 'POST',
            url: '/customer_type/add',
            data:{
                token:tokens,
                customer_type_father_id:this.state.addfuji,
                customer_type_name:this.state.addusername
            }
        })
            .then(res => {
                // this.setState({
                //     orderList: res.data.data
                // })
                message.success(res.message)

                this.componentDidMount()
            })
            .catch(err => {
                console.log(err);
            })


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

   async componentDidMount() {
    const tokens= localStorage.getItem('token')
      await  axios({
            method: 'POST',
            url: '/customer_type/querysubclass',
            data:{
                token:tokens
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

            await  axios({
                method: 'POST',
                url: '/combobox/queryfather',
                data:{
                    token:tokens
                }
            })
                .then(res => {
                    console.log(res.data.data,'data');
                    
                    this.setState({
                        fujity: res.data.data
                    })
                    console.log(this.state.fujity,'fuji');
                    
                })
                .catch(err => {
                    console.log(err);
                })

            await  axios({
                method: 'POST',
                url: '/combobox/customer',
                data:{
                    token:tokens
                }
            })
                .then(res => {
                    this.setState({
                        kehu: res.data.data
                    })
                    console.log(this.state.kehu,'kehu');
                    
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

     dellist =(row)=>{

        this.setState({
            delvis: true,
          })
         const list = this.state.orderList.filter((v,i) => {
               return v.customer_type_id == row.customer_type_id
         })

         const id = list[0].customer_type_id

         this.setState({
            delid:id,
            delvis: true,
        })


          

     }


     delhandok =()=>{
        const tokens= localStorage.getItem('token')
        axios({
            method: 'POST',
            url: '/customer_type/delete',
            data:{
                token:tokens,
                customer_type_id:this.state.delid
            }
        })
            .then(res => {
                this.setState({
                    confirmLoading: true,
                })
                setTimeout(() => {
                    this.setState({
                      delvis: false,
                      confirmLoading: false,
                    });
                  }, 1000);
                console.log(res.message ,'成功');
                console.log(this,'this')
                this.componentDidMount() 
            })
            .catch(err => {
                console.log(err);
            })  
}

    // onSelectChange = selectedRowKeys => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     this.setState({ selectedRowKeys });
    // };
    render() {
        const { orderList, selectedRowKeys ,phone ,sousuo ,fuji, dates,bianji,fujity ,kehu,username,addusername} = this.state;

        console.log('fujity: ', fujity)
        const pre = fujity.map((item,index)=> (
            <Option value={item.customer_type_father_id }>
                 {item['customer_type_father_name '] }
           </Option>
         )) 
         console.log('pre: ', pre)

        // const kehutype= kehu.map((item,index)=> (
        //         <Option value={item.customer_type_id}>
        //             {item.customer_type_name }
        //         </Option>
        // )) 

        const columns = [
            {
                title: '父类型',
                align:'center',
                dataIndex: 'customer_type_father_name',
            },
            {
                title: '客户类型名称',
                align:'center',
                dataIndex: 'customer_type_name',
            },
            {
                title: 'Axios',
                align:'center',
                render: (text,row,index) => (
                  <span className="order-axios">
                       <a onClick={()=> this.showModal(row)}>编辑</a>
                       <a onClick={()=> this.dellist(row)}>删除</a>
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
						onOk={this.handlebianjiOk}
						okText='确定'
						okType='primary'
						cancelText='重置'
						onCancel={this.handleCancel}
						>
						<div className='modal-item'>
							<p>父级类型：</p>
							<Select defaultValue={bianji.customer_type_father_name} onChange={(value) => this.editfuji(value)}  style={{ width: '60%' }}>
								 {pre}
							</Select>
						</div>
						<div className='modal-item'>
							<p>客户类型名称：</p>
							<input value={bianji.customer_type_name} onChange={this.editusename} style={{ width: '60%' }}>
							</input>
						</div>
					</Modal>
                   
                       <Modal
						title="新增"
						centered
						visible={this.state.addmodels}
						onOk={this.handlexinzenOk}
						okText='确定'
						okType='primary'
						cancelText='重置'
						onCancel={this.handleCancel}
						>
						<div className='modal-item'>
							<p>父级类型：</p>
							<Select defaultValue='' onChange={(value) => this.addfuji(value)} style={{ width: '60%' }}>
								{pre}
							</Select>
						</div>
						<div className='modal-item'>
							<p>客户类型名称：</p>
							<input value={addusername} onChange={ this.addusename} style={{ width: '60%' }}>
							</input>
						</div>
					</Modal>


                   {/* 删除模态框 */}
                               <Modal
                                        title="Title"
                                        visible={this.state.delvis}
                                        onOk={this.delhandok}
                                        confirmLoading={this.state.confirmLoading}
                                        onCancel={this.handleCancel}
                                        >
                                           <p>是否确认删除</p>
                                        </Modal>

                   
                </div>

            </div>
        )
    }
}
