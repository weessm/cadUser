class HomeController {
    async index(req, res) {
        res.json({ msg: 'successful request' })
    }
}

module.exports = new HomeController()