import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck,
            fontSize: props.size,
            color: props.color,
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
            /** ...props.add */
        }}
    >
        {props.children}
    </div>

    if (props.link) {
        return (
            <Link to={props.linkto}>
                {template}
            </Link>
        )

    } else {
        return template
    }

}
/**-"forEach" es algo que nos da FIREBASE. 
 * -En "data.push" me meto y la variable "data" y traigo, de cada "childSnapshot", todo los valores ("val()") del contenido "..."; además
 * guardo en la variable "id" la key del "array" que tenemos como indicador del array en la base de FIREBASE para poder meterla más adelante
 * DENTRO del array.
 * -Entonces, en cada loop de "firebaseLooper", voy a ir trayendo la var "data".
*/
export const firebaseLooper = (snapshot) => {
    let data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data
}

export const reverseArray = (actualArray) => {
    let reversedArray = []; /**arranca como un array vacío */

    /**agarro el Aray actual, calculo la longitud (6) y le resto 1 (=5) porque el array empieza a contar desde 0 y si quiero ir a la posición
     * 6, por ejemplo, esta posición en realidad va a ser igual a 5. Después dice que mientras siga siendo mayor o igual a 0 va a seguir
     * iterando. Por último, dice que va a restarle 1 a i (i--), para ir recorriendo el array de atrás para adelante.
     * -Dentro del For, toma "reversedArray" que está vacío y con "push" mete el valor de la posición en la que estoy recorriendo ([i]).
     * -Las posiciones de "reversedArray" se recorren normalmente, de menor a mayor.
     */
    for(let i= actualArray.length-1;i>=0;i--){
        reversedArray.push(actualArray[i])
    }
    return reversedArray;
}


/**-ES CÓDIGO REUSABLE PORQUE VOY A IR CHECKEANDO MUY SEGUIDO SI LOS DATOS SON VÁLIDOS O NO.
 * -"validate" va a recibir "element" que tiene todos los datos de "email"; lo que necesito checkear es las reglas que rigen "validation". Además
 *  voy a acceder a "value".
 */
export const validate = (element) => {
    let error = [true,'']; /**-Al final voy a devolver un Array diciendo si es V o F con un msj.
                              -Por default es "true" (porque si no hay concordancia con los datos que me pasan (?), asumo que no necesita validación (?)) y paso un msj vacío. */
   
     /**-El chequeo de validación de email va a antes que "required" porque esta es más global e "email" más específica.
     *  -La linea de "valid = ..." es una línea de validación de emails que se puede googlear; hay muchas, esta es muy simple. 
     */
    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email':''}`;
        error = !valid ? [valid,message]: error
    }
    

    if(element.validation.required){ /**checkeo si "required" es "true" */
        const valid = element.value.trim() !== ''; /**-"trim()" devuelve la misma cadena pero sin de los espacios en blanco en ambos extremos. Es una línea que devuelve V o F. 
                                                      - LA LÓGICA DE ESTO ESTÁ AL REVÉS, DEBERÍA SER "!==", pero si pongo eso me devuelve "false" si escribo y "true" si lo dejo en blanco.*/
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid,message]: error /**-Si no es valida, devuelvo un array con "valid"=false y el "message" que obtengo si justamente no es valida (línea de arriba).
                                                -Si es valida, devuelve "error"; lo que significa que "error" va a seguir siendo "error" (el default). */
    }
    
    return error;

}
