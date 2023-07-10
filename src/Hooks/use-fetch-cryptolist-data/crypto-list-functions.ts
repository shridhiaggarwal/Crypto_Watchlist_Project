import { fetchCryptoList } from "../../Services/crypto-list-service";
import { Status } from "../../Utils/common";

export async function getCryptoList(action: any) {
  let result: any = await fetchCryptoList();
  if (result && result.status === Status.SUCCESS) {
    action.cryptoListSuccessCallback(result.data);
  } else {
    action.cryptoListErrorCallback(result.message);
  }
}
