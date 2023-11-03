import { Router } from 'express';
import authenticationRoutes from '../public/routes/authenticationRoutes';

const publicRoutes: Router = Router();

publicRoutes.use('/', authenticationRoutes);

export default publicRoutes;
