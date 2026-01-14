// validator
import {FormGroup} from "@angular/forms";

export const WhiteValidator = (controlName: string) => {

  return (formGroup: FormGroup) => {

    const control = formGroup.controls[controlName];

    if (control.errors && control.errors['whiteSpace']) {

      return;

    }

    if(control.value === null){
      return;
    }

    if(control.value?.toString().trim() === '') {
      control.setErrors({ whiteSpace: true });
    } else {
      control.setErrors(null);
    }

  }

}
