import { resolve } from "path";
import { create } from "zustand";

const useStore = create((set) => ({
  bears: 0,
  increaePopulation: () => set((state) => ({ beares: state.bears + 1 })),
  removeAll: () => set({ bears: 0})
  updateBears: (newBears) => set({ bears: newBears}),
  incrementAsync: async() => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ bears: state.bears + 1 }));
  }
}));


function bearCounter() {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increaePopulation);
  const removeAll = useStore((state) => state.removeAll);
  const updateBears = useStore((state) => state.updateBears);

  return (
    <div>
      <h1>{bears}</h1>
      <button onClick={increasePopulation}>Increase</button>
      <button onClick={removeAll}>Remove All</button>
      <button onClick={() => updateBears(10)}>Set to 10</button>
    </div>
  );
}
