export interface TranscriptionItem {
    id: number;
    createdAt: string;
    message: string;
    tags?: string[];
    lenguaje?: string;
}

export interface UserTranscription {
    idUser: string;
    transcription: TranscriptionItem[];
}

export interface CreateTranscriptionRequest {
    idUser: string;
    transcripcion: string;
    tags?: string[];
    lenguaje?: string;
}