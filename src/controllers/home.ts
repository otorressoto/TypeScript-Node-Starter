import { RequestHandler } from 'express';

/**
 * GET /
 * Home page.
 */
export let index: RequestHandler = (req, res) => {
  res.render('home', {
    title: 'Home',
  });
};
