import React from 'react'
import '../assets/css/conTitle.css'
import { SyncOutlined,LeftOutlined } from '@ant-design/icons';

const ConTitle = (props)=> {
    const { titleName,clickName } = props 
    const refresh = () => {
        console.log(clickName);
        
        switch(clickName){
            case undefined:
                window.history.go(0);
            break;
            case '返回':
                window.history.go(-1);
            break;
        }
    }


        return (
                <div className='conTile'>
                    <div className='conTitle-top-left'>
                        <div className='conTitle-top-leftmark'></div>
                        <p className='conTitle-top-word'>{ titleName }</p>
                    </div>
                    <div className='conTitle-top-right'>
                        {clickName === '返回' ? <LeftOutlined /> : <SyncOutlined />}
                        <p className='conTitle-top-word' onClick={refresh}>{clickName === '返回' ? '返回' : '刷新'}</p>
                    </div>
                </div>
        )
    }
    
    export default ConTitle