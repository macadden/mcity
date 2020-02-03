import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import Fileuploader from '../../ui/fileuploader';

import { firebasePlayers , firebaseDB , firebase } from '../../../firebase';

class AddEditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: 'false',
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input.... */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Player Name',
                    name: 'name_input', /**el "name" es solo un HTML. */
                    type: 'text'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            Lastname: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input.... */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Player Last name',
                    name: 'lastname_input', /**el "name" es solo un HTML. */
                    type: 'text'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            number: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input.... */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Player Number',
                    name: 'number_input', /**el "name" es solo un HTML. */
                    type: 'text'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            position: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'select', /**"element" es el tipo de elemento que tengo.*/
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Select a position',
                    name: 'select_position', /**el "name" es solo un HTML. */
                    type: 'select',
                    options: [ //los SELECT siempre van a tener una KEY y un VALUE (los agrego a mano porque solo son 4).
                        { key: "Keeper", value: "Keeper" },
                        { key: "Defence", value: "Defence" },
                        { key: "Midfield", value: "Midfield" },
                        { key: "Striker", value: "Striker" }
                    ]
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            image:{
                element:'image',
                value:'',
                validation:{
                    required: true
                },
                valid: false
            }
        }

    }

    updateFields = (player, playerId, type, defaultImg) => {
        const newFormdata = {...this.state.formdata}

        for(let key in newFormdata){
            newFormdata[key].value = player[key];
            newFormdata[key].valid = true
        }

        this.setState({
            playerId, //Esto es ES6, es lo mismo que: "playerId: playerId".
            defaultImg,
            formType,
            formdata: newFormdata
        })
    }

    componentDidMount(){
        const playerId = this.props.match.parms.id;

        if(!playerId){
            this.setState({
                formType:'Add player'
            })
        } else {
            firebaseDB.red(`players/${playerId}`).once('value')
            .then(snapshot => {
                const playerData = snapshot.val();

                firebase.storage.ref('players')
                .child(playerData.image).getDownloadURL()
                .then( url => {
                    this.updateFields(playerData, playerId, 'Edit player', url)
                }).catch( e => {
                    this.updateFields({
                       ...playerData,
                       image: ''
                    }, playerId, 'Edit player', '')
                })

            })
        }
    }

    /**-Toma un elemento; accede al elemento a través del id y agrega el event, target y value.
     * -content= '': es algo de ES6. Si no tenemos el argumento cuando "updateForm" es llamada, "content" va a ser igual a nada; pero si tengo un argumento para
     * "content" va a ser igual a lo que esté pasando (solo va a tener valor para "FILENAME")
    */
    updateForm(element, content= '') { //El mismo "updateForm" de "index" de "SignIn". Sirve para poder  escribir en las cajitas (Referee, etc).

        const newFormdata = { ...this.state.formdata } /**Copia de "formdata" donde voy a MANIPULAR, porque no es bueno manipular directamente "state" */
        const newElement = { ...newFormdata[element.id] }/**"- newElement" es la copia del ELEMENTO, no solo de la info.
                                                            - Mediante el "id" del elemento copio al mismo.
                                                            - Dentro del elemento tengo el EVENTO y dentro de este el VALOR de los caracteres
                                                              que usuario está mandando por medio del input.*/
        if(content === ''){
            newElement.value = element.event.target.value;/**-el "value" de "newElement" es el de la línea 20, además contiene el valor de lo que el usuario tipea. 
                                                             -OJO CON: "event.target".*/
        } else { //SI ENTRA ACÁ ES PORQUE ES UNA IMAGEN.
            newElement.value = content
        }

        let validData = validate(newElement) /**en "validData" voy a recibir un Array. */
        newElement.valid = validData[0]; /**posición 0 del array (que va a ser V o F). */
        newElement.validationMessage = validData[1]
 
        newFormdata[element.id] = newElement;

        console.log(newFormdata)

        this.setState({
            formError: false,
            formdata: newFormdata
        })

    }

    successForm = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({
                formSuccess: message
            });
        }, 2000)
    }

    submitForm(event) {
        event.preventDefault(); /**Cancela el evento, si este es cancelable, sin detener el resto del funcionamiento del evento. Es decir, puede ser llamado de nuevo.*/

        let dataToSubmit = {}; /**la variable donde voy a guardar lo que vaya a enviar arranca como un OBJETO VACÍO. */
        let formIsValid = true; /**Al ppio asumo que todos los inputs son válidos. */

        /**-Tengo que checkear si todos los elementos de "formdata" son verdaderos.
         * -En cada loop voy a agarrar la key de formdata y pushear un nuevo valor para "dataToSubmit", que va a estar emparejada con la key (voy a ir llenando "dataToSubmit").
         */
        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid; /**Chequeo si el formato es válido (o sea true). Siempre chequear las dos cosas son válidas; si lo son ¿formIsValid se mantiene true? */
        }




        /**-si "formIsValid" es true, imprimo en consola los datos, si no pongo en "true" el "formError" de "setState", que cambia a "true" el "formError" de "state". 
          -"orderByChild()" = consulta de datos de firebase: https://firebase.google.com/docs/database/admin/retrieve-data?hl=es-419#section-queries 
          -".then" es la PROMESA que se devuelve.
         */
        if (formIsValid) { //checkeo si quiero agregar algo a algún partido o agregar UN partido.
            if(this.state.formType === 'Edit player'){
                firebaseDB.ref(`players/${this.state.playerId}`)     
                .update(dataToSubmit).then(()=>{
                    this.successForm('Update correctly');
                }).catch(e=>{
                    this.setState({formError: true})
                })


            } else { //ESTOY AGREGANDO UN JUGADOR, ASÍ QUE SOLO ENTRO ACÁ SI ES DISTINTO A 'EDIT PLAYER'.
                firebasePlayers.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_players')
                }).catch((e)=>{
                    this.setState({
                        formError: true
                    })
                })
            }
            
        } else {
            this.setState({
                formError: true
            })
        }
    }

    resetImage = () => { //setea la imagen a 0.
        const newFormdata = {...this.state.formdata}
        newFormdata['image'].value ='';
        newFormdata['image'].valid =false;
        this.setState({
            defaultImg:'',
            formdata: newFormdata
        })
    }

    storeFilename = (filename) => {
        this.updateForm({id:'image'},filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.submit.form(event)}>
                            
                            <Fileuploader 
                                dir="players" /**dir: Despues que actualizo algo en firebase, necesito guardarlo en un directorio. Si no paso
                                                 un "dir" (directorio), se guardaría en el "route" cuando yo lo quiero guardar en un directorio
                                                 con un nombre en particular. */
                                tag={"Player image"} //tag: "player name" o "player last name".
                                defaultImg={this.state.defaultImg}//Esto es por si no tengo una imagen.
                                defaultImgName={this.state.formdata.image.value}
                                resetImage={()=> this.resetImage()}
                                filename={(filename)=> this.storeFilename(filename)}
                            />

                            
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}

                            />
                            <FormField
                                id={'Lastname'}
                                formdata={this.state.formdata.lastname}
                                change={(element) => this.updateForm(element)}

                            />
                            <FormField
                                id={'number'}
                                formdata={this.state.formdata.number}
                                change={(element) => this.updateForm(element)}

                            />
                            <FormField
                                id={'position'}
                                formdata={this.state.formdata.position}
                                change={(element) => this.updateForm(element)}

                            />

                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">

                                    Something is wrong

                                    </div>

                                : ''
                            }
                            <div className="admin_submit">
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </AdminLayout>
        );
    }
}

export default AddEditPlayers;