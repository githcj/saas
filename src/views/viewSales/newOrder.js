import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/css/sales/newOrder.css'
import { Table, Radio, Select } from 'antd';
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
            car: []
        };
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
                if (record.goodsname === newData[i].goodsname) {
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
            suma += newData[i].smcount * newData[i].smallUntPrice + newData[i].bgcount * newData[i].bigUntPrice
        }

        this.setState({
            sum: suma,
            adddata: newData
        })
    }

    componentDidMount() {
        const adddata = this.state.adddata


        axios({
            method: 'GET',
            url: 'http://119.23.228.238:3031/mock/47/addorder',
        })
            .then(res => {
                this.setState({
                    queryorder: res.data,

                })
            })
            .catch(err => {
                console.log(err);
            })

        var suma = 0;
        for (var i = 0; i < adddata.length; i++) {
            suma += adddata[i].smcount * adddata[i].smallUntPrice + adddata[i].bgcount * adddata[i].bigUntPrice
        }
        this.setState({
            sum: suma
        })
    }
    setvalue = (value) => {
        console.log(value)
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
                suma += addcount[i].smcount * addcount[i].smallUntPrice + addcount[i].bgcount * addcount[i].bigUntPrice
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
                suma += addcount[i].smcount * addcount[i].smallUntPrice + addcount[i].bgcount * addcount[i].bigUntPrice
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
                suma += addcount[i].smcount * addcount[i].smallUntPrice + addcount[i].bgcount * addcount[i].bigUntPrice
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
                suma += addcount[i].smcount * addcount[i].smallUntPrice + addcount[i].bgcount * addcount[i].bigUntPrice
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
                suma += addcount[i].smcount * addcount[i].smallUntPrice + addcount[i].bgcount * addcount[i].bigUntPrice
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
       
        const tests=this.state.adddata.filter(item => {
            return item.key !== i
        })
        
        console.log(tests);
        
         var suma =0 ;
         for(var i=0 ; i<tests.length ; i++){
            suma += tests[i].smcount *tests[i].smallUntPrice + tests[i].bgcount * tests[i].bigUntPrice
          }
            this.setState({
                sum:suma,
                adddata:tests
            })                  
    }




//     render() {

//         const { adddata, queryorder, sum } = this.state

//         for (let i = 0; i < queryorder.length; i++) {
//             queryorder[i].key = i
//         }
//         this.setState({
//             sum: suma,
//             adddata: addcount
//         }
//         )
//     }
//         else {
//     alert('不能在减了')
// }

//     }





render() {

    const { adddata, queryorder, sum } = this.state

    for (let i = 0; i < queryorder.length; i++) {
        queryorder[i].key = i
    }
    console.log(this.state.adddata);

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'goodsname',
        },
        {
            title: '大单位',
            dataIndex: 'bigUnt',
        },
        {
            title: '大单位单价',
            dataIndex: 'bigUntPrice',
        },
        {
            title: '小单位',
            dataIndex: 'smallUnt',
        },
        {
            title: '小单位单价',
            dataIndex: 'smallUntPrice',
        },
        {
            title: '现有库存',
            dataIndex: 'stock',
        },

        {
            title: '操作',
            render: (record, index) => (
                <span>
                    <a >delete</a>
                    <div onClick={this.add.bind(this, record)}>add</div>
                </span>
            )
        },

    ];
    const goodscolumns = [
        {
            title: '商品名称',
            dataIndex: 'goodsname',
        },
        {
            title: '单价/大单位',
            // dataIndex: 'goodsname',
            render: (text, record, index) => <span>{record.bigUntPrice}</span>
        },
        {
            title: '数量',
            dataIndex: 'bgcount',
            render: (text, record, index) => {
                return <div>
                    <span onClick={() => this.redbigcount(index, text)}>-</span>
                    <span>{text}</span>
                    <span onClick={() => this.addbigcount(index, text)}>+</span>
                </div>
            }
        },
        {
            title: '小单位/单价',
            render: (text, record, index) =>
                <span>
                    {record.smallUntPrice + '/' + record.bigUnt}
                </span>

        },
        {
            title: '数量',
            dataIndex: 'smcount',
            render: (text, record, index) => {
                return <div>
                    <span onClick={() => this.redsmcount(index, text)}>-</span>
                    <span>{text}</span>
                    <span onClick={() => this.addsmcount(index, text)}>+</span>
                </div>
            }
        },
        {
            title: '金额',
            render: (text, record, index) => {
                return <span>{Math.abs(record.smcount * record.smallUntPrice + record.bgcount * record.bigUntPrice).toString()}</span>
            }
        },
        {
            title: '现有库存',
            dataIndex: 'stock',
        },
        {
            title: '操作',
            render: (text, record, index) => (
                <span>
                    <span onClick={() => this.deldata(record.key)}>delete</span>
                </span>
            )
        },
    ];

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
                            <Option value="全部">客户1</Option>
                            <Option value="客户1">客户2</Option>
                            <Option value="客户2">客户3</Option>
                        </Select>
                    </div>
                    <div className="bianju">
                        <label >业务员：</label>
                        <Select className="xiaoshou">
                            <Option value="全部">全部</Option>
                            <Option value="业务员1">业务员2</Option>
                            <Option value="业务员2">业务员3</Option>
                        </Select>
                    </div>
                    <div className="bianju">
                        <label >出货仓库：</label>
                        <Select className="xiaoshou" style={{ width: '180px' }}>
                            <Option value="全部">全部</Option>
                            <Option value="仓库1">仓库1</Option>
                            <Option value="仓库1">仓库2</Option>
                        </Select>
                    </div>
                    <div className="bianju">
                        <label >发货日期：</label><input style={{ width: '120px' }} value={this.neworderDate} onChange={this.setDate} type="date"></input>
                    </div>
                    <div className="bianju">
                        <label >销售类型：</label>
                        <Select className="xiaoshou">
                            <Option value="全部">全部</Option>
                            <Option value="销售类型1">销售类型1</Option>
                            <Option value="销售类型2">销售类型2</Option>
                        </Select>
                    </div>
                    <div className="bianju">
                        <label >配送车辆：</label>
                        <Select className="xiaoshou">
                            <Option value="全部">请选择</Option>
                            <Option value="车1">车1</Option>
                            <Option value="车2">车2</Option>
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
                        <Select className="xiaoshou">
                            <Option value="全部">请选择</Option>
                            <Option value="品牌1">品牌11</Option>
                            <Option value="品牌2">品牌2</Option>
                        </Select>
                    </div>
                    <div className="bianju ">
                        <label >选择分类：</label>
                        <Select className="xiaoshou">
                            <Option value="全部">请选择</Option>
                            <Option value="分类1">分类1</Option>
                            <Option value="分类2">分类2</Option>
                        </Select>
                    </div>
                    <div className="bianju ">
                        <label >商品标题：</label>
                        <input ></input>
                    </div>
                    <Radio.Button style={{ marginLeft: '12px' }} type="button" value="large">搜索</Radio.Button>
                </div>


                {/* 搜索结果 */}

                <div className="quire2">
                    <div className="quire-title">
                        <p>搜索结果</p>
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
                        <button type="button">提交</button>
                    </div>
                </div>
            </footer>
        </div>
    )
}

}

