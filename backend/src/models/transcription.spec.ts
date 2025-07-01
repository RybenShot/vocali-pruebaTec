import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock simple
vi.mock('./transcription.schema.js', () => ({
    UserTranscription: {
        findOne: vi.fn(),
        prototype: { save: vi.fn() }
    }
}));

import { TranscriptionModel } from './transcription_model';
import { UserTranscription } from './transcription.schema.js';

const mockUserTranscription = vi.mocked(UserTranscription);

describe('TranscriptionModel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getTranscripcions - retorna null si usuario no existe', async () => {
        mockUserTranscription.findOne.mockResolvedValue(null);
        
        const result = await TranscriptionModel.getTranscripcions( id: string );
        
        expect(result).toBeNull();
    });

    it('getTranscripcions - retorna transcripciones si usuario existe', async () => {
        const mockData = { idUser: "user1", transcriptions: [{ message: "test" }] };
        mockUserTranscription.findOne.mockResolvedValue(mockData);
        
        const result = await TranscriptionModel.getTranscripcions({ id: "user1" });
        
        expect(result).toEqual(mockData);
    });

    it('createNewTranscription - agrega a usuario existente', async () => {
        const mockUser = { 
            transcriptions: [], 
            save: vi.fn().mockResolvedValue(true) 
        };
        mockUserTranscription.findOne.mockResolvedValue(mockUser);
        
        const result = await TranscriptionModel.createNewTranscription({
            idUser: "user1",
            transcripcion: "nueva transcripcion"
        });
        
        expect(result.message).toBe("nueva transcripcion");
        expect(mockUser.save).toHaveBeenCalled();
        expect(mockUser.transcriptions).toHaveLength(1);
    });

});