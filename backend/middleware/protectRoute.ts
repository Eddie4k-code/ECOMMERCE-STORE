import express, {NextFunction, Request, Response} from 'express';


/* Middleware for protecting routes such as adding product, editing product, etc */


export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    
    const providedKey = req.headers.authorization

    if (providedKey == process.env.SECRET) {
        next();
    }  else {
        return res.status(403).json({message: "You are not authorized."})
    }


}