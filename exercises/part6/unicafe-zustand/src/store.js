import { create } from 'zustand'

const useFeedbackStore = create((set) => ({
  props: {
    good: 0,
    neutral: 0,
    bad: 0,
  },
  actions: {
    incrementGood: () => set((state) => (
      {
        props: {
          ...state.props,
          good: state.props.good + 1
        },
      }
    )),
    incrementNeutral: () => set((state) => (
      {
        props: {
          ...state.props,
          neutral: state.props.neutral + 1
        },
      }
    )),
    incrementBad: () => set((state) => (
      {
        props: {
          ...state.props,
          bad: state.props.bad + 1
        },
      }
    )),
  },
}))

export const useFeedbackProps = () => useFeedbackStore((state) => state.props)
export const useFeedbackActions = () => useFeedbackStore((state) => state.actions)
