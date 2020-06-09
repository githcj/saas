import React from 'react'
import {
    CaretLeftOutlined,
} from '@ant-design/icons';
import '../../assets/css/purchase.css'

const Admin = (props) => {
    return(
        <div className="detail">
           <div className="admin">
           <div className='purchase-firtop'>
                <div className='dynamic-top-left'>
                    <div className='dynamic-top-left-mark'></div>
                    <p className='dynamic-top-word'>采购预览—待审批</p>
                </div>
                <div className='dynamic-top-right'>
                    <CaretLeftOutlined />
                    <p className='dynamic-top-word'>返回</p>
                </div>
            </div>
           </div>
           <div className="detail-middle">
                <div className="detail-middle-se1">
                    <p className="detail-middle-se1p">基本信息：</p>
                    <p>单号：<span style={{color:'red'}}>25151541315316</span></p>
                </div>
                <div className="detail-middle-se2">

                </div>
           </div>
        </div>
    )
}

export default Admin