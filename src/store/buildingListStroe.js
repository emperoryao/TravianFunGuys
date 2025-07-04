import { create } from "zustand";

const useBuildingStore = create((set, get) => ({
  // === 高度狀態 ===
  displayHeight: Number(localStorage.getItem("displayHeight")) || 21,
  calculatorHeight: Number(localStorage.getItem("calculatorHeight")) || 12,

  setDisplayHeight: (val) => {
    const newVal = Math.max(5, Math.min(35, val));
    localStorage.setItem("displayHeight", newVal);
    set({ displayHeight: newVal });
  },
  setCalculatorHeight: (val) => {
    const newVal = Math.max(5, Math.min(35, val));
    localStorage.setItem("calculatorHeight", newVal);
    set({ calculatorHeight: newVal });
  },

  // === 建築狀態 ===
  build: null,
  saveArray: [],
  totalResourceArray: [],
  multiple: false,
  multipleStartItem: {},
  isMultipleCount: false,

  setIsMultipleCount: (value) => set({ isMultipleCount: value }),
  setBuild: (build) => set({ build }),
  setSaveArray: (saveArray) => set({ saveArray }),
  setTotalResourceArray: (totalResourceArray) => set({ totalResourceArray }),
  setMultiple: (checked) => {
    set({ multiple: checked });
    if (!checked) {
      set({ multipleStartItem: {} });
    }
  },
  setMultipleStartItem: (item) => set({ multipleStartItem: item }),

  // === 等級點擊邏輯 ===
  handleBuildLvOnClick: (NewItem, isDeleteMode = false) => {
    const {
      saveArray,
      multiple,
      multipleStartItem,
      isMultipleCount,
      setSaveArray,
      setMultiple,
      setMultipleStartItem,
      setIsMultipleCount,
    } = get();

    const key = Object.keys(NewItem)[0];
    const value = Object.values(NewItem)[0];
    const exist = saveArray.some((item) => item[key] === value);

    if (exist && isDeleteMode) {
      if (isMultipleCount) setIsMultipleCount(false);
      const filtered = saveArray.filter((item) => !(item[key] === value));
      setSaveArray(filtered);
      return;
    }

    if (multiple && Object.keys(multipleStartItem).length === 0) {
      setMultipleStartItem(NewItem);
      return;
    }

    if (multiple && Object.keys(multipleStartItem).length !== 0) {
      const key1 = Object.keys(multipleStartItem)[0];
      const key2 = Object.keys(NewItem)[0];
      if (key1 === key2) {
        let [value1, value2] = [
          Object.values(multipleStartItem)[0],
          Object.values(NewItem)[0],
        ].sort((a, b) => a - b);

        let count = 1;
        if (isMultipleCount) {
          const input = window.prompt("請輸入此區間每個等級要計算幾次？", "1");
          const parsed = parseInt(input, 10);
          if (!isNaN(parsed) && parsed > 0) {
            count = parsed;
          } else {
            return;
          }
        }

        const result = [];
        for (let i = value1; i <= value2; i++) {
          const item = { [key1]: i };
          if (isMultipleCount) item.count = count;
          result.push(item);
        }

        const newItems = result.filter((resItem) => {
          return !saveArray.some(
            (oldItem) =>
              Object.keys(resItem)[0] === Object.keys(oldItem)[0] &&
              Object.values(resItem)[0] === Object.values(oldItem)[0]
          );
        });

        setSaveArray([...saveArray, ...newItems]);
        setMultiple(false);
        setMultipleStartItem({});
        if (isMultipleCount) setIsMultipleCount(false);
        return;
      }

      setMultiple(false);
      setMultipleStartItem({});
      return;
    }

    if (multiple) return;

    let count = 1;
    if (isMultipleCount) {
      const input = window.prompt("請輸入此等級要計算幾次？", "1");
      const parsed = parseInt(input, 10);
      if (!isNaN(parsed) && parsed > 0) {
        count = parsed;
      } else {
        return;
      }
    }

    const finalItem = isMultipleCount
      ? { [key]: value, count }
      : { [key]: value };

    const alreadyExists = saveArray.some((item) => {
      return item[key] === value && (!item.count || item.count === count);
    });

    if (alreadyExists) return;

    setSaveArray([...saveArray, finalItem]);
    if (isMultipleCount) setIsMultipleCount(false);
  },
}));

export default useBuildingStore;
