export function makeErrorObject(error) {
  let result;
  if (error && error.response && error.response.data) {
    result = {
      title: error.response.status,
      message: JSON.stringify(error.response.data.errors)
    }

    if (error.response.data.message) {
      result.title += ': ' + error.response.data.message
    } else {
      result.title += ' Ошибка. Обратитесь в техподдержку.'
    }
  } else {
    if (error.status) {
      result = {
        title: error.status + ' Ошибка',
        message: ''
      }
    } else {
      result = {
        title: 'Ошибка',
        message: ''
      }
    }

  }

  return result
}

export function calculatePrice(machine) {
  if (machine) {
    let price = 0;

    price = machine.vcpus * 280 + machine.boot_disk_size * 5.74;

    price += machine.memory/1024 * 210;

    return Math.round(price).toLocaleString('ru-RU');
  } else {
    return '—'
  }
}