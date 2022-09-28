import React from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function valueToLabel(value) {
  return value === "F" ? "Full Time Jobs" : "Part Time Jobs"
}

export default function JobTypeFacet(props) {
  const { label, options, onRemove, onSelect } = props

  return (
    <fieldset className="mb-8">
      <legend className="text-lg font-medium text-gray-900">{label}</legend>
      <div className="flex rounded-md border mt-4">
        {options.map((option, optionIdx) => (
          <button
            key={optionIdx}
            type="button"
            className={classNames(
              optionIdx % 2 === 0 ? "rounded-l-md border-r-2" : "rounded-r-md",
              option.selected && optionIdx % 2 === 0 && "border-r-blue-300",
              !option.selected && optionIdx % 2 === 0 && "border-r-gray-100",
              option.selected
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 focus:ring-blue-500"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
              "flex-1 inline-flex justify-center items-center px-6 py-3 text-base font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2"
            )}
            onClick={() =>
              option.selected ? onRemove(option.value) : onSelect(option.value)
            }
          >
            {valueToLabel(option.value)}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
