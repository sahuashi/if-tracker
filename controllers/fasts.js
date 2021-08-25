import Fast from '../models/fast.js';

export const getFasts = (req, res) => {
  Fast.find({ user: req.query.id })
    .then((fasts) => res.json(fasts))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

export const getFast = (req, res) => {
  Fast.findById(req.params.id)
    .then((fast) => res.json(fast))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

export const addFast = (req, res) => {
  const startTime = Date.parse(req.body.startTime);
  const endTime = Date.parse(req.body.endTime);
  const { user } = req.body;

  const newFast = new Fast({
    startTime,
    endTime,
    user,
  });

  newFast.save()
    .then(() => res.json('Fast added!'))
    .catch((err) => res.status(400).json('Error') + err);
};

export const editFast = (req, res) => {
  Fast.findById(req.params.id)
    .then((fast) => {
      fast.startTime = Date.parse(req.body.startTime);
      fast.endTime = Date.parse(req.body.endTime);
      fast.save()
        .then(() => res.json('Fast edited!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

export const deleteFast = (req, res) => {
  Fast.findByIdAndDelete(req.params.id)
    .then(() => res.json('Fast deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
