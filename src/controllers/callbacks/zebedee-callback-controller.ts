import { CallbackHandler } from './handle-callback'
import { createLogger } from '../../factories/logger-factory'
import { fromZebedeeInvoice } from '../../utils/transform'
import { Invoice } from '../../@types/invoice'
import { IPaymentsService } from '../../@types/services'

const debug = createLogger('zebedee-callback-controller')

export class ZebedeeCallbackController extends CallbackHandler {
  public constructor(
    paymentsService: IPaymentsService,
  ) {
    super(debug, paymentsService)
  }

  protected parseInvoice = async (body: any): Promise<Invoice> => {
    return fromZebedeeInvoice(body)
  }
}
