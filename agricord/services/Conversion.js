export default {
  getLFromMl(value){
    return parseFloat(parseFloat(value) / 1000); 
  },
  getUnitsAbbreviation(units){
    console.log('UNIT', units);
    switch(units){
      case 'Liters (L)': case 'Liter (L)': return 'L'
      case 'Litres (L)': case 'Litre (L)': return 'L'
      case 'Milliliters (ml)': case 'Milliliter (ml)': case 'Milliliter (mL)': return 'ml'
      case 'Millilitres (ml)': case 'Millilitre (ml)': case 'Millilitre (mL)': return 'ml'
      case 'Kilograms (kg)': case 'Kilogram (kg)': return 'kg'
      case 'Grams (g)': case 'Gram (g)': return 'g'
      case 'Milligrams (mg)': case 'Milligram (mg)': return 'mg'
      default: return units
    }
  },
  getConvertedUnit(payload, payloadValue){
    if(parseFloat(payloadValue) % 1000 === 0){
      let result = null
      switch(payload){
        case 'Liters (L)' || 'Liter (L)':
          result = parseFloat(payloadValue) / 1000
          return result + ' m3'
        case 'Litres (L)' || 'Litre (L)': 
          result = parseFloat(payloadValue) / 1000
          return result + ' m3'
        case 'Milliliters (ml)' || 'Milliliter (ml)':
          result = parseFloat(payloadValue) / 1000
          return result + ' L'
        case 'Millilitres (ml)' || 'Millilitre (ml)':
          result = parseFloat(payloadValue) / 1000
          return result + ' L'
        case 'Kilograms (kg)' || 'Kilogram (kg)':
          result = parseFloat(payloadValue) / 1000
          return result + ' tonne'
        case 'Grams (g)' || 'Gram (g)':
          result = parseFloat(payloadValue) / 1000
          return result + ' kg'
        case 'Milligrams (mg)' || 'Milligram (mg)':
          result = parseFloat(payloadValue) / 1000
          return result + ' mg'
      }
    }else{
      let unit = this.getUnitsAbbreviation(payload)
      return payloadValue + ' ' + unit
    }
  }
}