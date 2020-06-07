export default{
  UPDATA_CURORDERINFO (state, payload, type) {
    state.curOrderInfo[type] = payload
  },
  UPDATA_ORDER_LIST (state, payload) {
    state.orderArr.push(payload)
  },
};
