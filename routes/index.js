import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  req.repositories.user.getAllUsersByGroupId(919)
    .then((users) => (
      Promise.all(users.map(async (user) => {
        const { getTotalOpenedAssigneesByUserId } = req.repositories.mergeRequest
        const totalAssignees = await getTotalOpenedAssigneesByUserId(user.id)
        return {
          ...user,
          totalAssignees
        }
      }))
    ))
    .then((users) => res.render('index', { users }))
})

router.get('/details/:id', (req, res) => {
  const userId = req.params.id
  req.repositories.mergeRequest.getAllOpennedAssignedMRByUserId(userId)
    .then((mergeRequests) => res.render('details', { mergeRequests }))
})

export { router }
