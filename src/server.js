import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { config }  from 'dotenv';
import { rutas } from './rutas/rutas.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

config({ path: '../.env'})

const app = express();

app.use(bodyParser.json());
export const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings o Configuraciones
app.use(rutas)
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser())

//Corriendo el servidor
const PUERTO = process.env.PUERTO
const PORT = PUERTO || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}...`);
});