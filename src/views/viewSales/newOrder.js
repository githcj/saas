import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/sales/newOrder.css'
import { Table, Radio, Select, Input,Modal } from 'antd';
const { Option } = Select

export default class newOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            neworderDate: '',
            queryorder: [],
            adddata: [],
            big: 1,
            small: 1,
            sum: 0,
            car: [],
            kehutype:[],
            xiaoshoutype:[],
            persontype:[],
            cartype:[],
            orderdata:'',
            username:'',
            yewu:'',
            xiaoshou:'',
            cehngliang:'',
            goods:[],
            pingpai:[],
            fenlei2:[],
            soupingpai:'',
            soufenlei:'',
            delvis: false,
            confirmLoading: false,
            delid:'',
            souname:''
        };
    }


    soupinpai= (value)=>{
         this.setState({
             soupingpai:value
         })
    }

    soufenlei =(value)=>{
        this.setState({
            soufenlei:value
        })
    }


    souname =(e)=>{
        this.setState({
            souname:e.target.value
        })
    }
    sousuo =()=>{
        const tokens=localStorage.getItem('token')
        console.log(this.state.soufenlei,'新增分类');
        console.log(this.state.souname,'搜索name');
        
        axios({
            method: 'POST',
            url: 'http://172.16.6.29:8080/goods/queryGoodsList',
            data:{
                token:tokens,
                brand_name:this.state.soupingpai,
                commodity_level_name:this.state.soufenlei,
                goods_name:this.state.souname
            }
        })
            .then(res => {

                console.log(res.data,'query');
                
                this.setState({
                    queryorder: res.data,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    add = (record) => {

        var suma = 0;
        const newData = [...this.state.adddata]

        if (newData.length === 0) {
            newData.push(record)
            for (let i = 0; i < newData.length; i++) {
                newData[newData.length - 1].key = i;
                newData[newData.length - 1].smcount = 1;
                newData[newData.length - 1].bgcount = 1;
            }
        }
        else {
            let is = true
            for (let i = 0; i < newData.length; i++) {
                if (record.goods_name === newData[i].goods_name) {
                    is = !is
                    newData[i].bgcount = newData[i].bgcount + 1
                }
            }
            if (is) {
                newData.push(record)
                for (let i = 0; i < newData.length; i++) {
                    newData[newData.length - 1].key = i;
                    newData[newData.length - 1].smcount = 1;
                    newData[newData.length - 1].bgcount = 1;
                }
            }
        }
        for (var i = 0; i < newData.length; i++) {
            suma += newData[i].smcount * newData[i].single_price + newData[i].bgcount * newData[i].whole_price
        }

        this.setState({
            sum: suma,
            adddata: newData
        })
    }
    setDate =(e)=>{
          this.setState({
              orderdata:e.target.value
          })
    }

  async  componentDidMount() {
        const adddata = this.state.adddata
        const good=this.state.goods 
        const tokens=localStorage.getItem('token')
       await axios({
            method: 'POST',
            url: 'http://172.16.6.29:8080/goods/queryGoodsList',
            data:{
                token:tokens
            }
        })
            .then(res => {
                console.log(res.data,'query');
                
                this.setState({
                    queryorder: res.data,
                })
            })
            .catch(err => {
                console.log(err);
            })

    await  axios({
        method: 'POST',
        url: 'http://172.16.6.27:8080/combobox/customer',
    })
        .then(res => {
            this.setState({
                kehutype: res.data.data,
            })
            console.log(this.state.kehutype,'111');
            
        })
        .catch(err => {
            console.log(err);
        })

        await  axios({
            method: 'POST',
            url: 'http://172.16.6.27:8080/combobox/sales_method',
        })
            .then(res => {
                console.log(res.data.data,'销售类型');
                
                this.setState({
                    xiaoshoutype: res.data.data,
                })
                console.log(this.state.xiaoshoutype,'111');
                
            })
            .catch(err => {
                console.log(err);
            })
        await  axios({
            method: 'POST',
            url: 'http://172.16.6.27:8080/person/in_charge',
        })
            .then(res => {
                this.setState({
                    persontype: res.data.data,
                })
                console.log(this.state.persontype,'111');
                
            })
            .catch(err => {
                console.log(err);
            })

            await  axios({
                method: 'POST',
                url: 'http://172.16.6.29:8080/driver/queryVehicleList',
            })
                .then(res => {
                    this.setState({
                        cartype: res.data,
                    })
                    console.log(this.state.cartype,'111');
                    
                })
                .catch(err => {
                    console.log(err);
                })

                await  axios({
                    method: 'POST',
                    url: 'http://172.16.6.27:8080/combobox/brand',
                })
                    .then(res => {
                        console.log(res.data.data ,'平拍');
                        
                        this.setState({
                            pingpai: res.data.data,
                        })
                        console.log(this.state.persontype,'111');
                        
                    })
                    .catch(err => {
                        console.log(err);
                    })


                    await  axios({
                        method: 'POST',
                        url: 'http://172.16.6.27:8080/combobox/commodity_level',
                    })
                        .then(res => {
                            console.log(res.data.data ,'分类');
                            
                            this.setState({
                                fenlei2: res.data.data,
                            })
                            console.log(this.state.persontype,'111');
                            
                        })
                        .catch(err => {
                            console.log(err);
                        })


        var suma = 0;
        for (var i = 0; i < adddata.length; i++) {
            suma += adddata[i].smcount * adddata[i].single_price + adddata[i].bgcount * adddata[i].whole_price
        }

        
        
        this.setState({
            sum: suma,
            goods:good
        })
        console.log(this.state.goods,'goods');
        
        console.log(this.state.order,'order');
        


    }
    setvalue = (value) => {
        console.log(value)
        this.setState({
            username:value
        })
    }
    yewu =(value)=>{
        
        this.setState({
            yewu:value
        })
        
    }
    xiaoshou =(value)=>{
        this.setState({
            xiaoshou:value
        })
    }
    cheliang =(value)=>{
        this.setState({
            cheliang:value
        })
    }

    tijaio =()=>{
        console.log(this.state.adddata,'add');
        console.log(this.state.adddata[0].total_price,'totalprice');
        console.log(this.state.yewu,'业务');
        
        const tokens=localStorage.getItem('token')
        const list=this.state.adddata.map(item => {
            let elem = {} // 格式化后的item
            elem.goods_name = item.goods_name
            elem.whole_num = item.bgcount
            elem.single_num = item.smcount
            elem.total_price =item.bgcount * item.whole_price + item.smcount * item.single_price
            elem.single_price =item.single_price
            elem.whole_price =item.whole_price
            return elem
        })
        console.log(list,'格式化后的adddata')
        console.log(this.state.username,'addusername');
        
        axios({
            method: 'POST',
            url: 'http://172.16.6.29:8080/sales/addSales',
            data:{
                token:tokens,
                sales_type_name:'普通订单',
                customer_name:this.state.username,
                salesman:this.state.yewu,
                ware_name:'主仓库',
                delivery_time:this.state.orderdata,
                sales_method_name:this.state.xiaoshou,
                vehicle_id:this.state.cehngliang,
                sales_payable:this.state.sum,
                pay_type_name:'支付宝',
                salesDetailList:list
            }
        })
            .then(res => {
                console.log(res.data.data,'新增');
                
                // this.setState({
                //     kehutype: res.data,
                // })
                this.componentDidMount()
                
            })
            .catch(err => {
                console.log(err);
            })
    }
    addbigcount = (i, n) => {
        var suma = 0;
        var addcount = this.state.adddata
        if (n > 0) {
            this.state.adddata.filter((v, x) => {
                if (x === i) {
                    addcount[i].bgcount = n + 1
                }
            })

            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].smcount * addcount[i].single_price + addcount[i].bgcount * addcount[i].whole_price
            }
            this.setState({
                sum: suma,
                adddata: addcount
            })
        }
    }

    addsmcount = (i, n) => {
        var suma = 0;
        console.log(i, 'i');
        console.log(n, 'n');
        if (n > 0) {
            var addcount = this.state.adddata

            this.state.adddata.filter((v, x) => {
                if (x === i) {
                    addcount[i].smcount = n + 1
                }
            })
            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].smcount * addcount[i].single_price + addcount[i].bgcount * addcount[i].whole_price
            }
            this.setState({
                sum: suma,
                adddata: addcount
            }
            )
        }

    }

    redbigcount = (i, n) => {
        var suma = 0;

        console.log(i, 'i');
        console.log(n, 'n');

        if (n > 1) {
            var addcount = this.state.adddata

            this.state.adddata.filter((v, x) => {
                console.log(x, 'x');
                if (x === i) {
                    addcount[i].bgcount = n - 1
                }
            })
            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].smcount * addcount[i].single_price + addcount[i].bgcount * addcount[i].whole_price
            }
            this.setState({
                sum: suma,
                adddata: addcount
            }
            )
        }
        else {
            alert('不能在减了')
        }

    }

    redbigcount = (i, n) => {
        var suma = 0;

        console.log(i, 'i');
        console.log(n, 'n');

        if (n > 1) {
            var addcount = this.state.adddata

            this.state.adddata.filter((v, x) => {
                console.log(x, 'x');
                if (x === i) {
                    addcount[i].bgcount = n - 1
                }
            })
            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].smcount * addcount[i].single_price + addcount[i].bgcount * addcount[i].whole_price
            }
            this.setState({
                sum: suma,
                adddata: addcount
            }
            )
        }
        else {
            alert('不能在减了')
        }

    }

    redsmcount = (i, n) => {
        var suma = 0;
        var addcount = this.state.adddata

        if (n > 1) {
            this.state.adddata.filter((v, x) => {
                if (x === i) {
                    addcount[i].smcount = n - 1
                }
            })
            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].smcount * addcount[i].single_price + addcount[i].bgcount * addcount[i].whole_price
            }
            this.setState({
                sum: suma,
                adddata: addcount
            }
            )
        }
        else {
            alert('不能在减了')
        }

    }

    deldata = (i) => {
        this.setState({
            delid:i,
            delvis: true,
        })

                             
    }


    delhandok =()=>{

        const tests=this.state.adddata.filter(item => {
            return item.key !== this.state.delid
        })
        
        console.log(tests);
        
         var suma =0 ;
         for(var i=0 ; i<tests.length ; i++){
            suma += tests[i].smcount *tests[i].single_price + tests[i].bgcount * tests[i].whole_price

          }
            this.setState({
                confirmLoading: true,
                sum:suma,
                adddata:tests
            }) 
            setTimeout(() => {
                this.setState({
                  delvis: false,
                  confirmLoading: false,
                });
              }, 1000);
            


    }


render() {

    const { adddata, queryorder, sum ,kehutype,xiaoshoutype,persontype ,cartype,pingpai,fenlei2} = this.state

    
    for (let i = 0; i < queryorder.length; i++) {
        queryorder[i].key = i
    }
    console.log(this.state.adddata);

    const columns = [
        {
            title: '商品名称',
            align:'center',
            dataIndex: 'goods_name',
        },
        {
            title: '大单位',
            align:'center',
            dataIndex: 'whole_unit',
        },
        {
            title: '大单位单价',
            align:'center',
            dataIndex: 'whole_price',
        },
        {
            title: '小单位',
            align:'center',
            dataIndex: 'single_unit',
        },
        {
            title: '小单位单价',
            align:'center',
            dataIndex: 'single_price',
        },
        {
            title: '现有库存',
            align:'center',
            dataIndex: 'goods_sum',
        },

        {
            title: '操作',
            align:'center',
            render: (record, index) => (
                <span>
                    <a onClick={this.add.bind(this, record)}>添加</a>
                </span>
            )
        },

    ];
    const goodscolumns = [
        {
            title: '商品名称',
            align:'center',
            dataIndex: 'goods_name',
        },
        {
            title: '单价/大单位',
            align:'center',
            // dataIndex: 'goodsname',
            render: (text, record, index) => <span>{record.whole_price + '/' + record.whole_unit}</span>
        },
        {
            title: '数量',
            align:'center',
            dataIndex: 'bgcount',
            render: (text, record, index) => {
                return <div className="number">
                    <span onClick={() => this.redbigcount(index, text)}>-</span>
                    <span>{text}</span>
                    <span onClick={() => this.addbigcount(index, text)}>+</span>
                </div>
            }
        },
        {
            title: '小单位/单价',
            align:'center',
            render: (text, record, index) =>
                <span>
                    {record.single_price+ '/' + record.single_unit}
                </span>

        },
        {
            title: '数量',
            align:'center',
            dataIndex: 'smcount',
            render: (text, record, index) => {
                return <div className="number">
                    <span onClick={() => this.redsmcount(index, text)}>-</span>
                    <span>{text}</span>
                    <span onClick={() => this.addsmcount(index, text)}>+</span>
                </div>
            }
        },
        {
            title: '金额',
            dataIndex: 'total_price',
            align:'center',
            render: (text, record, index) => {
                return <span>{Math.abs(record.smcount * record.single_price + record.bgcount * record.whole_price).toString()}</span>
            }
        },
        {
            title: '现有库存',
            align:'center',
            dataIndex: 'goods_sum',
        },
        {
            title: '操作',
            align:'center',
            render: (text, record, index) => (
                <span>
                    <a onClick={() => this.deldata(record.key)}>删除</a>
                </span>
            )
        },
    ];

    const kehu =kehutype.map((item,index)=>{
        return <Option value={item.customer_type_name}>
                     {item.customer_type_name}
               </Option>
    })
    
    const xiaoshou =xiaoshoutype.map((item,index)=>{
        return <Option value={item.sales_method_name}>
                     {item.sales_method_name}
               </Option>
    })
    const person =persontype.map((item,index)=>{
        return <Option value={item.emp_name}>
                     {item.emp_name}
               </Option>
    })
    const car =cartype.map((item,index)=>{
        return <Option value={item}>
                     {item}
               </Option>
    })

    const pp =pingpai.map((item,index)=>{
        return <Option value={item.brand_name}>
                     {item.brand_name}
               </Option>
    })

    const fenlei =fenlei2.map((item,index)=>{
        return <Option value={item.commodity_level_name}>
                     {item.commodity_level_name}
               </Option>
    })

    return (
        <div>
            <div className="top">
                <div className="top-title">新增订单</div>
            </div>

            {/*  基本信息 */}
            <div className="quire">
                <div className="quire-title">
                    <p >基本信息</p>
                </div>
                <div className="condition2 flex-row">
                    <div className="bianju">
                        <label >订单类型：</label><span>普通订单</span>
                    </div>
                    <div className="bianju2" >
                        <label >客户名称：</label>
                        <Select className="xiaoshou" defaultValue='客户名称' onChange={(value) => this.setvalue(value)}>
                            {kehu}
                        </Select>
                    </div> 
                    <div className="bianju">
                        <label >业务员：</label>
                        <Select className="xiaoshou" onChange={(value)=>this.yewu(value)}>
                            {person}xiaoshou
                        </Select>
                    </div>
                    <div className="bianju">
                        <label >出货仓库：</label>
                        <span>主仓库</span>
                    </div>
                    <div className="bianju" >
                        <label >发货日期：</label><Input style={{ width: '120px' }} value={this.neworderDate} onChange={this.setDate} type="date"></Input>
                    </div>
                    <div className="bianju">
                        <label >销售类型：</label>
                        <Select className="xiaoshou"  onChange={(value)=>this.xiaoshou(value)}>
                            {xiaoshou}
                        </Select>
                    </div>
                    <div className="bianju">
                        <label >配送车辆：</label>
                        <Select className="xiaoshou"  onChange={(value)=>this.cheliang(value)}>
                                {car}
                        </Select>
                    </div>
                </div>
            </div>

            {/*  选择商品 */}
            <div className="quire3">
                <div className="quire-title">
                    <p >选择商品</p>
                </div>
                <div className="condition3 flex-row">
                    <div className="bianju ">
                        <label >选择品牌：</label>
                        <Select className="xiaoshou" onChange={(value)=>this.soupinpai(value)}>
                            {pp}
                        </Select>
                    </div>
                    <div className="bianju ">
                        <label >选择分类：</label>
                        <Select className="xiaoshou" onChange={(value)=>this.soufenlei(value)}>
                           {fenlei}
                        </Select>
                    </div>
                    <div className="bianju ">
                        <label >商品标题：</label>
                        <Input style={{width:'150px'}} onChange={this.souname}></Input>
                    </div>
                    <Radio.Button style={{ marginLeft: '12px' }} onClick={this.sousuo} type="button" value="large">搜索</Radio.Button>
                </div>


                {/* 搜索结果 */}

                <div className="quire2">
                    <div className="quire-title">
                        <div >搜索结果</div>
                    </div>
                    <Table columns={columns} dataSource={queryorder} />
                </div>

            </div>


            {/* 商品明细 */}
            <div className="quire">
                <div className="quire-title">
                    <p >商品明细</p>
                </div>
                <Table columns={goodscolumns} dataSource={adddata} />
            </div>


            <footer>
                <div className="payInfo">
                    <p>付款信息</p>
                </div>
                <div className="payInfo-detail">

                    <div>
                        <span className="span-one">应付款金额：</span>
                        <span className="span-two">{sum}</span>
                    </div>
                   
                    <div>
                        <button type="button" onClick={this.tijaio}>提交</button>
                    </div>
                </div>
            </footer>


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
    )
}

}

