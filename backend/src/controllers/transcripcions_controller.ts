import { Request, Response } from 'express';
import { TranscriptionModel } from "../models/transcription_model.js";
import { CreateTranscriptionRequest } from '../types/transcription.types.js';

export class transcripcionsController {

    static async getTranscripcions(req: Request, res: Response) {
        try {
            // capturamos la id pasada por URL
            const { id } = req.params;
            console.log('🔍 --- getTranscripcions --- recibid:', id);

            // llamamos al modelo para que nos devuelva la transcripcion
            const findTranscripcion = await TranscriptionModel.getTranscripcions( id );

            // si no se ha encontrado las transcripciones
            if (!findTranscripcion) {
                return res.status(404).json({ message: 'No se ha encontrado la transcripcion' });
            }

            // aqui llegara si ha encontrado las transcripciones
            return res.json(findTranscripcion);
        } catch (error) {
            console.error('❌ getTranscripcions error :', error);
            return res.status(500).json({ message: 'Error interno' });  
        }
    }

    static async createNewTranscription(req: Request, res: Response) {
        try {
            // verificamos que el body tenga los datos necesarios en el tipo correcto
            const { idUser, transcripcion, tags, lenguaje }: CreateTranscriptionRequest = req.body;

            console.log('📝 --- createNewTranscription --- datos:', { idUser, transcripcion, tags, lenguaje });

            // creamos nueva transcripción
            const newTranscription = await TranscriptionModel.createNewTranscription({ idUser, transcripcion, tags, lenguaje });

            // si no se ha creado la transcripción...
            if (!newTranscription) {
                return res.status(500).json({ message: 'Error al crear la transcripción' });
            }

            console.log('📝 --- createNewTranscription --- datos:', { idUser, transcripcion, tags, lenguaje });


            return res.json(newTranscription);

        } catch (error) {
            console.error('❌ createNewTranscription error:', error);
            return res.status(500).json({ message: 'Error interno' });
        }
    }
}