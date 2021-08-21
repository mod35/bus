type Uuid = string

export interface MessageAttributeMap {
  [key: string]: string | number | undefined
}

/**
 * Options that control the behaviour around how the message is sent and
 * additional information that travels with it.
 */
export class MessageAttributes<
  AttributeType extends MessageAttributeMap = MessageAttributeMap,
  StickyAttributeType extends MessageAttributeMap = MessageAttributeMap
> {
  /**
   * The ability to change the priority of the message within the queue.
   * Useful for events that trigger message producers that want to be processed
   * in some sort of relative order. Check the message transport to see if this
   * feature is supported.
   */
  priority?: number
  /**
   * An identifier that can be used to relate or group messages together.
   * This value is sticky, in that any messages that are sent as a result
   * of receiving one message will be sent out with this same correlationId.
   */
  correlationId?: Uuid

  /**
   * Additional metadata that will be sent alongside the message payload.
   * This is useful for sending information like:
   * - the id of a user where the message originated from
   * - the originating system hostname or IP for auditing information
   * - when the message was first sent
   *
   * These attributes will be attached to the outgoing message, but will not
   * propagate beyond the first receipt
   */
  attributes: AttributeType

  /**
   * Additional metadata that will be sent alongside the message payload.
   * This is useful for sending information like:
   * - The id of the user who originally sent the message that triggered this message
   *
   * These values are sticky, in that they will propagate for any message that
   * is sent as a result of receiving the message with sticky attributes.
   */
  stickyAttributes: StickyAttributeType

  constructor (properties?: {
    correlationId?: Uuid,
    attributes?: AttributeType,
    stickyAttributes?: StickyAttributeType,
    priority?: number
  }) {
    this.attributes = {} as AttributeType
    this.stickyAttributes = {} as StickyAttributeType
    this.priority = this.priority

    if (!!properties) {
      const { correlationId, attributes, stickyAttributes } = properties
      this.correlationId = correlationId
      this.attributes = attributes || {} as AttributeType
      this.stickyAttributes = stickyAttributes || {} as StickyAttributeType
    }
  }

}
