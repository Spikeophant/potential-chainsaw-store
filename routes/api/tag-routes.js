const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    res.json(await Tag.findAll( {
      include: [
        { model: Product},
      ],
    }));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product },
      ],
    });
    if (tag === null) {
      res.status(404).json({ message: 'Not found by id' });
      return;
    }
    res.json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    await Tag.create(req.body);
    res.status(201).json({message:'Created successfully.'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body);
    res.status(200).json({message: `Successfully updated ${req.params.id}`})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    res.json( { deleted: await Tag.destroy( {
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
