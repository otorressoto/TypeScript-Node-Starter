import { RequestHandler } from 'express';

/**
 * GET /api
 * List of API examples.
 */
export let getApi: RequestHandler = (req, res) => {
  res.render('api/index', {
    title: 'API Examples',
  });
};
