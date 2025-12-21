import { useState, useMemo } from "react";
import { format } from "date-fns";
import { toEndOfDay, toStartOfDay } from "../util/date.util";
import { TaskFilter } from "../types";

export type DatePreset = "all" | "overdue" | "today" | "week" | "custom";

export interface FilterState {
  query: string;
  preset: DatePreset;
  dateFrom: string;
  dateTo: string;
  showCompleted: boolean;
}

const DEFAULT_FILTERS: FilterState = {
  query: "",
  preset: "all",
  dateFrom: "",
  dateTo: "",
  showCompleted: true,
};

export const useTaskParams = () => {
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // convert ui state to api params
  const apiFilterParams = useMemo((): TaskFilter => {
    const today = format(new Date(), "yyyy-MM-dd");
    let dateParams: Partial<Pick<TaskFilter, "dueDateFrom" | "dueDateTo">> = {};

    switch (appliedFilters.preset) {
      case "overdue":
        dateParams = { dueDateTo: toEndOfDay(today) };
        break;
      case "today":
        dateParams = {
          dueDateFrom: toStartOfDay(today),
          dueDateTo: toEndOfDay(today),
        };
        break;
      case "week": {
        const weekLater = new Date();
        weekLater.setDate(weekLater.getDate() + 7);
        dateParams = {
          dueDateFrom: toStartOfDay(today),
          dueDateTo: toEndOfDay(format(weekLater, "yyyy-MM-dd")),
        };
        break;
      }
      case "custom":
        dateParams = {
          dueDateFrom: appliedFilters.dateFrom ? toStartOfDay(appliedFilters.dateFrom) : undefined,
          dueDateTo: appliedFilters.dateTo ? toEndOfDay(appliedFilters.dateTo) : undefined,
        };
        break;
    }

    return {
      query: appliedFilters.query || undefined,
      completed: undefined,
      ...dateParams,
    };
  }, [appliedFilters]);

  return {
    appliedFilters,
    setAppliedFilters,
    apiFilterParams,
    showCompleted: appliedFilters.showCompleted,
  };
};
