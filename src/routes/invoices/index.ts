import { Router, urlencoded } from 'express'
import { createPaymentsProcessor } from '../../factories/payments-processor-factory'
import { getMasterDbClient } from '../../database/client'
import { InvoiceRepository } from '../../repositories/invoice-repository'

import { getInvoiceRequestHandler } from '../../handlers/request-handlers/get-invoice-request-handler'
import { getInvoiceStatusRequestHandler } from '../../handlers/request-handlers/get-invoice-status-request-handler'
import { postInvoiceRequestHandler } from '../../handlers/request-handlers/post-invoice-request-handler'

const invoiceRouter = Router()
const dbClient = getMasterDbClient()
const invoiceRepository = new InvoiceRepository(dbClient)
const paymentsProcessor = createPaymentsProcessor(invoiceRepository)

invoiceRouter
    .use((req, _res, next) => {
      req['paymentsProcessor'] = paymentsProcessor
      next()
    })
  .get('/', getInvoiceRequestHandler)
  .get('/:invoiceId/status', getInvoiceStatusRequestHandler)
  .post('/', urlencoded({ extended: true }), postInvoiceRequestHandler)

export default invoiceRouter
