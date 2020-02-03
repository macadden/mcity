import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebaseTeams , firebaseDB , firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class AddEditMatch extends Component {
    /**-Apenas la app cargue, necesito checkear si tengo un ID (si es EDIT o MATCH)*/
    state = {
        matchId: '',
        formType: '',
        formError: 'false',
        formSuccess: '',
        teams: [],
        formdata: {
            date: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input.... */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Event date',
                    name: 'date_input', /**el "name" es solo un HTML. */
                    type: 'date'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            local: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'select', /**"element" es el tipo de elemento que tengo.*/
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Select a local team',
                    name: 'select_local', /**el "name" es solo un HTML. */
                    type: 'select',
                    options: []
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            resultLocal: {  /** "RESULTLOCAL" tiene que ser el mismo que en la base de datos. */
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input.... */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Result local',
                    name: 'result_local_input', /**el "name" es solo un HTML. */
                    type: 'text'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            away: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'select', /**"element" es el tipo de elemento que tengo.*/
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Select an a local team',
                    name: 'select_local', /**el "name" es solo un HTML. */
                    type: 'select',
                    options: []
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            resultAway: {  /** "RESULTLOCAL" tiene que ser el mismo que en la base de datos. */
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input.... */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Result local',
                    name: 'result_local_input', /**el "name" es solo un HTML. */
                    type: 'text'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            referee: {  /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input.... */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Referee',
                    name: 'referee_input', /**el "name" es solo un HTML. */
                    type: 'text'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            stadium: {  /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'input', /**"element" es el tipo de elemento que tengo el cual es un input.... */
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Stadium',
                    name: 'stadium_input', /**el "name" es solo un HTML. */
                    type: 'text'
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            result: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'select', /**"element" es el tipo de elemento que tengo.*/
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Team result',
                    name: 'select_result', /**el "name" es solo un HTML. */
                    type: 'select',
                    options: [
                        { key: 'W', value: 'W' },
                        { key: 'L', value: 'L' },
                        { key: 'D', value: 'D' },
                        { key: 'n/a', value: 'n/a' }
                    ]
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            final: {     /**En "..." PASO los atributos necesarios para generar el input.*/
                element: 'select', /**"element" es el tipo de elemento que tengo.*/
                value: '', /**El "element" tiene un "value", que cuando empieza está vacío. */
                config: { /**cada "element" tiene una configuración. */
                    label: 'Game played ?',
                    name: 'select_played', /**el "name" es solo un HTML. */
                    type: 'select',
                    options: [
                        { key: 'Yes', value: 'Yes' },
                        { key: 'No', value: 'No' }
                    ]
                },
                validation: { /**Siempre hay que agregar una validación. */
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
        }
    }

    updateForm(element) { //El mismo "updateForm" de "index" de "SignIn". Sirve para poder  escribir en las cajitas (Referee, etc).

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

    /**Si no tengo un match podría correr "updateFields" */
    updateFields(match,teamOptions, teams, type, matchId){
        const newFormdata = {
            ...this.state.formdata
        }

        /**-Loopeo todas las Keys dentro de formdata (state, local, away, etc) para ingresar los datos que quiero.
         * -Necesito checkear si quiero llenar con datos cualquier cosa que obtenga; entonces pregunto si tengo un match, si lo tengo actualizo
         * algo. Así, cambio el "value" de newFormdata por el "value" del match que esté manejando desde el servidor.
        */
        for(let key in newFormdata){
            if(match){
                newFormdata[key].value = match[key];
                newFormdata[key].valid = true;
            } //ahora modifico los "SELECTS" ("options:[]"). "local" y "away" son SELECTs; "||" = or.
            if(key === 'local' || key === 'away'){
                newFormdata[key].config.options = teamOptions
            }
        }
        // necesito actualizar el "state" con este nuevo "newFormdata" (o los datos que paso como parámetro).
        this.setState({
            matchId,
            formType:type,
            formdata: newFormdata,
            teams //es un array de equipos que viene desde el servidor.
        })
    }

    //Si tengo un ID, tengo que ir a buscar el ¿partido? correspondiente a ese ID.
    componentDidMount(){
        const matchId = this.props.match.params.id;
        /**-Va al servidor, busca una lista de equipos y al final obtengo el ID, la data sobre el partido y llena dinámicamente los inputs.*/
        const getTeams = (match, type) => {
            firebaseTeams.once('value').then(snapshot=>{
                const teams = firebaseLooper(snapshot); //uso "firebaseLooper" para traer la info de la manera que quiero.
                /**-"teams" tiene varias propiedades y para poder meter alguna de estas en el SELECT "Local" (que elije el equipo) no lo puedo hacer
                 * así no más como viene por defecto. Tengo una "key" y un "value" como en "formFields"; entonces tengo que modificar la lista de equipos
                 * y crear un Array diferente que termina siendo la "key" (que es el nombre del equipo) con un "value" (que puede ser el ID o el mismo nombre).
                 * -"teamsOptions" empieza como un array vacío.
                 * -Uso "forEach()" que usé para crear "firebaseLooper".
                 * -¿CHILDSNAPSHOT?
                 * - "teamOptions" tiene las opciones para pasarle al "SELECT".
                 */
                const teamOptions = [];

                snapshot.forEach((childSnapshot)=>{
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                });
                //Si no tengo un "match", podría correr "updateFields"
                this.updateFields(match,teamOptions, teams, type, matchId)
                
            })
        }


        //Si no tengo un "match", podría entrar al "ADD MATCH" o "EDIT MATCH".
        if(!matchId){
            getTeams(false, 'Add Match')
        } else { /**-Si tengo un match ID, voy a buscar toda la data del mismo (entro al tipo de forma "edit").
                    -"firebaseDB" y no "firebaseMatches" porque tengo que buscar por ID; puedo traer el "matchId" que quiero */
            firebaseDB.ref(`matches/${matchId}`).once('value')
            .then((snapshot)=>{
                const match = snapshot.val();
                /**-Va al servidor, busca una lista de equipos y al final obtengo el ID, la data sobre el partido y llena dinámicamente los inputs.
                 * -Paso "match" con toda la data del partido y "Edit Match" (que es el "type" de la "form")
                */
                getTeams(match, 'Edit Match')
            })
        }
    }

    //message='Updated correctly'
    successForm(message){
        this.setState({
            formSuccess: message
        });

        //Después de 2 segundos, limpio el msj de éxito.
        setTimeout(()=>{
            this.setState({
                formSuccess: ''
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

        /**-En la base de datos original hay dos KEYs/propiedades que NO aparecen en los datos que obtenemos en la consola por default ("localThmb" y "awayThmb"), porque por default yo no las agregué.
         * -Tomamos el nombre del equipo que se introduce vía SELECT, se mira en la base de datos y lo iguala con el nombre del equipo y de ahí se obtiene el "thmb" */
        this.state.teams.forEach((team)=>{
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb //creo un nuevo input.
            }
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb //creo un nuevo input.
            }
        })


        /**-si "formIsValid" es true, imprimo en consola los datos, si no pongo en "true" el "formError" de "setState", que cambia a "true" el "formError" de "state". 
          -"orderByChild()" = consulta de datos de firebase: https://firebase.google.com/docs/database/admin/retrieve-data?hl=es-419#section-queries 
          -".then" es la PROMESA que se devuelve.
         */
        if (formIsValid) { //checkeo si quiero agregar algo a algún partido o agregar UN partido.
            if (this.state.formType === 'Edit Match') { //Entro a la lógica para editar de firebase.
                firebaseDB.ref(`matches/${this.state.matchId}`)
                    .update(dataToSubmit).then(() => {
                        this.successForm('Updated correctly');
                    }).catch((e) => {
                        this.setState({ formError: true })
                    })
            } else { //firebase request para agregar un partido.
                firebaseMatches.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_matches'); //Redirecciona al usuario a "admin_matches". 
                }).catch((e)=>{
                    this.setState({ formError: true })
                })



            }

        } else { 
            this.setState({
                formError: true
            })
        }
    }


    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'date'}
                                formdata={this.state.formdata.date}
                                change={(element) => this.updateForm(element)}

                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper"></div>
                                <div className="left">
                                    <FormField
                                        id={'local'}
                                        formdata={this.state.formdata.local}
                                        change={(element) => this.updateForm(element)}

                                    />
                                </div>
                                <div>
                                    <FormField
                                        id={'resultLocal'}
                                        formdata={this.state.formdata.resultLocal}
                                        change={(element) => this.updateForm(element)}

                                    />
                                </div>
                            </div>

                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper"></div>
                                <div className="left">
                                    <FormField
                                        id={'away'}
                                        formdata={this.state.formdata.away}
                                        change={(element) => this.updateForm(element)}

                                    />
                                </div>
                                <div>
                                    <FormField
                                        id={'resultAway'}
                                        formdata={this.state.formdata.resultAway}
                                        change={(element) => this.updateForm(element)}

                                    />
                                </div>
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={'referee'}
                                    formdata={this.state.formdata.referee}
                                    change={(element) => this.updateForm(element)}

                                />
                                <FormField
                                    id={'stadium'}
                                    formdata={this.state.formdata.stadium}
                                    change={(element) => this.updateForm(element)}

                                />
                            </div>
                            
                            <div className="split_fields last" /**con "last" se salta la última línea divisora. */>
                                <FormField
                                    id={'result'}
                                    formdata={this.state.formdata.result}
                                    change={(element) => this.updateForm(element)}

                                />
                                <FormField
                                    id={'final'}
                                    formdata={this.state.formdata.final}
                                    change={(element) => this.updateForm(element)}

                                />

                            </div>

                            <div className="success_label">{this.state.formSuccess}</div>
                                {this.state.formError ? 
                                    <div className="error_label"> 
                                
                                    Something is wrong
                                
                                    </div>

                                    :''
                                }
                                <div className="admin_submit">
                                    <button onClick={(event)=> this.submitForm(event)}>
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

export default AddEditMatch;