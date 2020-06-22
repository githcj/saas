import React, { Component } from 'react'
import '../../assets/css/wang/apply.css'
import { Select, Table, message } from 'antd'
import axios from 'axios'
const { Option } = Select;


export default class purchaseApply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            detailData: [],
            sum: 0,
            changShang: '',
            fuKuan: '',
            shenPiren: '',
            caiGouDate: '',
            gonghuoShang: [],
            fukuanList: [],
            shenpiList: [],
            queryorder: [],
            searchVal: '', // 搜索框
        }
    }

    // 获取所有数据
    getAllData = () => {
        axios({
            method: 'POST',
            // url: 'http://172.16.6.126:8080/purchase/queryProductionByCondition',
            url:'http://119.23.228.238:3031/mock/47/purchase/addPurchase',
            data: {
                token: 'bchjhxzz',
            }
        })
            .then(res => {
                console.log(res)
                this.setState({
                    // data: res.data.data,
                    data:res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    // 初始化
    componentWillMount() {
        console.log('初始化')
        this.getAllData()

    }

    async componentDidMount() {
        const detailData = this.state.detailData


        await axios({
            method: 'POST',
            url: 'http://172.16.6.126:8080/purchase/querySupplier',
        })
            .then(res => {
                console.log(res.data.data, 'query')
                this.setState({
                    gonghuoShang: res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        await axios({
            method: 'POST',
            url: 'http://172.16.6.126:8080/purchase/queryPayType',
        })
            .then(res => {
                console.log(res.data.data, '支付')
                this.setState({
                    fukuanList: res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        await axios({
            method: 'POST',
            url: 'http://172.16.6.126:8080/purchase/queryCheckPerson',
        })
            .then(res => {
                console.log(res.data.data, '审批')
                this.setState({
                    shenpiList: res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        var suma = 0
        for (var i = 0; i < detailData.length; i++) {
            suma += detailData[i].single_num * detailData[i].single_price + detailData[i].whole_num * detailData[i].whole_price
        }
        this.setState({
            sum: suma
        })
    }
    getchangShang = (e) => {
        console.log(e)
        this.setState({
            changShang: e
        })
    }
    getfuKuan = (e) => {
        this.setState({
            fuKuan: e
        })

    }
    getvalue = (e) => {
        this.setState({
            shenPiren: e

        })
        console.log(this.state.shenPiren)
    }
    getcaiGouD = (e) => {
        this.setState({
            caiGouDate: e
        })
    }
    // 提交
    submit = () => {
        const { detailData } = this.state
        console.log(detailData)
        axios({
            method: 'POST',
            url: 'http://172.16.6.126:8080/purchase/addPurchase',
            data: {
                supplier_id: this.state.changShang,
                pay_type_id: this.state.fuKuan,
                founder_id: 0,
                approver_id: this.state.shenPiren,
                sum_price: this.state.sum,
                data: detailData,
            }
        })
            .then(res => {
                console.log(res.data.code)
                this.props.msg.push({
                    pathname: '/home/Caigou'
                })
                message.success('采购单添加成功')
            })
            .catch(err => {
                console.log(err)
                message.success('采购单添加失败')
            })
    }
    // 四个加减按钮
    addbigcount = (i, n) => {
        var suma = 0
        var addcount = this.state.detailData
        console.log(i, 'i')
        console.log(n, 'n')
        if (n > 0) {
            this.state.detailData.filter((v, x) => {
                console.log(x, 'x')
                if (x === i) {
                    addcount[i].whole_num = n + 1
                }
            })
            // 这个是我加的 四个加减都加上了
            for (let i = 0; i < addcount.length; i++) {
                addcount[i].total_price =addcount[i].single_num * addcount[i].single_price + addcount[i].whole_num * addcount[i].whole_price
            }
            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].single_num * addcount[i].single_price + addcount[i].whole_num * addcount[i].whole_price
            }
            console.log(addcount)
            this.setState({
                sum: suma,
                detailData: addcount
            })
        }
    }
    addsmcount = (i, n) => {
        var suma = 0
        var addcount = this.state.detailData
        if (n > 0) {
            this.state.detailData.filter((v, x) => {
                if (x === i) {
                    addcount[i].single_num = n + 1
                }
            })
            // 这个是我加的 四个加减都加上了
            for (let i = 0; i < addcount.length; i++) {
                addcount[i].total_price =addcount[i].single_num * addcount[i].single_price + addcount[i].whole_num * addcount[i].whole_price
            }
            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].single_num * addcount[i].single_price + addcount[i].whole_num * addcount[i].whole_price
            }
            console.log(addcount)
            this.setState({
                sum: suma,
                detailData: addcount
            })
        }
    }
    redbigcount = (i, n) => {
        var suma = 0
        var addcount = this.state.detailData
        if (n > 1) {
            this.state.detailData.filter((v, x) => {
                if (x === i) {
                    addcount[i].whole_num = n - 1
                }
            })
            // 这个是我加的 四个加减都加上了
            for (let i = 0; i < addcount.length; i++) {
                addcount[i].total_price =addcount[i].single_num * addcount[i].single_price + addcount[i].whole_num * addcount[i].whole_price
            }
            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].single_num * addcount[i].single_price + addcount[i].whole_num * addcount[i].whole_price
            }
            console.log(addcount)
            this.setState({
                sum: suma,
                detailData: addcount
            })
        }
    }
    redsmcount = (i, n) => {
        var suma = 0;
        var addcount = this.state.detailData
        if (n > 1) {
            this.state.detailData.filter((v, x) => {
                if (x === i) {
                    addcount[i].single_num = n - 1
                }
            })
            // 这个是我加的 四个加减都加上了
            for (let i = 0; i < addcount.length; i++) {
                addcount[i].total_price =addcount[i].single_num * addcount[i].single_price + addcount[i].whole_num * addcount[i].whole_price
            }
            for (var i = 0; i < addcount.length; i++) {
                suma += addcount[i].single_num * addcount[i].single_price + addcount[i].whole_num * addcount[i].whole_price
            }
            console.log(addcount)
            this.setState({
                sum: suma,
                detailData: addcount
            })
        }
    }
    // 删除
    delA = (i) => {
        const delB = this.state.detailData.filter(item => (
            item.key != i
        ))
        this.setState({
            detailData: delB
        })
    }
    handleData = () => {

    }
    // 删除
    sousuo = () => {
        console.log('搜索')
        axios({
            method: 'POST',
            url: 'http://172.16.6.126:8080/purchase/queryProductionByCondition',
            data: {
                token: 'bchjhxzz',
                goods_name: this.state.searchVal
            }
        })
            .then(res => {
                console.log(res)
                this.setState({
                    data: res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    // 添加到订单详情
    add = (record) => {
        var suma = 0
        let newData = [...this.state.detailData]
        if (newData.length === 0) {
            newData.push(record)
            for (let i = 0; i < newData.length; i++) {
                newData[newData.length - 1].key = i;
                newData[newData.length - 1].single_num = 1;
                newData[newData.length - 1].whole_num = 1;
            }
        }
        else {
            let is = true
            for (let i = 0; i < newData.length; i++) {
                if (record.goods_name === newData[i].goods_name) {
                    is = !is
                    newData[i].whole_num = newData[i].whole_num + 1
                }
            }
            if (is) {
                newData.push(record)
                for (let i = 0; i < newData.length; i++) {
                    newData[newData.length - 1].key = i;
                    newData[newData.length - 1].single_num = 1;
                    newData[newData.length - 1].whole_num = 1;
                }
            }
        }
        for (var i = 0; i < newData.length; i++) {
            suma += newData[i].single_num * newData[i].single_price + newData[i].whole_num * newData[i].whole_price
        }
        // 在加到下面详情的时候添加属性total_price ,上面四个加减的时候对他进行改变
        newData[newData.length - 1].total_price = 
        newData[newData.length - 1].single_num * newData[newData.length - 1].single_price + 
        newData[newData.length - 1].whole_num * newData[newData.length - 1].whole_price;
        console.log(newData)
        this.setState({
            sum: suma,
            detailData: newData
        })
    }
    // 标题双向绑定
    changeSearch = e => {
        this.setState({
            searchVal: e.target.value
        })
    }
    render() {
        const { data, detailData, sum, changShang, fuKuan, shenPiren, caiGouDate, gonghuoShang, fukuanList, shenpiList, queryorder, searchVal } = this.state
        const gonghuo = gonghuoShang.map((item, index) => {
            return <Option value={item.supplier_id}>
                {item.supplier_name}
            </Option>
        })
        const fukuanA = fukuanList.map((item, index) => {
            return <Option value={item.pay_type_id}>
                {item.pay_type_name}
            </Option>
        })
        const shenpiA = shenpiList.map((item, index) => {
            return <Option value={item.emp_id}>
                {item.emp_name}
            </Option>
        })

        for (let i = 0; i < detailData.length; i++) {
            detailData[i].key = i
        }
        const detail = [
            {
                title: '商品名称',
                dataIndex: 'goods_name',
                align: 'center'
            }, {
                title: '单价/大单位',
                dataIndex: 'big',
                align: 'center',
                render: (text, record) => {
                    return record.whole_price + '/' + record.whole_unit
                }
            }, {
                title: '数量',
                dataIndex: 'whole_num',
                align: 'center',
                render: (text, record, index) => {
                    console.log('我就是', record.whole_num)
                    return <div className="number">
                        <span onClick={() => this.redbigcount(index, text)} className="count">-</span>
                        <span>{text}</span>
                        <span onClick={() => this.addbigcount(index, text)} className="count">+</span>
                    </div>
                }
            }, {
                title: '小单位价格',
                dataIndex: 'small',
                align: 'center',
                render: (text, record) => {
                    return record.single_price + '/' + record.single_unit
                }
            }, {
                title: '数量',
                dataIndex: 'single_num',
                align: 'center',
                render: (text, record, index) => {
                    return <div className="number">
                        <span onClick={() => this.redsmcount(index, text)} className="count">-</span>
                        <span>{text}</span>
                        <span onClick={() => this.addsmcount(index, text)} className="count">+</span>
                    </div>
                }
            },
            {
                title: '金额',
                dataIndex: 'total_price',
                align: 'center',
                // render: (text, record) => {
                //     return (
                //         <div>{record.single_num * record.single_price + record.whole_num * record.whole_price}</div>
                //     )
                // }
            },
            {
                title: '操作',
                dataIndex: 'delHandle',
                align: 'center',
                render: (text, record) => <span style={{ color: 'rgb(26, 188, 156)' }}
                    onClick={() => this.delA(record.key)}>删除</span>
            }
        ]
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'goods_name',
                align: 'center'
            },
            {
                title: '大单位',
                dataIndex: 'whole_unit',
                align: 'center'
            },
            {
                title: '大单位单价',
                dataIndex: 'whole_price',
                align: 'center'
            },
            {
                title: '小单位',
                dataIndex: 'single_unit',
                align: 'center'
            },
            {
                title: '小单位价格',
                dataIndex: 'single_price',
                align: 'center'
            },
            {
                title: '现有库存',
                dataIndex: 'total_num',
                align: 'center'
            }, {
                title: '操作',
                dataIndex: 'addHandle',
                align: 'center',
                render: (text, record, index) => (
                    <span style={{ color: 'rgb(26, 188, 156)' }}
                        onClick={() => this.add(record)}>添加</span>
                )
            }
        ]
        for (let i = 0; i < detailData.length; i++) {
            detailData[i].key = i
        }
        return (
            <div className="apply">
                <header>
                    <div className="apply-top">
                        <div className="top-box"></div>
                        <p className="top-title">采购申请</p>
                    </div>
                </header>

                <section className='apply-sec1'>
                    <div className="addstock-info-title">
                        <p>基本信息</p>
                    </div>
                    <div className="addstock-info">
                        <div>
                            <span style={{ color: 'red' }}>*</span>
                            供货厂商：
                            <Select
                                style={{ width: 160 }}
                                defaultValue='供货厂商'
                                onChange={(value) => this.getchangShang(value)}>
                                {gonghuo}
                            </Select>
                        </div>
                        <div>
                            <span style={{ color: 'red' }}>*</span>
                            付款类型：
                            <Select
                                style={{ width: 160 }}
                                defaultValue='付款类型'
                                onChange={(value) => this.getfuKuan(value)}>
                                {fukuanA}
                            </Select>
                        </div>
                        <div>
                            <span style={{ color: 'red' }}>*</span>
                            审批人：
                            <Select
                                style={{ width: 160 }}
                                defaultValue='审批人'
                                onChange={(value) => this.getvalue(value)}>
                                {shenpiA}
                            </Select>
                        </div>
                    </div>
                </section>

                <section className='apply-sec2'>
                    <div className="addstock-info-title">
                        <p>选择商品</p>
                    </div>
                    <div className="addstock-search">
                        <div className="addstock-info info-two">
                            <div>
                                选择分类：
                                <Select style={{ width: 160 }}>
                                    <Option value="1">全部</Option>
                                    <Option value="2">预付款</Option>
                                    <Option value="3">货到付款</Option>
                                </Select>
                            </div>
                            <div>
                                商品标题：
                                <input
                                    type="text"
                                    className="goodsTitle"
                                    value={searchVal}
                                    onChange={(e) => this.changeSearch(e)}></input>
                            </div>
                            <div className="goodsSearch" onClick={this.sousuo}>搜索</div>
                        </div>

                        <div className="search-result">
                            <div className="search-title">
                                <p>搜索结果</p>
                            </div>
                            <Table
                                style={{ width: '100%' }}
                                dataSource={data}
                                columns={columns}
                                bordered />
                        </div>
                    </div>
                </section>
                <section className="goodsDetail">
                    <div className="detail-title">
                        <p>商品明细</p>
                    </div>
                    <Table
                        style={{ width: '100%' }}
                        dataSource={detailData}
                        columns={detail}
                        bordered />
                    <div className="totals">
                        <div className="totals-se1">
                            <span className="span-one">商品共：</span>
                            <span className="span-two">{detailData.length}</span>
                        </div>
                        <div className="totals-se1">
                            <span className="span-one">金额合计：</span>
                            <span className="span-two">{sum}元</span>
                        </div>
                        <div className="apply-sub"
                            style={{ cursor: 'pointer' }}
                            onClick={this.submit}>提交</div>
                    </div>
                </section>
            </div>
        )
    }
}



