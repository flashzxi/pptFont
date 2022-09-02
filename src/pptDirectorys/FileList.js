import React from 'react';
import { List} from "antd";
import {getFiles} from "../requests/pptRequests";

class FileList extends React.Component{
    constructor(props) {
        super(props);
        this.currentPath = [""]
        this.state = {
            ppts: [],
            dirs: []
        };
    }

    componentDidMount() {
        this.updateFileList("")
    }

    getPrefix = ()=>{
        let prefix = ""
        for (let i = 0; i < this.currentPath.length; i++) {
            if(this.currentPath[i] !== ""){
                prefix = prefix + "/" + this.currentPath[i]
            }
        }
        return prefix.substring(1)
    }

    updateFileList = (url)=>{
        let realUrl = this.getPrefix();
        console.log("prefix = " + realUrl)
        if (realUrl === ""){
            realUrl += url
        }else{
            realUrl = realUrl + "/" + url
        }
        getFiles(realUrl).then(
            respond => {
                console.log(respond.data)
                if(url === ".."){
                    this.currentPath = this.currentPath.slice(0,-1)
                }else{
                    this.currentPath = [...this.currentPath, url]
                }
                const data = respond.data
                let ppts = []
                let dirs = []
                for (let i = 0; i < data.length; i++) {
                    const file = data[i]
                    if(file.value === 'dir'){
                        dirs = [...dirs, file.key]
                    }else{
                        ppts = [...ppts, file.key]
                    }
                }
                this.setState({
                    ppts: ppts,
                    dirs: dirs
                })
            }
        )
    }

    onDirClick = (url) => {
        this.updateFileList(url)
    }

    onPPTClick = (url) => {
        let realUrl = this.getPrefix()
        if(realUrl !== ""){
            realUrl = realUrl + "/" + url;
        }else{
            realUrl = url
        }
        window.location.href="http://ppt.flashzxi.cn/ppts/"+realUrl
    }

    render() {
        return (
            <div>
                <List
                    size="small"
                    itemLayout="horizontal"
                    header={<div><h2>PPT</h2></div>}
                    bordered
                    dataSource={this.state.ppts}
                    renderItem={(item) => <List.Item onClick={this.onPPTClick.bind(this,item)}>{item}</List.Item>}
                />
                <List
                    size="small"
                    itemLayout="horizontal"
                    header={<div><h2>Directory</h2></div>}
                    bordered
                    dataSource={["..", ...this.state.dirs]}
                    renderItem={(item) =>
                        <List.Item
                            onMouseEnter={()=>{}}
                            onClick={this.onDirClick.bind(this, item)}
                            onMouseLeave={()=>{}}
                        >{item}</List.Item>}
                />
            </div>
        );
    }

}

export default FileList;
