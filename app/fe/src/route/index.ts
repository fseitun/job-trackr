enum route {
    root = '/',
    jobList = '/',
    landing = '/',
    login = '/login',
    register = '/register',
    job = ':id',
    createJob = '/add',
    updateJob = '/:id/edit',
    addInterview = '/:id/add-interview',
    editInterview = ':id/edit-interview',
}

export default route;
