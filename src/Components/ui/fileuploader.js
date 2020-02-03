import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {

    state = {
        name: '',
        isUploading: false,
        fileURL: '',

    }

    handleUploadStart = () => {
        this.setState({
            isUploading:true
        })

    }

    handleUploadError = () => {
        this.setState({
            isUploading:false
        })
    }

    //Nos ayuda a saber qué pasa después que la imagen se carga.
    handleUploadSuccess = (filename) => {
        this.setState({
            name:filename,
            isUploading:false
        });

        firebase.storage().ref(this.props.dir) //"child" es lo que quiero encontrar; "url" es lo que obtengo de regreso.
        .child(filename).getDownloadURL()
        .then( url => {
            this.setState({fileURL: url})
        })

        this.props.filename(filename)
    }

    /**-Particularidad de REACT 16x (o algo así). Se carga antes que se cargue todo el resto; recibe nuevas propiedades a las que le quiero 
     * cambiar el estado (???) para que después sea renderizado con el nuevo estado.
     * -Recibe las proximas props y el proximo estado (???).
     * -SIEMPRE tengo que devolver algo con esta función.
     * - EN ESTA EN PARTICULAR QUIERO CHECKEAR SI TENGO DEFAULT IMAGES, SI TENGO, REEMPLAZA UN ESTADO POR OTRO.*/
    static getDerivedStateFromProps(props, state) {
        if (props.defaultImg) { //props = las próximas props.... SI tengo una "defaultImg", quiero arrancar con un estado distinto.
            return state = {
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }
        return null
    }


    uploadAgain = () => { //devuelve el state a 0.
        this.setState({
            name: '',
            isUploading: false,
            fileURL: '',
        });
        this.props.resetImage()
    }


    render() {
        return (
            <div>
                {!this.state.fileURL ?
                    <div>
                        <div className="label_inputs">{this.props.tag}</div>
                        <FileUploader
                            accept="image/*" //especifico que quiero aceptar TODO TIPO de imágenes.
                            name="image"
                            randomizeFilename //Crea un un nombre random para un archivo (que es guardado en firebase).
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={ this.handleUploadStart }
                            onUploadError={ this.handleUploadError }
                            onUploadSuccess={ this.handleUploadSuccess }
                        />



                    </div>

                    : null
                }
                { this.state.isUploading ?
                    <div className="progress"
                        style={{textAlign:'center', margin:'30px 0'}} //0 desde los costados (???)
                    >
                        <CircularProgress
                            style={{color:'#98c6e9'}}
                            thickness={7}
                        />

                    </div>
                :null                
                }
                { this.state.fileURL ? 
                    <div className="image_upload_container">
                        <img
                            style={{
                                width:'100%'
                            }}
                            src={this.state.fileURL}
                            alt={this.state.name}
                        />
                        <div className="remove" onClick={()=>this.uploadAgain()}>

                        </div>
                    </div>

                :null

                }
            </div>
        );
    }
}

export default Fileuploader;