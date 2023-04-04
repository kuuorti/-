const express = require('express');
const router = express.Router();
const Video = require('../models/video');

router.get('/videos', (req, res) => {
  Video.find({})
    .then(videos => res.json(videos))
    .catch(error => res.status(500).json({ error }));
});

router.post('/videos', (req, res) => {
  const video = new Video(req.body);
  video.save()
    .then(() => res.json({ message: 'Video added successfully' }))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;

/*

Для начала нам нужно добавить возможность поиска видео по ключевым словам и/или категориям.
 Добавим новый маршрут /search в файл routes.js:



*/

router.get('/search', (req, res) => {
  const query = req.query.q;
  const category = req.query.category;
  const regex = new RegExp(query, 'i');
  
  const filter = category ? { category: category, title: regex } : { title: regex };
  
  Video.find(filter)
    .then(videos => res.json(videos))
    .catch(error => res.status(500).json({ error }));
});
 /*  

     В этом коде мы сначала получаем ключевое слово и категорию из запроса,
    затем создаем регулярное выражение для поиска по ключевому слову,
    и на основе этого создаем объект filter для поиска в базе данных.
    Если задана категория, мы ищем видео только в этой категории,
    а затем фильтруем результаты по ключевому слову.
*/


/*Добавим возможность получать список доступных категорий.
 Добавим новый маршрут /categories в файл routes.js:
 */
 router.get('/categories', (req, res) => {
    Video.distinct('category')
      .then(categories => res.json(categories))
      .catch(error => res.status(500).json({ error }));
  });

  /*
  Этот код использует метод distinct для получения уникальных значений поля category из базы данных.
  */

  