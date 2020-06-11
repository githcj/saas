import React from 'react'
import '../assets/css/conTitle.css'
import { SyncOutlined } from '@ant-design/icons';

const ConTitle = (props)=> {
    const { titleName } = props 
    const refresh = () => {
        window.history.go(0)
    }
        return (
                <div className='conTile'>
                    <div className='conTitle-top-left'>
                        <div className='conTitle-top-leftmark'></div>
                        <p className='conTitle-top-word'>{ titleName }</p>
                    </div>
                    <div className='conTitle-top-right'>
                        <SyncOutlined />
                        <p className='conTitle-top-word' onClick={refresh}>刷新</p>
                    </div>
                </div>
        )
    }
    
    export default ConTitle