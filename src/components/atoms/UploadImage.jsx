import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { FiUpload, FiTrash2 } from "react-icons/fi";

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%"
};

const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
}

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      files: [],
      fileErrors: []
    };
    this.inputElement = '';
    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.files !== this.state.files){
      this.props.onChange(this.state.files, this.state.pictures);
    }

    if(prevProps.loadingPictures !== this.props.loadingPictures) {
      if (this.props.loadingPictures) {
        this.setState({
          pictures: this.props.loadingPictures.pictures,
          files: this.props.loadingPictures.files
        })
      }
    }
  }

  /*
	 Check file extension (onDropFile)
	 */
  hasExtension(fileName) {
    const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  /*
   Handle file validation
   */
  onDropFile(e) {
    const files = e.target.files;
    const allFilePromises = [];
    const fileErrors = [];

    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileError = {
        name: file.name,
      };
      // Check for file extension
      if (!this.hasExtension(file.name)) {
        fileError = Object.assign(fileError, {
          type: ERROR.NOT_SUPPORTED_EXTENSION
        });
        fileErrors.push(fileError);
        continue;
      }
      // Check for file size
      if(file.size > this.props.maxFileSize) {
        fileError = Object.assign(fileError, {
          type: ERROR.FILESIZE_TOO_LARGE
        });
        fileErrors.push(fileError);
        continue;
      }

      allFilePromises.push(this.readFile(file));
    }

    this.setState({
      fileErrors
    });

    const {singleImage} = this.props;

    Promise.all(allFilePromises).then(newFilesData => {
      const dataURLs = singleImage
        ? []
        : this.state.pictures.slice();
      const files = singleImage
        ? []
        : this.state.files.slice();

      newFilesData.forEach(newFileData => {
        dataURLs.push(newFileData.dataURL);
        files.push(newFileData.file);
      });

      this.setState({ pictures: dataURLs, files: files });
    });
  }

  onUploadClick(e) {
    // Fixes https://github.com/JakeHartnell/react-images-upload/issues/55
    e.target.value = null;
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  }

  removeImage(picture) {
    const removeIndex = this.state.pictures.findIndex(e => e === picture);
    const filteredPictures = this.state.pictures.filter((e, index) => index !== removeIndex);
    const filteredFiles = this.state.files.filter((e, index) => index !== removeIndex);

    this.setState({pictures: filteredPictures, files: filteredFiles}, () => {
      this.props.onChange(this.state.files, this.state.pictures);
    });
  }

  renderErrors() {
    const { fileErrors } = this.state;
    return fileErrors.map((fileError, index) => {
      return (
        <div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
          * {fileError.name} {fileError.type === ERROR.FILESIZE_TOO_LARGE ? this.props.fileSizeError: this.props.fileTypeError}
        </div>
      );
    });
  }

  renderLabel() {
    if (this.props.withLabel) {
      return <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>
    }
  }

  renderPreview() {
    return (
      <div className="uploadPicturesWrapper">
        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
          {this.renderPreviewPictures()}
        </FlipMove>
      </div>
    );
  }

  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return (
        <div key={index} className="uploadPictureContainer">
          <div className="deleteImage" onClick={() => this.removeImage(picture)}> <FiTrash2/> </div>
          <img src={picture} className="uploadPicture" alt="preview"/>
        </div>
      );
    });
  }

  triggerFileUpload() {
    this.fileContainer.childNodes[4].click()
  }

  clearPictures() {
    this.setState({pictures: []})
  }

  render() {
    const {
      errors,
      fieldArrayTopic,
      fieldArrayIndex,
      fieldArrayName,
      reference,
      name
    } = this.props

    const showingError = !fieldArrayTopic 
      ? errors && errors[name] && <p style={{ color: '#FC0000' }}>
          {errors[name].message}
        </p>
      : errors 
        && errors[fieldArrayTopic]
        && errors[fieldArrayTopic][fieldArrayIndex]
        && errors[fieldArrayTopic][fieldArrayIndex][fieldArrayName] 
        && <p style={{ color: '#FC0000' }}>
          {errors[fieldArrayTopic][fieldArrayIndex][fieldArrayName].message}
        </p>

    return (
      <div className={"fileUploader " + this.props.className} style={this.props.style}>
        <div className="fileContainer" style={this.props.fileContainerStyle} ref={(ref) => this.fileContainer = ref}>
          <FiUpload/>
          {this.renderLabel()}
          <div className="errorsContainer">
            {this.renderErrors()}
          </div>
          <button
            type={this.props.buttonType}
            className={"chooseFileButton " + this.props.buttonClassName}
            style={this.props.buttonStyles}
            onClick={this.triggerFileUpload}
          >
            {this.props.buttonText}
          </button>
          <input
            name={name}
            type="file"
            ref={reference}
            multiple={!this.props.singleImage}
            onChange={this.onDropFile}
            onClick={this.onUploadClick}
            accept={this.props.accept}
          />
          {showingError}
          { this.props.withPreview ? this.renderPreview() : null }
        </div>
      </div>
    )
  }
}

UploadImage.defaultProps = {
  className: '',
  fileContainerStyle: {},
  buttonClassName: "",
  buttonStyles: {},
  withPreview: true,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "Choose images",
  buttonType: "button",
  withLabel: true,
  label: "Max file size: 5mb, accepted: jpg and png",
  labelStyles: {},
  labelClass: "",
  imgExtension: ['.jpg', '.jpeg', '.png'],
  maxFileSize: 5242880,
  fileSizeError: " file size is too big",
  fileTypeError: " is not a supported file extension",
  errorClass: "",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {},
  errors: {},
  reference: () => {},
  fieldArrayName: "",
  fieldArrayTopic: "",
  fieldArrayIndex: -1,
  reference: {}
};

UploadImage.propTypes = {
  style: PropTypes.object,
  fileContainerStyle: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonStyles: PropTypes.object,
  buttonType: PropTypes.string,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
  reference: PropTypes.func,
  errors: PropTypes.object,
  fieldArrayName: PropTypes.string,
  fieldArrayIndex: PropTypes.number,
  fieldArrayTopic: PropTypes.string,
};

export default UploadImage;
