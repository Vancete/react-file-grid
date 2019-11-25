import React, { Component } from 'react';
import './styles.css';
import Octicon, {File, FileMedia, FilePdf, FileZip, FileDirectory, Play, FileBinary} from '@primer/octicons-react'

class FileGrid extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            contextMenu: {
                x: 0,
                y: 0,
                hidden: true
            }
        }

        this.fileEvent = this.fileEvent.bind(this)
        this.contextMenuEvent = this.contextMenuEvent.bind(this)
    }

    componentDidMount() {
        let me = this
        document.addEventListener('contextmenu', function(event){
            event.preventDefault()
        })
        document.addEventListener('click', function(event){
            me.setState({contextMenu: {hidden: true}})
        })
    }

    fileEvent(e, file){        
        this.setState({selectedFile: file})
        if(file){
            e.stopPropagation()

            if (this.props.onClickFile) {
                this.props.onClickFile(file)
            }
        }
    }

    fileDoubleEvent(file) {        
        if (this.props.onDoubleClickFile) {
            this.props.onDoubleClickFile(file)
        }
    }

    contextMenuEvent(e, file) {
        e.stopPropagation()
        this.setState({contextMenu: {hidden: false, x: e.clientX, y: e.clientY}, selectedFile: file})
        if (this.props.onRightClickFile) {
            this.props.onRightClickFile(file)
        }
    }

    iconRenderer(type){
        switch (type) {
            case undefined:
                    return(<Octicon icon={File} />)

            case 'exe':
                return(<Octicon icon={FileBinary} />)

            case 'folder':
                return(<Octicon icon={FileDirectory} />)

            case 'media':
                    return(<Octicon icon={FileMedia} />) 
            
            case 'pdf':
                    return(<Octicon icon={FilePdf} />) 

            case 'video':
                return(<Octicon icon={Play} />) 
            
            case 'zip':
                    return(<Octicon icon={FileZip} />) 
        
            default:
                return(type)
        }
    }

    render (){
        return(
            <React.Fragment>
                <div className="file-grid" onClick={e => this.fileEvent(e, null)} onContextMenu={e => {this.contextMenuEvent(e, null)}}>
                    {this.props.files.map( item => {
                        return (
                            <div className="file-item"
                                    onClick={e => this.fileEvent(e, item)}
                                    onDoubleClick={() => this.fileDoubleEvent(item)}
                                    onContextMenu={e => {this.contextMenuEvent(e, item)}} style={{background: item.color ? item.color : undefined, borderColor: this.state.selectedFile && item.filename == this.state.selectedFile.filename ? 'deepskyblue' : null}}>
                                <div className="icon">
                                    {this.iconRenderer(item.icon)}
                                </div>
                                <div className="file-detail">
                                    <div className="filename">{item.filename}</div>
                                    <div className="file-props">
                                        <div className="filetime">{item.filedate}</div>
                                        <div className="filesize">{item.filesize}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="context-menu" style={{display: this.state.contextMenu.hidden ? 'none' : 'block', left: this.state.contextMenu.x, top: this.state.contextMenu.y}}>
                    {this.props.contextMenu.map( item =>{
                        return (
                            <div className="item" onClick={() => item.action(this.state.selectedFile)}>{item.text}</div>
                        )
                    })}
                </div>
            </React.Fragment>
        )}
}

export default FileGrid;