"use strict";

import { Request, Response } from 'express';

export const indexHandler = (_req: Request, res: Response) => {
    res.render("index.html")
}

