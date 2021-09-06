const jwt = require('jsonwebtoken');

// MIDDLEWARE DE L'AUTHENTIFICATION
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;

        // Si l'ID utilisateur ne correspond pas
        if (req.body.userId && req.body.userId !== userId) {
            throw "L'identifiant de l'utilisateur n'est pas valide";
        }
        // Si l'ID utilisateur correspond
        else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête incorrecte!')
        })
    }
}