import { BrokenQueue } from './broken-queue'

jest.setTimeout(30000)

export async function sleep (timeoutMs: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timeoutMs))
}
// Just a simple function I can spy on
const messagesReceived = {
  check: (message: string) => {}
}

const spy = jest.spyOn(messagesReceived, 'check')
describe('broken queue integration', () => {
  let sut: BrokenQueue

  async function purgeQueue() {
    // Is there a better way to purge the various `sub queues` apart from obliterate?
    return Promise.all(
      ['completed','wait','active','paused','delayed','failed']
        .map(jobState => sut['queue'].clean(5000, 100, jobState as any)))
  }

  describe('when sending multiple messages', () => {
    beforeAll(async () => {
      sut = new BrokenQueue(messagesReceived)
      await sut.initialise()
    })
    afterAll(async () => {
      await sut.dispose()
      await purgeQueue()
      spy.mockReset()
    })

    it('it should receive all four messages in the correct order', async () => {
      const fourMessages = ['one', 'two', 'three', 'four']
      // send all four messages - one after another to try to ensure predictable order
      for (const message of fourMessages) {
        await sut.send('test', message)
      }
      // start polling for messages
      sut.pollForMessages()
      // wait generously
      await sleep(6000)
      expect(spy).toHaveBeenCalledTimes(4)
      expect(spy).toHaveBeenNthCalledWith(1, 'one')
      expect(spy).toHaveBeenNthCalledWith(2, 'two')
      expect(spy).toHaveBeenNthCalledWith(3, 'three')
      expect(spy).toHaveBeenNthCalledWith(4, 'four')
    })
  })
})
