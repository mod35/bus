import { Job, Queue, Worker } from 'bullmq'
import Redis from 'ioredis'
import * as uuid from 'uuid'

export type Connection = Redis.Redis
export interface MessagesReceived {
  check: (message: string) => void
}

export class BrokenQueue {
  private queueConnection: Connection
  private workerConnection: Connection
  private queue: Queue
  private worker: Worker
  private polling: boolean
  private messagesReceived: MessagesReceived
  private maxRetries: number

  constructor(messagesReceived: MessagesReceived) {
    this.messagesReceived = messagesReceived
  }

  async initialise() {
    console.log('initialising the queue')
    const configuration = {
      queueName: 'broken-test',
      connectionString: 'redis://127.0.0.1:6379',
    }
    this.maxRetries = 3
    this.queueConnection = new Redis(configuration.connectionString)
    this.workerConnection =new Redis(configuration.connectionString)

    this.queue = new Queue(configuration.queueName, {
      connection: this.queueConnection
    })

    this.worker = new Worker(configuration.queueName, undefined, {connection: this.workerConnection, concurrency: 1})
  }

  async dispose() {
    this.stopPollingForMessage()
    await this.queue.close()
    await this.worker.close()
    this.queueConnection.disconnect()
    this.workerConnection.disconnect()
    console.log('queue disposed')
  }

  async send (messageName: string, message: string, priority?: number): Promise<void> {
    await this.queue.add(messageName, message, {
      jobId: uuid.v4(),
      attempts: this.maxRetries,
      removeOnComplete: true,
      priority
    })
    console.log('Message added!', message)
  }

  stopPollingForMessage() {
    this.polling = false
  }

  async pollForMessages() {
    if (this.polling) {
     console.log('don\'t try to poll twice!')
    }
    this.polling = true
    while(this.polling) {
      const token = uuid.v4()
      const job = (await this.worker.getNextJob(token)) as Job<string> | undefined

      if (!job || !job.data) {
        console.log('no message received')
        continue
      }
      console.log('Received message from Redis', {redisMessage: job.data})
      this.messagesReceived.check(job.data)
      await job.moveToCompleted(job.data, token)
    }
  }
}
