const router = require('express').Router();
const Accounts = require('./accounts-model');
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  res.json(req.account);
});

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Accounts.create({
        name: req.body.name.trim(),
        budget: req.body.budget,
      });
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updated = await Accounts.updateById(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

module.exports = router;
