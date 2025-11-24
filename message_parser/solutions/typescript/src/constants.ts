// class MessageParser {
//     private parsers: Record<MessageType, ParserFunction>;

//     constructor() {
//         this.parsers = {
//             [MessageType.Email]: this.parseEmail,
//             [MessageType.SMS]: this.parseSMS,
//             [MessageType.Slack]: this.parseSlack,
//         }
//     }

//     // private async parseEmail(body: string): Promise<Message> {
//         return {
//             sender: "email_sender",
//             receiver: "email_receiver",
//             body: "email_body",
//         }
//     }

//     private async parseSMS(body: string): Promise<Message> {
//         return {
//             sender: "sms_sender",
//             receiver: "sms_receiver",
//             body: "sms_body",
//         }
//     }

//     private async parseSlack(body: string): Promise<Message> {
//         return {
//             sender: "slack_sender",
//             receiver: "slack_receiver",
//             body: "slack_body",
//         }
//     }

//     public getParser(messageType: MessageType): ParserFunction {
//         return this.parsers[messageType];
//     }
// }
