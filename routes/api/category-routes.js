const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    res.json(await Category.findAll({
      include: [
        { model: Product },
      ],
    }));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        { model: Product },
      ],
    });
    if (category === null) {
      res.status(404).json({ message: 'Not found by id' });
      return;
    }
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    await Category.create(req.body);
    res.status(201).json({ message: 'Created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body);
    res.status(200).json({ message: `Successfully updated ${req.params.id}`});
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    res.json( { message: await Category.destroy({
        where: {
          id: req.params.id,
        }
      })});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
