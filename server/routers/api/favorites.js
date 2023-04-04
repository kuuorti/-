const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Favorite = require('../../models/favorite');

// Add a video to favorites
router.post('/', auth, async (req, res) => {
  const { user, video } = req.body;

  try {
    const favorite = new Favorite({
      user,
      video,
    });

    await favorite.save();

    res.json(favorite);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Remove a video from favorites
router.delete('/:id', auth, async (req, res) => {
  try {
    let favorite = await Favorite.findById(req.params.id);

    if (!favorite) return res.status(404).json({ msg: 'Favorite not found' });

    // Make sure user owns favorite
    if (favorite.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await favorite.remove();

    res.json({ msg: 'Favorite removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Favorite not found' });
    }

    res.status(500).send('Server Error');
  }
});

module.exports = router;
