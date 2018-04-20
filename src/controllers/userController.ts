import { RequestHandler } from 'express';

class UserController {
  getUsers: RequestHandler = (req, res, next) => {
    return res.json(req.session);
  };
}

export default new UserController();
