import cors from 'cors';
import morgan from 'morgan';
import { robotRouter } from './router/robots.router.js';
import { usersRouter } from './router/users.js';
import { errorManager } from './middlewares/errors.js';
import { setCors } from './middlewares/cors.js';
import express from 'express';

export const app = express();

app.disable('x-powered-by');

const corsOptions = {
    origin: '*',
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use(setCors);

app.use((req, res, next) => {
    const origin = req.header('Origin') || '*';
    res.setHeader('Access-Control-Allow-Origin', origin as string);
    next();
});

app.get('/', (_req, res) => {
    res.send(
        `<h1>API Express de robots</h1><br>
        <p>/robots -> devuelve un array con todos los robots de la BD</p>
        <p>/robots/:idRobot -> devuelve un robot de la BD por id</p>
        <p>/robots/ -> recibe un robot (sin id), lo crea en la BD y devuelve el robot recién creado</p>
        <p>/robots/:idRobot -> recibe un robot, modifica en la BD el robot con la misma id que el recibido, y devuelve el robot modificado</p>
        <p>/robots/:idRobot -> elimina de la BD un robot por id y devuelve un objeto con la id</p>`
    ).end();
});

app.use('/robots', robotRouter);
app.use('/users', usersRouter);

app.use(errorManager);
