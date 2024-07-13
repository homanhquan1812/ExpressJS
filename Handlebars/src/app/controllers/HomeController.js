class HomeController
{
    // [GET] /
    async homepage(req, res, next)
    {
        const sessionName = req.session.name

        try {
            await res.render('home',  {
                layout: false,
                style: [
                    '/css/site.css',
                    '/css/bootstrap.min.css',
                    '/css/style.css'
                ],
                script: [
                    '/js/bootstrap.bundle.min.js',
                    '/js/site.js',
                    '/js/jquery.min.js'
                ],
                title: 'Homepage',
                sessionName
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new HomeController