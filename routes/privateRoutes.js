const { Router } = require("express")
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node")
const privateController = require("../controllers/privateController")
const { validateNewStudent } = require("../validations/validators")

const route = Router()

route.get(
  "/dashboard",
  ClerkExpressWithAuth({}),
  privateController.getDashboard
)

route.get(
  "/dashboard/create",
  ClerkExpressWithAuth({}),
  privateController.getCreateForm
)

route.get(
  "/dashboard/update/:sid",
  ClerkExpressWithAuth({}),
  privateController.getUpdateForm
)

route.post(
  "/dashboard/create",
  ClerkExpressWithAuth({}),
  validateNewStudent,
  privateController.postCreateForm
)

route.post(
  "/dashboard/update/:sid",
  ClerkExpressWithAuth({}),
  privateController.patchUpdateForm
)

route.patch(
  "/dashboard/delete/:sid",
  ClerkExpressWithAuth({}),
  privateController.deleteStudent
)

module.exports = route
