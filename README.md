# react-file-grid
React dumb component for showing files in a grid

![Demo](/demo.png)
Demo: https://codesandbox.io/s/react-file-grid-demo-wffdt

# Dependencies
At this moment, the only one dependency is ```@primer/octicons-react```, used for the file and folder icons

# Props
```
<FileGrid 
    files={files}
    contextMenu={contextMenu}
    onClickFile={this.click}
    onDoubleClickFile={this.doubleClick}
    onRightClickFile={this.rightClick}
/>
```
Where...
```
files = [{
  filename : '1',
  filedate : '20 Nov 2019 12:24',
  icon: 'folder',
  color: '#ffbf0f'
},{
  filename : '2',
  filedate : '20 Nov 2019 12:24',
  icon: 'zip'
},{
  filename : '3',
  filedate : '20 Nov 2019 12:24',
  icon: <i className="fa fa-heart"></i>,
  color: '#ff69b4'
}]

contextMenu = [{
  text: 'Copy',
  action: this.copyAction
},{
  text: 'Remove',
  action: this.removeAction
},]

copyAction(file){
  console.log('Copied', file)
}

removeAction(file){
  console.log('Removed', file)
}

click(file){
  console.log('Clicked on file', file)
}

doubleClick(file){
  console.log('Double-clicked on file', file)
}

rightClick(file){
  console.log('Right-clicked on file', file)
}
```
