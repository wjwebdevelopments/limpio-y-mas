const User = require('../models/user');
const bcrypt = require('bcryptjs');
const slug = require('slug');
const { nanoid } = require('nanoid');

exports.getUsers = (req, res) => {
    res.json({ msg: 'list of all users' });
}

exports.postUser = async (req, res) => {
    try {
        const userDB = await User.findOne({ email: req.body.email });
        if( userDB ) {
            return res.status(400).json({ msg: 'El email ya existe!' });
        }
        const user = new User(req.body);
        const slugName = slug(`${user.name}-${nanoid(10)}`);
        user.password = bcrypt.hashSync(user.password, 10);
        user.slugName = slugName;
        await user.save();
        res.json({ msg: 'El registro se ha creado exitosamente!', email: user.email });
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error!' });
    }
}
