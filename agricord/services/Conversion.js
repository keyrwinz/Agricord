export default {
  getLFromMl(value){
    return parseFloat(parseFloat(value) / 1000); 
  },
  getUnitsAbbreviation(units){
    switch(units){
      case 'Litres (L)': return 'L';
      case 'Millilitres (ml)': return 'ml';
      case 'Kilograms (kg)': return 'kg';
    }
  },
  getConvertedUnit(payload, payloadValue){
    if(parseFloat(payloadValue) % 1000 === 0){
      let result = null
      switch(payload){
        case 'Liters (L)':
          result = parseFloat(payloadValue) / 1000
          return result + ' m3'
        case 'Litres (L)':
          result = parseFloat(payloadValue) / 1000
          return result + ' m3'
        case 'Milliliters (ml)':
          result = parseFloat(payloadValue) / 1000
          return result + ' L'
        case 'Millilitres (ml)':
          result = parseFloat(payloadValue) / 1000
          return result + ' L'
        case 'Kilograms (kg)':
          result = parseFloat(payloadValue) / 1000
          return result + ' tonne'
        case 'Grams (g)':
          result = parseFloat(payloadValue) / 1000
          return result + ' kg'
        case 'Milligrams (mg)':
          result = parseFloat(payloadValue) / 1000
          return result + ' mg'
      }
    }else{
      let unit = this.getUnitsAbbreviation(payload)
      return payloadValue + ' ' + unit
    }
  }
}