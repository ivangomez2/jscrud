import { market,greengrocery, others, valeria, marcela,emilce, tablesLog, pharmacy__cost, lastLog, inputValueName, inputValueCost, form,selectionInput, pharmacy, market__cost, cost__marcela, cost__varios, cost__emilce,cost__valeria, cost__greengrocery,
} from "./helper/helper.js";
import { cleanInputs,tableLogs,logList,gastos,farmacia,deleted,callCount,dataLog} from "./helper/logic.js";
import { saveStorage } from "./helper/storageData.js";


const showStorage = () => {
  if (logList === null) {
  } else {
    if (gastos.id == "") {
      saveStorage();
    } else {
      dataLog();
    }
  }
};


callCount()
showStorage();

export {showStorage}