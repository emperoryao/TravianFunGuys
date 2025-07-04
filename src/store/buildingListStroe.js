import { create } from "zustand";

const useBuildingStore = create((set, get) => ({
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

    // 👉 若為刪除行為
    if (exist && isDeleteMode) {
      if (isMultipleCount) setIsMultipleCount(false);
      const filtered = saveArray.filter((item) => !(item[key] === value));
      setSaveArray(filtered);
      return;
    }

    // 👉 多選起點未設定 → 記錄起點
    if (multiple && Object.keys(multipleStartItem).length === 0) {
      setMultipleStartItem(NewItem);
      return;
    }

    // 👉 多選範圍完成
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
            return; // 輸入無效
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

      // 若多選的 key 不一致，重置多選
      setMultiple(false);
      setMultipleStartItem({});
      return;
    }

    // 👉 如果從多選切換為單選中間有殘留 → 阻止再進入單選
    if (multiple) return;

    // 👉 單選處理（可含複數）
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

    // ✅ 修正：單選也要檢查是否已存在（含 count）
    const alreadyExists = saveArray.some((item) => {
      return item[key] === value && (!item.count || item.count === count);
    });

    if (alreadyExists) {
      return; // 不重複加入
    }

    setSaveArray([...saveArray, finalItem]);
    if (isMultipleCount) setIsMultipleCount(false);
  },
}));

export default useBuildingStore;
