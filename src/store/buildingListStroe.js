import { create } from "zustand";

const useBuildingStore = create((set, get) => ({
  build: null,
  saveArray: [],
  totalResourceArray: [],
  multiple: false,
  multipleStartItem: {},
  setBuild: (build) => set({ build }),
  setSaveArray: (saveArray) => set({ saveArray }),
  setTotalResourceArray: (totalResourceArray) => set({ totalResourceArray }),
  setMultiple: (multiple) => set({ multiple }),
  setMultipleStartItem: (item) => set({ multipleStartItem: item }),
  handleBuildLvOnClick: (NewItem) => {
    const {
      saveArray,
      multiple,
      multipleStartItem,
      setSaveArray,
      setMultiple,
      setMultipleStartItem,
    } = get();
    if (multiple === true && Object.keys(multipleStartItem).length === 0) {
      setMultipleStartItem(NewItem);
      return;
    } else if (
      multiple === true &&
      Object.keys(multipleStartItem).length !== 0
    ) {
      let key1 = Object.keys(multipleStartItem)[0];
      let key2 = Object.keys(NewItem)[0];
      if (key1 === key2) {
        let value1 = Object.values(multipleStartItem)[0];
        let value2 = Object.values(NewItem)[0];
        [value1, value2] = [value1, value2].sort((x, y) => x - y);
        let result = [];
        for (let i = 1; i <= 100; i++) {
          if (i >= value1 && i <= value2) {
            result.push({
              [key1]: i,
            });
          }
        }
        if (saveArray.length > 0) {
          let temp = [];
          for (let j in result) {
            let flag = false;
            for (let k in saveArray) {
              if (Object.keys(result[j])[0] === Object.keys(saveArray[k])[0]) {
                if (
                  Object.values(result[j])[0] === Object.values(saveArray[k])[0]
                ) {
                  flag = true;
                  break; // 如果找到重复的元素，直接跳出内层循环
                }
              }
            }
            if (flag === false) {
              temp.push(result[j]); // 如果在内层循环中没有找到重复的元素，添加到temp
            }
          }
          // 最后将temp合并到saveArray
          setSaveArray([...saveArray, ...temp]);
          setMultiple(!multiple);
          setMultipleStartItem({});
        } else {
          setSaveArray(result);
          setMultiple(!multiple);
          setMultipleStartItem({});
        }
      } else {
        setMultiple(!multiple);
        setMultipleStartItem({});
      }
    } else {
      //單選區
      if (saveArray.length > 0) {
        let newItemkey = Object.keys(NewItem);
        const exist = saveArray.some(
          (item) => item[newItemkey] === NewItem[newItemkey]
        );
        if (exist) {
          const filteredArray = saveArray.filter(
            (item) => JSON.stringify(item) !== JSON.stringify(NewItem)
          );
          setSaveArray(filteredArray);
          return;
        } else {
          setSaveArray([...saveArray, NewItem]);
          return;
        }
      } else {
        setSaveArray([NewItem]);
        return;
      }
    }
  },
}));

export default useBuildingStore;
