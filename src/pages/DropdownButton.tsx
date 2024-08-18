import SDropdownButton from "../components/SDropdownButton";

const DropdownButton = () => {
  const options = [
    {
      label: "검색결과 <span class='text-positive'>전체</span> 엑셀 다운로드",
      value: "all",
    },
    {
      label: "선택항목 엑셀 다운로드",
      value: "select",
    },
    {
      label: "선택항목 엑셀 다운로드",
      value: "disabled",
      disabled: true,
    },
  ];
  return (
    <div className="p-3 flex flex-col gap-3">
      xs
      <div className="flex flex-row gap-2">
        <SDropdownButton
          size="xs"
          color="Orange_Lighten-1"
          label="button"
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          size="xs"
          color="Blue_C_Default"
          label="button"
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          size="xs"
          color="Blue_B_Lighten-2"
          label="button"
          outlined
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          size="xs"
          label="button"
          disabled
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
      </div>
      sm
      <div className="flex flex-row gap-2">
        <SDropdownButton
          size="sm"
          label="button"
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          color="positive"
          size="sm"
          label="button"
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          size="sm"
          label="button"
          outlined
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
      </div>
      md
      <div className="flex flex-row gap-2">
        <SDropdownButton
          size="md"
          label="button"
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          size="md"
          color="negative"
          label="button"
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          size="md"
          label="button"
          outlined
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
      </div>
      lg
      <div className="flex flex-row gap-2">
        <SDropdownButton
          size="lg"
          label="button"
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          size="lg"
          color="info"
          label="button"
          outlined
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
        <SDropdownButton
          size="lg"
          label="button"
          outlined
          options={options}
          handleOptionSelect={(opt) => console.log(opt)}
        />
      </div>
    </div>
  );
};

export default DropdownButton;
