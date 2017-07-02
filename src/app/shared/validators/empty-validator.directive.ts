import {Directive} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl, ValidatorFn} from '@angular/forms';

@Directive({
    selector: '[notEmpty][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: EmptyValidator, multi: true}
    ]
})
export class EmptyValidator implements Validator {
    validator: ValidatorFn;

    constructor() {
        this.validator = this.validateEmptySpaces();
    }

    validate(c: AbstractControl): { [p: string]: any } {
        return this.validator(c);
    }

    private validateEmptySpaces(): ValidatorFn {
        return (c: AbstractControl) => {

            let isValid = false;
            if (c.value && /\S/.test(c.value)) {
                isValid = true;
            }

            if (isValid) {
                return null;
            } else {
                return {
                    notEmpty: {
                        valid: false
                    }
                };
            }
        };
    }
}
