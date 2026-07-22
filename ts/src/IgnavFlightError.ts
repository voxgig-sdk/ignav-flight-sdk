
import { Context } from './Context'


class IgnavFlightError extends Error {

  isIgnavFlightError = true

  sdk = 'IgnavFlight'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IgnavFlightError
}

