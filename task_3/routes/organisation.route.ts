import { Router } from 'express'
import { authenticate } from '../middleware/authenticate'
import { addUserToOrganisation, createOrganisation, getOrganisationById, getOrganisations, getUserOrganisation } from '../controllers/org.controller'

const organisationRoute = Router()

organisationRoute.get('/organisations', authenticate, getOrganisations)
organisationRoute.get('/organisations/:orgId', authenticate, getOrganisationById)
organisationRoute.post('/organisations', authenticate, createOrganisation)
organisationRoute.put('/organisations/:orgId/users', authenticate, addUserToOrganisation)
organisationRoute.get('/organisations/user-organisationa', authenticate, getUserOrganisation)


export default organisationRoute