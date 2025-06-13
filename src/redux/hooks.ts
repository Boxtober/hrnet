import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

import { ChangeEventHandler } from "react";

export type TextFieldChange = ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

export type SelectChange = ChangeEventHandler<HTMLSelectElement>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
