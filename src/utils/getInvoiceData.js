const getInvoiceData = (records) => {
    
    const values = {
      clientName: "",
      phoneNumber: "",
      amountUSD: 0,
      amountTZS: 0,
      batchNumber: "",
      data: [],
    }

    records.forEach( (record, index) => {
      const recordValues = {
        trackNumber: "",
        particulars: "",
        unitPrice: "",
        weight:"",
        totalAmountUSD: 0,
        totalAmountTZS: 0
      }

      
        if(index === 0){
              recordValues.trackNumber = record.trackNumber;
              recordValues.particulars = record.particulars;
              recordValues.unitPrice = record.unitPrice;
              recordValues.weight = record.weight;
              recordValues.totalAmountUSD = record.totalPriceUSD;
              recordValues.totalAmountTZS = record.totalPriceTZS;

              values.clientName = record.clientName;
              values.phoneNumber = record.phoneNumber;
              values.amountUSD += record.totalPriceUSD;
              values.amountTZS += record.totalPriceTZS;
              

              values.data.push(recordValues)
        }else {
              recordValues.trackNumber = record.trackNumber 
              recordValues.particulars = record.particulars;
              recordValues.unitPrice = record.unitPrice;
              recordValues.weight = record.weight;
              recordValues.totalAmountUSD = record.totalPriceUSD;
              recordValues.totalAmountTZS = record.totalPriceTZS;

              values.amountUSD += record.totalPriceUSD;
              values.amountTZS += record.totalPriceTZS;
              values.data.push(recordValues)
        }
        
  });

 return values;
}

export default getInvoiceData;