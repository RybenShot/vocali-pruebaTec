import express, { json, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import transcripcionsRouter from './routes/transcripcions_routes';
import { connectDB } from './config/database';

// Cargar variables de entorno
dotenv.config();

const app = express();

// middleware para la captura de parametros de POST
app.use(json());
app.use(cors());
app.disable('x-powered-by');

// rutas definidas
app.use('/transcripcions', transcripcionsRouter);

// Middlewares para manejar rutas no definidas o el de bienvenida
// Wellcome y 404
app.get('/', (req: Request, res: Response) => { 
    res.json({ message: 'Bienvenido a la API de Vocalid' }); 
});

app.use((req: Request, res: Response) => { 
    res.status(404).send('<h1>404, ruta no encontrada</h1>'); 
});

// Levantar servidor
const PORT = process.env.PORT ?? 1234;

// Conectar a la base de datos y luego iniciar servidor
const startServer = async () => {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor levantado en el puerto http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
};

startServer();