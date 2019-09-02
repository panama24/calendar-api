const getEvents = (req, res, db) => {
  db.select('*').from('events')
    .then(e => {
      if (e.length) {
        res.json(e);
      } else {
        res.json([]);
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const postEvents = (req, res, db) => {
  const {
    description,
    endDateTime: end_date_time,
    startDateTime: start_date_time,
    title,
    type,
  } = req.body;
  db('events').insert({
    description,
    end_date_time,
    start_date_time,
    title,
    type,
  })
    .returning('*')
    .then(e => {
      res.json(e);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const putEvents = (req, res, db) => {
  const {
    id,
    description,
    end_date_time,
    start_date_time,
    title,
    type,
  } = req.body;
  db('events')
    .where({ id })
    .update({
      description,
      end_date_time,
      start_date_time,
      title,
      type,
    })
    .returning('*')
    .then(e => {
      res.json(e);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const deleteEvents = (req, res, db) => {
  const { id } = req.body;
  db('events').where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' });
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

module.exports = {
  getEvents,
  postEvents,
  putEvents,
  deleteEvents,
};
