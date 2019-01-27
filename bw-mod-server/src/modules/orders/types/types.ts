export class PassengerOr {
    constructor(public passengerType: string, public fullName?: string, public emailAddress?: string) {}
}
export class FieldEntry {
    constructor(public fieldId: string, public fieldLabel: string, public fieldDescription: string, fieldRegex?: string) {}
}
export class PassengerOrEntry {
    constructor(public passengerType: string, public fullName?: FieldEntry, public emailAdress?: FieldEntry, public additionalFields?: FieldEntry[]) {}

}
export class PaymentEntry {
    // later
}
export class TranslatableNotification {}
export class TranslatedNotification {}
export class PassengerAndPaymentEntries {
    constructor(public passengerEntries: PassengerOrEntry[], public paymentEntries: PaymentEntry[], public notifications: Array<TranslatableNotification | TranslatedNotification>) {};
}