export class PassengerOr {
    private additionalFields: string[];
    constructor(public passengerType: string, public fullName?: string, public birthDate?: number, public emailAddress?: string, public additional?: Field[]) {}

}

export class Field {
    constructor(public name: string, value: string) {}
}
export class FieldEntry {
    constructor(public fieldId: string, public fieldLabel: string, public fieldDescription: string, fieldRegex?: string) {}
}
export class PassengerOrEntry {
    constructor(public passengerId: string, public additionalFields?: FieldEntry[]) {}

}
export class PaymentEntry {
    // later
}
export class TranslatableNotification {}
export class TranslatedNotification {}
export class PassengerAndPaymentEntries {
    constructor(public passengerEntries: PassengerOrEntry[], public paymentEntries: PaymentEntry[], public notifications: Array<TranslatableNotification | TranslatedNotification>) {};
}