function require(v) {
  return !!v || this.$t('validation.require');
}

function testEmail(v) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,12})+$/.test(v) || this.$t('validation.email');
}

function testPhone(v) {
  if (v) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/.test(v) || this.$t('validation.phone');
  } else {
    return true
  }
}

function testName(v) {
  return /^[a-zA-Zа-яёА-ЯЁ]{2,}$/.test(v) || this.$t('validation.name');
}

function testVmName(v) {
  return /^[a-zA-Z0-9а-яёА-ЯЁ][a-zA-Z0-9а-яёА-ЯЁ_:\.-]{2,}$/.test(v) || this.$t('validation.vmName');
}

function minLength6(v) {
  if (v) {
    return v.length >= 6 || this.$t('validation.min6');
  } else {
    return true
  }
}

function minLength3(v) {
  if (v) {
    return v.length >= 3 || this.$t('validation.min3');
  } else {
    return true
  }
}

function minValue100(v) {
  if (v) {
    return v >= 100 || this.$t('validation.minValue100');
  } else {
    return true
  }
}

export const validationFunctions = {
  require: require,
  testEmail: testEmail,
  testPhone: testPhone,
  minLength3: minLength3,
  minLength6: minLength6,
  minValue100: minValue100,
  testName: testName,
  testVmName: testVmName
}