import { UserTranscription } from './transcription.schema.js';
import { CreateTranscriptionRequest } from '../types/transcription.types.js';

export class TranscriptionModel {
    
    static async getTranscripcions( id : string ) {
        const userTranscription = await UserTranscription.findOne({ idUser: id });
        return userTranscription
    }

    static async createNewTranscription({ idUser, transcripcion, tags, lenguaje }: CreateTranscriptionRequest) {
        // buscamos si el usuario ya existe
        let userTranscription = await UserTranscription.findOne({ idUser });
        console.log('📝 --- createNewTranscription --- buscando usuario:', idUser);
        
        const newTranscription = {
            message: transcripcion,
            createdAt: new Date(),
            tags: tags || [], // si no hay tags, se inicializa como array vacío
            lenguaje: lenguaje || 'indefinido' // si no hay lenguaje, se inicializa como 'indefinido'
        };

        if (userTranscription) {
            // si el usuario ya existe, añadimos una nueva transcripcion
            userTranscription.transcriptions.push(newTranscription);
            await userTranscription.save();
        } else {
            // si no existe, creamos nuevo usuario con la transcripcion
            userTranscription = new UserTranscription({
                idUser,
                transcriptions: [newTranscription]
            });
            await userTranscription.save();
        }

        // retornamos la última transcripción añadida
        const savedTranscription = userTranscription.transcriptions[userTranscription.transcriptions.length - 1];
        return savedTranscription;
    }
}