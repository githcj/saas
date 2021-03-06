import React,{Component} from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
    
    console.log(file,'file');
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 文件!');
  }
  const isLt50KB = file.size / 1024  < 50;
  if (!isLt50KB) {
    message.error('图片大小不能超过50KB!');
  }
  return isJpgOrPng && isLt50KB;
}

class WXUpLoad extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
        };
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                imageUrl,
                loading: false,
            }),) 
            message.success(`${info.file.name} 上传成功`);
        }else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    };

    render() {
        const { notify } = this.props
        const uploadButton = (
            <div>
            {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">{notify}</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}

export default WXUpLoad