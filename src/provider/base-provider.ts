import { BaseServer } from "../server/base-server";

export class BaseProvider extends BaseServer{
  constructor() {
    // super('http://localhost:3000')
    super('/api')
  }
}

export const baseProvider = new BaseProvider()