import Fast from '../models/fast.model.js';

export const getFasts = (req, res) => {
    res.send(`on fasts list page, ${req.user.username}!`);
    /* Fast.find()
        .then(fasts => res.json(fasts))
        .catch(err => res.status(400).json('Error: ' + err)); */
}

export const addFast = (req, res) => {
    const startTime = Date.parse(req.body.starttime);
    const endTime = Date.parse(req.body.endTime);
    // TODO: register user id
    const user = req.body.user;

    const newFast = new Fast({
        startTime,
        endTime,
        user
    });

    newFast.save()
        .then(() => res.json('Fast added!'))
        .catch(err => res.status(400).json('Error') + err);
}

export const deleteFast = (req, res) => {
    Fast.findByIdAndDelete(req.params.id)
        .then(() => res.json('Fast deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
}