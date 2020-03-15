// From https://angular.io/api/forms/AbstractControl#status

export enum EAngularFormStatus {
  valid = 'VALID', // This control has passed all validation checks.
  invalid = 'INVALID', // This control has failed at least one validation check.
  pending = 'PENDING', // This control is in the midst of conducting a validation check.
  disabled = 'DISABLED' // This control is exempt from validation checks.
}
