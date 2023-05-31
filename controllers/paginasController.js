import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';


const paginaInicio = async (req, res)=>{//request lo que enviamos response lo que expres nos responde
    
    // Consulta 3 viajes del modelo Viaje

    const promiseDB = []; //esto y lo de abajo lo hacemos para que los await partan al mismo tiempo

    promiseDB.push(Viaje.findAll({limit: 3}));//aqui pedimos solo 3 viajes al db ORM
    promiseDB.push(Testimonial.findAll({limit: 3}));
    try {
        const resultado = await Promise.all(promiseDB);
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });//send imprime solo un texto 
    } catch (error) {
        console.log(error);
    }
};

const paginaNosotros = (req, res)=>{//request lo que enviamos response lo que expres nos responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });//render espera el nombre de una vista
    //----asi seria se pasaramos un objeto a una vista
    // const viajes = 'Viaje a Alemania';
    // res.render('nosotros', {//render espera el nombre de una vista y como segundo parametro le pasamos un obj
    //     viajes //llave y valor son lo mismo
    // });
};

const paginaViajes = async (req, res)=>{//request lo que enviamos response lo que expres nos responde
    // Consultar DB
    const viajes = await Viaje.findAll();

    console.log(viajes);
    
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res)=>{//request lo que enviamos response lo que expres nos responde
    
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

// Muestra un viaje por su Slug
const paginaDetalleViaje = async (req, res) =>{
    //console.log(req.params.viaje);// params se asocia con el comodin de index routes /:viaje en la ruta
    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where : {slug: slug}});

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}



export {
    paginaInicio, 
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}