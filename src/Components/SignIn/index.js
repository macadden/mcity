//CHEQUEAR LOS COMENTARIOS PORQUE ESTÁN COPYPASTEADOS DE "ENROLL"
import React, { Component } from 'react';
import { firebase } from '../../firebase';

import FormField from '../ui/formFields';
import { validate } from '../ui/misc';

class SignIn extends Component {

    state = {
        formError: false, /**Al arrancar es falso (el error). */
        formSuccess: '', /**Inicialmente, si está todo bien, el msj va a estar en blanco. */
        formdata: {      /**En "formdata" van todos los "input" (podrían ser nombre, apelido, etc); pero en este caso solo va a ser "email"
                        - Si el input es "name" la propiedad tmb será "name" y así... */
            email: {     /**En "email" PASO los atributos necesarios para generar el input.*/
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input text. */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. Si el usuario escribe, esto es lo que cambia. */
                config: { /**cada "element" tiene una configuración. */
                    name: 'email_input', /**el "name" es solo un HTML. */
                    type: 'email', /**el input NO es un "type text" sino un "type of email". */
                    placeholder: 'Enter your email'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true, /**El "required" está porque el mail es requerido, no puedo poner "submit" y pasarlo por arriba.*/
                    email: true /**checkeo si verdaderamente es un email. */
                },
                valid: false, /**Agrego un atributo para verificar si es válido. Cuando la app empieza, no tengo una "value", así que empieza 
                                 como "false". Después de hacer el chekeo, antes de submit el server, cambia a "true". */
                validationMessage: '' /**Si obtengo un mensaje de error por validación. Cuando la app arranca, empieza como vacía. */
            },
            password: {     /**En "email" PASO los atributos necesarios para generar el input.*/
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input text. */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. Si el usuario escribe, esto es lo que cambia. */
                config: { /**cada "element" tiene una configuración. */
                    name: 'password_input', /**el "name" es solo un HTML. */
                    type: 'password', /**el input NO es un "type text" sino un "type of email". */
                    placeholder: 'Enter your password'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true, /**El "required" está porque el mail es requerido, no puedo poner "submit" y pasarlo por arriba.*/
                },
                valid: false, /**Agrego un atributo para verificar si es válido. Cuando la app empieza, no tengo una "value", así que empieza 
                             como "false". Después de hacer el chekeo, antes de submit el server, cambia a "true". */
                validationMessage: '' /**Si obtengo un mensaje de error por validación. Cuando la app arranca, empieza como vacía. */
            }
        }

    }


    updateForm(element) {
        const newFormdata = { ...this.state.formdata } /**Copia de "formdata" donde voy a MANIPULAR, porque no es bueno manipular directamente "state" */
        const newElement = { ...newFormdata[element.id] }/**"- newElement" es la copia del ELEMENTO, no solo de la info.
                                                                - Mediante el "id" del elemento copio al mismo.
                                                                - Dentro del elemento tengo el EVENTO y dentro de este el VALOR de los caracteres
                                                                  que usuario está mandando por medio del input.*/
        let validData = validate(newElement) /**en "validData" voy a recibir un Array. */
        newElement.valid = validData[0]; /**posición 0 del array (que va a ser V o F). */
        newElement.validationMessage = validData[1]

        newElement.value = element.event.target.value; /**-el "value" de "newElement" es el de la línea 20, además contiene el valor de lo que el usuario tipea. 
                                                             -OJO CON: "event.target".*/
        newFormdata[element.id] = newElement;

        console.log(newFormdata)

        this.setState({
            formError: false,
            formdata: newFormdata
        })
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
        if (formIsValid) {

            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            ).then(()=>{ //promesa si se cumple
                    this.props.history.push('/dashboard')
            }).catch(error =>{ //promesa si no se cumple
                this.setState({
                    formError: true
                })
            })



            //this.resetFormSuccess()
        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{ margin: '100px' }}>

                    <form onSubmit={(event) => this.onSubmitForm(event)}>

                        <h2>Please Login</h2>

                        <FormField /**esta es la referencia a "FormField", a la cual le paso la info de "email". Entonces "FormFiled" va
                                        * a checkear qué tipo de input tengo, la config, etc. ==> va a devolver un input con toda esta info.*/
                            /**"email" es el nombre de la key y tiene a "formdata" dentro, que a su vez contiene a "email" con el resto
                               de la data.
                              -"element" es un EVENTO que paso DESDE "formFields".
                              -La cuestión es gatillar "change" desde "formFields" con "onChange".
                              -"FormField" va a recibir si el elemento es válido o no y el "errorMassage" (si es que hay uno).
                               */
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}

                        />

                            {this.state.formError ? /**si tengo un "formError", despliego EN PANTALLA un "div" con un msj de error, si no, no hago nada. */
                                <div className="error_label">Something is wrong, try again</div>
                                : null
                            }

                        <FormField /**esta es la referencia a "FormField", a la cual le paso la info de "email". Entonces "FormFiled" va
                                        * a checkear qué tipo de input tengo, la config, etc. ==> va a devolver un input con toda esta info.*/
                            /**"email" es el nombre de la key y tiene a "formdata" dentro, que a su vez contiene a "email" con el resto
                               de la data.
                              -"element" es un EVENTO que paso DESDE "formFields".
                              -La cuestión es gatillar "change" desde "formFields" con "onChange".
                              -"FormField" va a recibir si el elemento es válido o no y el "errorMassage" (si es que hay uno).
                               */
                            id={'password'}
                            formdata={this.state.formdata.password}
                            change={(element) => this.updateForm(element)}

                        />

                        <button onClick={(event) => this.submitForm(event)}>Log in</button>

                    </form>

                </div>
            </div>
        );
    }
}

export default SignIn;