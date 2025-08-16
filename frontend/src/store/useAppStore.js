import { create } from 'zustand'

const HeaderMode = {
  NORMAL: {
    marginTop: '160px',
  },
  MINIMUM: {
    marginTop: '16px',
  },
}

export const useAppStore = create(set => ({
  headerMode: HeaderMode.NORMAL,
  bookDetail: {
    visible: false,
    book: {},
  },
  refreshCount: 0,

  showBookDetail: book =>
    set({
      bookDetail: { visible: true, book },
    }),

  setMinimumHeader: () =>
    set({
      headerMode: HeaderMode.MINIMUM,
      bookDetail: { visible: false, book: {} },
    }),

  resetToNormalHeader: () =>
    set(state => ({
      headerMode: HeaderMode.NORMAL,
      bookDetail: { visible: false, book: {} },
      refreshCount: state.refreshCount + 1,
    })),
}))

export { HeaderMode }
