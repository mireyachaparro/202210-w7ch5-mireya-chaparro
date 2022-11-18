import { Router } from 'express';
import { RobotController } from '../controller/robot.controller';
import { RobotRepository } from '../data/robot.repository';

export const robotRouter = Router();

const controller = new RobotController(new RobotRepository());

robotRouter.get('/', controller.getAll.bind(controller));
robotRouter.get('/:id', controller.get.bind(controller));
robotRouter.post('/', controller.post.bind(controller));
// robotRouter.patch('/:id', controller.patch.bind(controller));
robotRouter.delete('/:id', controller.delete.bind(controller));
