import { createConnection } from 'mysql';
import { config }  from 'dotenv';

/** config se encarga de traernos las variables de entorno generadas en un archivo
    .env */
config({ path: '../.env'})

/** conexion es la ercargada de hacer la conexion a la BD */
export const conexion = createConnection({
    host: `${process.env.SERVIDOR}`,
    user: `${process.env.USUARIO}`,
    password: `${process.env.password}`,
    database: `${process.env.BD}`
});

/** conexion.connect se encarga de mostrar si se conecta o si ocurre un error */
conexion.connect((error) => {
    if (error) {
        console.log('Error al conectar: ');
    } else {
        console.log('Conexion exitosa..');
    }
});