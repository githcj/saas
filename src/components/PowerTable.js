import React from 'react'
import {Row,Col,Checkbox} from 'antd'

const PowerTable = (props) => {
    
    const {item} = props
    // console.log(props.checkList,'list')
    let checkItem = props.checkList.filter( it => {
        return it.power_id === item.power_id
    })
    checkItem = checkItem[0]
    console.log(checkItem,'选择的Item')


    return (<div className='power-check-box' key={item.power_id}>
            <div className="power-check-title">
                <Checkbox
                    indeterminate={checkItem.indeterminate}
                    onChange={(e)=>props.onCheckOneAllChange(e,item.power_id,checkItem.power_id)}
                    checked={checkItem.checked}
                >
                    {item.power_name}
                </Checkbox>
            </div>
            <div className="power-check-body">
                <Checkbox.Group style={{ width: '100%' }} value={checkItem.children} onChange={(value)=>{props.onChange(value,item.power_id)}}>
                    <Row className="power-check-body">
                    {item.children.map(childItem =>{
                        return  <Col span={8} className="power-check-item-box" key={childItem.power_id}>
                                    <Checkbox value={childItem.power_id}>{childItem.power_name}</Checkbox>
                                </Col>
                    })}
                    </Row>
                </Checkbox.Group>
            </div>
        </div>
    )
}

export default PowerTable