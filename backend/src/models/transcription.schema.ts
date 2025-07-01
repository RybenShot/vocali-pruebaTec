import { Schema, model, Document } from 'mongoose';

// interfaces para TypeScript
export interface ITranscriptionItem {
    id?: string;
    message: string;
    createdAt?: Date;
    tags?: string[];
    lenguaje?: string;
}

export interface IUserTranscription extends Document {
    idUser: string;
    transcriptions: ITranscriptionItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Schemas para cada transcripción individual
const transcriptionItemSchema = new Schema<ITranscriptionItem>({
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String],
        default: []
    },
    lenguaje: {
        type: String,
        default: 'indefinido'
    }
});

// Schemas principal para las transcripciones de usuario
const userTranscriptionSchema = new Schema<IUserTranscription>({
    idUser: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    transcriptions: [transcriptionItemSchema]
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

export const UserTranscription = model<IUserTranscription>('UserTranscription', userTranscriptionSchema);