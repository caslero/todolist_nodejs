import { createConnection } from 'mysql';
import { config }  from 'dotenv';

config({ path: '../.env'})

export const conexion = createConnection({
    host: process.env.SERVIDOR,
    user: process.env.USUARIO,
    password: process.env.password,
    database: process.env.BD
});

conexion.connect((error) => {
    if (error) {
        console.log('Error al conectar: ');
    } else {
        console.log('Conexion exitosa..');
    }
});

