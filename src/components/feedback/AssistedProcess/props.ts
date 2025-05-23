const parameters = {
  docs: {
    descriptions: {
      component:
        "The assited displays the steps and progress through a journey.",
    },
  },
};

const props = {
  steps: {
    description:
      "(Array of objects): An array to represent each step of the journey. Each object in the array represents one step and must have the following structure: id, label, description (Optional). The order of the steps depends on the order in the array,",
  },
  currentStepId: {
    description:
      "(string | number): An identifier that matches one of the id values within the steps array to indicate the current step.",
  },
};

export { parameters, props };
