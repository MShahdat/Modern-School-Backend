import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { academicRuleController } from "./rules.controller";


const route = Router({ mergeParams: true })

route.post(
  '/',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  academicRuleController.createRule
)


route.get(
  '/all-rule',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  academicRuleController.getAllRules
)


route.get(
  '/:academicRuleId',
  academicRuleController.getRule
)


route.put(
  '/:academicRuleId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  academicRuleController.updateRule
)



route.patch(
  '/:academicRuleId',
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  academicRuleController.deleteRule
)

export const academicRuleRouter = route