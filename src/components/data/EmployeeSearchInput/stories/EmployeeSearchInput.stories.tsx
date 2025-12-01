import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";
import { Formik } from "formik";

import { Logger } from "@utils/logger";

import { filteredEmployeesMock } from "./config";
import { SearchInput } from "../index";

interface Employee {
  names: string;
}

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  title: "components/data/EmployeeSearchInput",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

interface EmployeeSearchInputStoryArgs {
  keyword: string;
  setSearchTerm: (term: string) => void;
}

const Template: StoryFn<EmployeeSearchInputStoryArgs> = (args) => {
  const [searchTerm, setSearchTerm] = useState(args.keyword);
  const [isEmployeeSelected, setIsEmployeeSelected] = useState(false);

  const filteredEmployees = filteredEmployeesMock.filter((employee) =>
    employee.names.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Formik
      initialValues={{ keyword: searchTerm }}
      onSubmit={(values) => {
        Logger.debug("EmployeeSearchInput submit", {
          values,
        });
      }}
    >
      {(formik) => {
        const handleSelection = (emp: Employee) => {
          setSearchTerm(emp.names);
          setIsEmployeeSelected(true);

          Logger.debug("Employee selected from search", {
            employeeName: emp.names,
          });
        };

        return (
          <SearchInput
            value={searchTerm}
            setValue={setSearchTerm}
            formik={formik}
            filteredItems={
              searchTerm && !isEmployeeSelected ? filteredEmployees : []
            }
            handleItemSelection={handleSelection}
            renderItemLabel={(item) => item.names}
            placeholder="Buscar empleado"
          />
        );
      }}
    </Formik>
  );
};

export const Default = Template.bind({});
Default.args = {
  keyword: "",
  setSearchTerm: (term: string) => {
    Logger.debug("Search term changed (Default)", { term });
  },
};

export const WithKeyword = Template.bind({});
WithKeyword.args = {
  keyword: "Juan Pérez",
  setSearchTerm: (term: string) => {
    Logger.debug("Search term changed (WithKeyword)", { term });
  },
};

export const WithNoResults = Template.bind({});
WithNoResults.args = {
  keyword: "No existe",
  setSearchTerm: (term: string) => {
    Logger.debug("Search term changed (WithNoResults)", { term });
  },
};

export default meta;
