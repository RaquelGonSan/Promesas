let promesa1 = new Promise((response, reject) => {
    //let resp = 'Esta es la respuesta del servicio';
    setTimeout(() => {
        let resp = {
            response: 200,
            description: '1. Esta descripcion es importante',
        }
        response(resp);     //en el caso que no le llegue la respuesta sse irá por el reject
        reject('Falló');
    }, 3000)
   
})

let promesa2 = new Promise((response, reject) => {
    //let resp = 'Esta es la respuesta del servicio';
    setTimeout(() => {
        let resp = {
            response: 200,
            description: '2. Esta descripcion tarda mucho en cargarse',
        }
        response(resp);     //en el caso que no le llegue la respuesta sse irá por el reject
        reject('Falló');
    }, 5000)
   
})

let promesa3 = new Promise((response, reject) => {
    //let resp = 'Esta es la respuesta del servicio';
    setTimeout(() => {
        let resp = {
            response: 200,
            description: '3. Esta descrippcion es rápida',
        }
        response(resp);     //en el caso que no le llegue la respuesta sse irá por el reject
        reject('Falló');
    }, 1500)
   
})

//la piramide de la perdicion --> NO SE USA
/*promesa1.then(res => {
    console.log(res.description);
    promesa2.then(res => {
        console.log(res.description)
        promesa3.then(res => {
            console.log(res.description)
        }).catch(error => {
            console.warn(error)
        })
    }).catch(error => {
        console.warn(error)
    })
}). catch(error => {
    console.error(error);
})*/


//mantenemos la secuencialidad
//primero se ejecuta la Promesa1 tras 3 segundos
//2 segundos más tarde se ejecuta la Promesa2
//la Promesa3 se ejecuta inmediatamente despues, ya que ya estaba cargada de antes(esta solo tardo un segundo en estar cargada)
async function ejecutarPromesa(){
    let respProm1 = await promesa1
    console.log(respProm1);

    let respProm2 = await promesa2
    console.log(respProm2);

    let respProm3 = await promesa3
    console.log(respProm3);
}

ejecutarPromesa();



async function crearPost(titulo, contenido){
    try{
        let resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titulo,
                body: contenido,
                userId: 1
            })
        })
        if(!resp.ok){
            throw new Error('No se pudo crear el registro' +resp.statusText);
        }
        let data = await resp.json();
        console.log('Registro creado correctamente ' ,data);
    } catch(error){

        console.error('Error al crear el registro ' ,error);
    }
}

crearPost('Nuevo post', 'Contenido del post');


fetch('https://jsonplaceholder.typicode.com/posts/5',{
      method:'PUT',
      headers: {
            'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title:'Nuevo titulo',
        body:'Nueva descripcion',
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log('Error: ' ,error))
