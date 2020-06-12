import React from 'react'
import { Popconfirm  } from 'antd'

const DepartDelPop = (props) => {

    const {confirm,cancel} = props

    return (
        <Popconfirm
            title="确认删除这条数据"
            onConfirm={confirm}
            onCancel={cancel}
            okText="确认"
            cancelText="取消"
        >
            <a href="#">删除</a>
        </Popconfirm>
    )
}

export default DepartDelPop