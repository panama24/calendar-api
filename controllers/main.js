const getTableData = (res, rq, db) => {
  db.select('*').from('events')
    .then(e => {
      if (e.length) {
        res.json(e);
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const postTableData = (req, res, db) => {
  const { startTime } = req.body;
  const createdAt = new Date();
  db('events').insert({ createdAt, startTime })
    .returning('*')
    .then(e => {
      res.json(e);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const putTableData = (req, res, db) => {
  const { id, startTime } = req.body;
  db('events').where({ id }).update({ startTime })
    .returning('*')
    .then(e => {
      res.json(e);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.body;
  db('events').where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' });
    })
    .catch(err => req.status(400).json({ dbError: 'db error' }));
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
};
