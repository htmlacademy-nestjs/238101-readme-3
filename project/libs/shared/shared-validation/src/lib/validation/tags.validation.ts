import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const isTagOneWord = (tag: string) => tag.split(' ').length === 1;
const isTagStartsWitLetter = (tag: string) => RegExp(/[a-z]/i).test(tag[0]);

@ValidatorConstraint({ name: 'TagOneWord', async: false })
export class IsTagOneWord implements ValidatorConstraintInterface {
  validate(tag: string) {
    return isTagOneWord(tag);
  }

  defaultMessage() {
    return `Tag is not a one word`;
  }
}

@ValidatorConstraint({ name: 'TagStartsWithLetter', async: false })
export class IsTagStartsWithLetter implements ValidatorConstraintInterface {
  validate(tag: string) {
    return isTagStartsWitLetter(tag);
  }

  defaultMessage() {
    return 'Tag is not starts with letter';
  }
}
