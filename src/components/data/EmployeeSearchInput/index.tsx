import React from "react";
import { Input, Icon, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlineCancel } from "react-icons/md";

import {
  StyledTextfieldContainer,
  StyledDropdownMenu,
  StyledDropdownItem,
} from "./styles";

import { useSearchInput } from "./interface";

interface SearchInputProps<T> {
  value: string;
  setValue: (value: string) => void;
  formik: FormikProps<{ keyword: string }>;
  filteredItems: T[];
  handleItemSelection: (
    emp: T,
    formik: FormikProps<{ keyword: string }>,
  ) => void;
  renderItemLabel: (item: T) => React.ReactNode;
  placeholder?: string;
}

export const SearchInput = <T extends object>({
  value,
  setValue,
  formik,
  filteredItems,
  handleItemSelection,
  renderItemLabel,
  placeholder = "Buscar...",
}: SearchInputProps<T>) => {
  const { selectedIndex, containerRef, handleKeyDown, handleMouseEnter } =
    useSearchInput(filteredItems, (item) => handleItemSelection(item, formik));

  const handleClearValue = () => {
    formik.setFieldValue("keyword", "");
    setValue("");
  };

  const handleBlurContainer = (e: React.FocusEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as HTMLElement | null;

    if (
      containerRef.current &&
      related &&
      containerRef.current.contains(related)
    ) {
      return;
    }
    formik.handleBlur({
      target: { name: "keyword" },
    } as React.FocusEvent<HTMLInputElement>);
  };

  return (
    <StyledTextfieldContainer
      ref={containerRef}
      tabIndex={-1}
      onBlur={handleBlurContainer}
    >
      <Input
        id="search-input"
        placeholder={placeholder}
        name="keyword"
        value={value}
        size="compact"
        onChange={(e) => {
          formik.handleChange(e);
          setValue(e.target.value);
        }}
        fullwidth
        onKeyUp={handleKeyDown}
        status={
          formik.touched.keyword && formik.errors.keyword
            ? "invalid"
            : undefined
        }
        message={
          formik.touched.keyword && formik.errors.keyword
            ? formik.errors.keyword
            : undefined
        }
        iconAfter={
          value && (
            <Icon
              size="18px"
              icon={<MdOutlineCancel />}
              appearance="gray"
              onClick={handleClearValue}
            />
          )
        }
      />
      {filteredItems.length > 0 && (
        <StyledDropdownMenu tabIndex={-1}>
          {filteredItems.map((item, index) => (
            <StyledDropdownItem
              key={index}
              tabIndex={-1}
              onClick={() => handleItemSelection(item, formik)}
              onMouseEnter={() => handleMouseEnter(index)}
              $isselected={selectedIndex === index}
            >
              <Text appearance="gray" as="span">
                {renderItemLabel(item)}
              </Text>
            </StyledDropdownItem>
          ))}
        </StyledDropdownMenu>
      )}
    </StyledTextfieldContainer>
  );
};
