import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { ruleService } from "./rules.service";



//& CREATE 
const createRule = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const configId = req.params.siteConfigId as string

    const result = await ruleService.createInfo(body, configId)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "academic rule created successfully",
      data: result
    })
  }
)


//& GET ALL (ADMIN)
const getAllRules = catchAsync(
  async (req: Request, res: Response) => {

    const query = req.query
    const { rules, meta } = await ruleService.getAllRules(query)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic rules retrive successfully",
      data: rules,
      meta
    })
  }
)



//& GET SINGLE (PUBLIC)
const getRule = catchAsync(
  async (req: Request, res: Response) => {

    const ruleId = req.params.academicRuleId as string

    const result = await ruleService.getRule(ruleId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic rule retrive successfully",
      data: result
    })
  }
)


//& UPDATE
const updateRule = catchAsync(
  async (req: Request, res: Response) => {

    const body = req.body
    const ruleId = req.params.academicRuleId as string

    const result = await ruleService.updateRule(body, ruleId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "rule updated successfully",
      data: result
    })
  }
)


//& DELETED
const deleteRule = catchAsync(
  async (req: Request, res: Response) => {

    const ruleId = req.params.academicRuleId as string


    await ruleService.deleteRule(ruleId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic rule deleted successfully",
      data: null
    })
  }
)




export const academicRuleController = {
  createRule,
  getAllRules,
  getRule,
  updateRule,
  deleteRule
}



