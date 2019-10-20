const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async store(req, res){
       const { filename } = req.file;
       const { company, techs, price } = req.body;
       const { user_id } = req.headers;
// Usuario si no existe
        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({error: 'User does not exists'});
        }
// crear el nuevo spot
       const spot = await Spot.create({
           user: user_id,
           thumbnail: filename,
           company,
           techs: techs.split(',').map(tech => tech.trim()), //crea arreglos para varios registros separado entre comas y espacios
           price
       })

        return res.json(spot)
    }
};