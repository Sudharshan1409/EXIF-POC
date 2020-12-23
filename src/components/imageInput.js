import React, { Component } from 'react';
var EXIF = require('exif-js');
// var FileReader = require('filereader');
class ImageInput extends Component {
    constructor() {
        super()
        this.state = {
            imgSrc: null,
            exifData: null
        }
    }
    base64ToArrayBuffer (base64) {
      base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
      var binaryString = atob(base64);
      var len = binaryString.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
  }
  displayExifData() {
      console.log('this')
      console.log(this)
    // Assuming only image
     var file = this.refs.file.files[0];
     var reader = new FileReader();
     var url = reader.readAsDataURL(file);
     reader.onloadend = function (e) {
         var exif_data = EXIF.readFromBinaryFile(this.base64ToArrayBuffer(reader.result));
         console.log('exif_data')
         // console.log(exif_data)
         console.log(exif_data)
     }.bind(this)
}
    render() {
      return (<div>
        <form>
          <input
            ref="file"
            type="file"
            name="user[image]"
            onChange={this.displayExifData.bind(this)}/>
        </form>
        {/* Only show first image, for now. */}
        <br />
        <img src={this.state.imgSrc} height="50%" width="50%" />
        <br />
      </div>)
    }
}

export default ImageInput
