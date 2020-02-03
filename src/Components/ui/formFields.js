/**-Es un "rsc" porque voy a estar devolviendo una función que devuelve un JSX 
 * - "formFields" me sirve por si tengo diferentes formas.
*/
import React from 'react';

/**-"formdata" e "id" son las "props".
 * - Uso destructuring ("{}") en lugar de palabra clave "props".
   - OJO, estoy trayendo también la propiedad CHANGE.
 */
const FormField = ({formdata,id,change}) => {

    const showError = () => {
        let errorMessage = <div className="error_label">
                {   /**1ro: checkeo que exista "formdata.validation"; 2do: si no es valido, despliego el mensaje de error, sino, nada.*/
                    formdata.validation && !formdata.valid ?
                        formdata.validationMessage
                    :null
                }
        </div>
        return errorMessage
   
    }
    
    const renderTemplate = () => {
        let formTemplate = null; /**El template de <form> devuelve null al ppio*/

        /**"switch" checkea qué tipo de input tengo en "email". */
        switch(formdata.element){
            case('input'):
                /**-Devuelvo un input (<input>).
                 * -"formdata.showlabel" es de "addEditMatch.js".
                 */
                formTemplate = (
                    <div>
                        {formdata.showlabel ?
                            <div className="label_inputs">
                               {formdata.config.label} 
                            </div>
                            :null                        
                        }
                        <input
                            {...formdata.config} /**Recibo todo lo que tengo en "config". */
                            value={formdata.value} /**un input tiene un value, así que tengo que poner un "value" */
                            onChange={(event)=> change({event,id})} /**Gatillo "change" de "Enroll". Además paso un objeto ("{}") con el EVENTO y el id ('email') del elemento; porque
                                                                       podría tener otro elemento en "formdata" del "state" de "Enroll", así que tengo que especificar.*/
                        />
                        { showError() }
                    </div>
                )
            break; /**en un "switch" el "break" tiene que estar. */
            case('select'):
                formTemplate = (
                    <div>
                        {formdata.showlabel ?
                            <div className="label_inputs">
                                {formdata.config.label}
                            </div>
                            : null
                        }
                        <select
                            value={formdata.value}
                            onChange={(event) => change({ event, id })}
                        >
                            <option value="">Select one</option>
                            {/**estas opciones son renderizadas dependiendo de lo que tenga en "state" > "local" >"options" de "addEditMatch.js".*/
                                formdata.config.options.map((item)=>( /**-La key que tenemos es del server. value=key, que viene ser el id. 
                                                                        -"item.value" es el nombre de lo que queremos como input.*/
                                    <option key={item.key} value={item.key}> 
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        { showError() }
                    </div>
                )
                break;
            default:
                formTemplate = null; /**si no es un input (o sea, si cometo algún error por ej.), devuelvo null */
           
        }
        return formTemplate;

    }

    /**Devuelvo "renderTemplate()" que es un JSX. */
    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;