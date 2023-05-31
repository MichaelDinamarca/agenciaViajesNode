import { Testimonial } from "../models/Testimoniales.js";
const guardarTestimonial = async(req, res) =>{

    // Validar...el formulario
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){//.trim elimina los espacios vacios al comienz y al final
        errores.push({mensaje:'El nombre esta vacio'});//para meterlo a la array errores
    }
    if(correo.trim() === ''){
        errores.push({mensaje:'El correo esta vacio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje:'El mensaje esta vacio'});
    }

    if(errores.length > 0){

        // Consultar Testimoniles existentes
        const testimoniales = await Testimonial.findAll();
        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje, //estas ultimas tres valores es para que se queden en el form si hay un error y no comenzar de 0
            testimoniales
        })
    }else{
        // Almacenarlo en la db
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }

    }


    console.log(req.body);//es lo que el user pone en el formulario
}

export {
    guardarTestimonial
}