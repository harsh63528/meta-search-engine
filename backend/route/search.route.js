import express from 'express'
import { Check } from '../controller/search.controller.js';

const Router=express.Router();

Router.get('/check',Check)

export default Router