export default {
  getLFromMl(value){
    return parseFloat(parseFloat(value) / 1000); 
  },
  getUnitsAbbreviation(units){
    switch(units){
      case 'Litres (L)': return 'L';
      case 'Millilitres (ml)': return 'ml';
      case 'Kilograms (kg)': return 'kg';
      default: return units;
    }
  }
}