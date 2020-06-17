import React from 'react'
import {Row,Col,Checkbox} from 'antd'

const PowerTable = (props) => {
    
    const {index,item} = props
    console.log(props,'list')


    return (<div className='power-check-box' key={item.power_id}>
            <div className="power-check-title">
                <Checkbox
                    indeterminate={props.checkList[index].indeterminate}
                    onChange={(e)=>props.onCheckOneAllChange(e,item.power_id)}
                    checked={props.checkList[index].checked}
                >
                    {item.power_name}
                </Checkbox>
            </div>
            <div className="power-check-body">
                <Checkbox.Group style={{ width: '100%' }} value={props.checkList[index].children} id={index} onChange={(value)=>{props.onChange(value,item.power_id)}}>
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