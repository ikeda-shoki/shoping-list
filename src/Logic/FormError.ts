export function isRequireError(value: string | null) {
  if (value === null || value === "") {
    return true;
  }
  return false;
}

export function isMaxlengthError(value: string | null, maxlength: number) {
  if (value && value.length >= maxlength) {
    return true;
  }
  return false;
}
