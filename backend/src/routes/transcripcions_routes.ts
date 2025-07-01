import { Router } from "express";
import { transcripcionsController } from "../controllers/transcripcions_controller";

const transcripcionsRouter = Router();

// GET de las transcripciones de un usuario
transcripcionsRouter.get('/:id', transcripcionsController.getTranscripcions);

// POST de nueva transcripción
transcripcionsRouter.post('/', transcripcionsController.createNewTranscription);

export default transcripcionsRouter;