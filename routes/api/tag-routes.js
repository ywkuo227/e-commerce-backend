const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagsData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allTagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this ID." });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedTag) {
      res.status(404).json({ message: "No tag found with this ID." });
      return;
    }

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagToDel = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagToDel) {
      res.status(404).json({ message: "No tag found with this ID." });
      return;
    }

    res.status(200).json(tagToDel);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
